var t = window.TrelloPowerUp.iframe();

// Load existing settings
(async function () {
    document.getElementById('days').value = await t.get('board', 'private', 'days', 4);
    document.getElementById('badgeColor').value = await t.get('board', 'private', 'badgeColor', 'pink');
    document.getElementById('badgeLabel').value = await t.get('board', 'private', 'badgeLabel', 'New');
})();

// Save settings
document.getElementById('save').addEventListener('click', async function () {
    const days = document.getElementById('days').value;
    const badgeColor = document.getElementById('badgeColor').value;
    const badgeLabel = document.getElementById('badgeLabel').value;

    await t.set('board', 'private', 'days', days);
    await t.set('board', 'private', 'badgeColor', badgeColor);
    await t.set('board', 'private', 'badgeLabel', badgeLabel);

    t.closePopup();
});