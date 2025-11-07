var t = window.TrelloPowerUp.iframe();

// Load existing settings
(async function () {
    document.getElementById('days').value = await t.get('member', 'private', 'days', 4);
    document.getElementById('badgeColor').value = await t.get('member', 'private', 'badgeColor', 'pink');
    document.getElementById('badgeLabel').value = await t.get('member', 'private', 'badgeLabel', 'New');
})();

// Save settings
document.getElementById('save').addEventListener('click', async function () {
    const days = document.getElementById('days').value;
    const badgeColor = document.getElementById('badgeColor').value;
    const badgeLabel = document.getElementById('badgeLabel').value;

    await t.set('member', 'private', 'days', days);
    await t.set('member', 'private', 'badgeColor', badgeColor);
    await t.set('member', 'private', 'badgeLabel', badgeLabel);

    t.closePopup();
});