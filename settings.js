var t = window.TrelloPowerUp.iframe();

console.log('Settings.js loaded');

// Load board lists and populate dropdown
(async function() {
  try {
    console.log('Starting to load settings...');
    
    // Load existing settings
    const days = await t.get('member', 'private', 'days', 4);
    const badgeColor = await t.get('member', 'private', 'badgeColor', 'pink');
    const badgeLabel = await t.get('member', 'private', 'badgeLabel', 'New');
    
    console.log('Loaded settings:', { days, badgeColor, badgeLabel });
    
    document.getElementById('days').value = days;
    document.getElementById('badgeColor').value = badgeColor;
    document.getElementById('badgeLabel').value = badgeLabel;
    
    // Get all lists on the board
    console.log('Fetching board lists...');
    const board = await t.board('lists');
    console.log('Board data:', board);
    console.log('Lists:', board.lists);
    
    const listFilter = document.getElementById('listFilter');
    
    // Clear the loading option
    listFilter.innerHTML = '';
    
    if (!board.lists || board.lists.length === 0) {
      console.error('No lists found!');
      const option = document.createElement('option');
      option.value = '';
      option.textContent = 'No lists available';
      listFilter.appendChild(option);
      return;
    }
    
    console.log('Populating dropdown with', board.lists.length, 'lists');
    
    // Add each list as an option
    board.lists.forEach(function(list) {
      console.log('Adding list:', list.name, list.id);
      const option = document.createElement('option');
      option.value = list.id;
      option.textContent = list.name;
      listFilter.appendChild(option);
    });
    
    // Load saved list filter setting (array of list IDs)
    const savedListIds = await t.get('member', 'private', 'listFilter', []);
    console.log('Saved list IDs:', savedListIds);
    
    // Select the saved lists
    Array.from(listFilter.options).forEach(function(option) {
      if (savedListIds.includes(option.value)) {
        option.selected = true;
      }
    });
    
    console.log('Settings loaded successfully!');
  } catch (error) {
    console.error('Error loading settings:', error);
  }
})();

// Save settings
document.getElementById('save').addEventListener('click', async function() {
  try {
    console.log('Save button clicked');
    
    const days = document.getElementById('days').value;
    const badgeColor = document.getElementById('badgeColor').value;
    const badgeLabel = document.getElementById('badgeLabel').value;
    
    // Get all selected list IDs
    const listFilterSelect = document.getElementById('listFilter');
    const selectedLists = Array.from(listFilterSelect.selectedOptions).map(option => option.value);
    
    console.log('Saving settings:', { days, badgeColor, badgeLabel, selectedLists });

    await t.set('member', 'private', 'days', days);
    await t.set('member', 'private', 'badgeColor', badgeColor);
    await t.set('member', 'private', 'badgeLabel', badgeLabel);
    await t.set('member', 'private', 'listFilter', selectedLists);
    
    console.log('Settings saved successfully!');
    t.closePopup();
  } catch (error) {
    console.error('Error saving settings:', error);
  }
});