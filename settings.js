var t = window.TrelloPowerUp.iframe();

// Load existing settings
(async function () {
    document.getElementById('days').value = await t.get('member', 'private', 'days', 4);
    document.getElementById('badgeColor').value = await t.get('member', 'private', 'badgeColor', 'pink');
    document.getElementById('badgeLabel').value = await t.get('member', 'private', 'badgeLabel', 'New');

    // Get all lists on the board
    const board = await t.board('lists');
    const listFilter = document.getElementById('listFilter');

    // Clear the loading option
    listFilter.innerHTML = '';

    // Add "All Lists" option
    const allOption = document.createElement('option');
    allOption.value = '';
    allOption.textContent = 'All Lists';
    listFilter.appendChild(allOption);

    // Add each list as an option
    board.lists.forEach(function (list) {
        const option = document.createElement('option');
        option.value = list.id;
        option.textContent = list.name;
        listFilter.appendChild(option);
    });

    // Load saved list filter setting
    const savedListId = await t.get('member', 'private', 'listFilter', '');
    listFilter.value = savedListId;
})();

// Save settings
document.getElementById('save').addEventListener('click', async function () {
    const days = document.getElementById('days').value;
    const badgeColor = document.getElementById('badgeColor').value;
    const badgeLabel = document.getElementById('badgeLabel').value;
    const listFilter = document.getElementById('listFilter').value;

    await t.set('member', 'private', 'days', days);
    await t.set('member', 'private', 'badgeColor', badgeColor);
    await t.set('member', 'private', 'badgeLabel', badgeLabel);
    await t.set('member', 'private', 'listFilter', listFilter);

    t.closePopup();
});