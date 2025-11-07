var t = window.TrelloPowerUp.iframe();

// Load board lists and populate dropdown
(async function () {
    // Load existing settings
    const days = await t.get('member', 'private', 'days', 4);
    const badgeColor = await t.get('member', 'private', 'badgeColor', 'pink');
    const badgeLabel = await t.get('member', 'private', 'badgeLabel', 'New');
    // Load saved list filter setting (array of list IDs)
    const savedListIds = await t.get('member', 'private', 'listFilter', []);
    console.log("savedListIds", savedListIds)

    document.getElementById('days').value = days;
    document.getElementById('badgeColor').value = badgeColor;
    document.getElementById('badgeLabel').value = badgeLabel;

    // Get the lists that were passed as arguments
    const lists = await t.arg('lists');

    const listFilter = document.getElementById('listFilter');

    // Clear the loading option
    listFilter.innerHTML = '';

    if (!lists || lists.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No lists available';
        listFilter.appendChild(option);
        return;
    }

    // Add each list as an option
    lists.forEach(function (list) {
        const option = document.createElement('option');
        option.value = list.id;
        option.textContent = list.name;
        listFilter.appendChild(option);
    });

    // Select the saved lists
    Array.from(listFilter.options).forEach(function (option) {
        if (savedListIds.includes(option.value)) {
            option.selected = true;
        }
    });
})();

// Save settings
document.getElementById('save').addEventListener('click', async function () {
    const days = document.getElementById('days').value;
    const badgeColor = document.getElementById('badgeColor').value;
    const badgeLabel = document.getElementById('badgeLabel').value;

    // Get all selected list IDs
    const listFilterSelect = document.getElementById('listFilter');
    console.log("listFilterSelect.selectedOptions", listFilterSelect.selectedOptions);
    const selectedLists = Array.from(listFilterSelect.selectedOptions).map(option => option.value);

    await t.set('member', 'private', 'days', days);
    await t.set('member', 'private', 'badgeColor', badgeColor);
    await t.set('member', 'private', 'badgeLabel', badgeLabel);
    await t.set('member', 'private', 'listFilter', selectedLists);

    t.closePopup();
});