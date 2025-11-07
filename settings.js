var t = window.TrelloPowerUp.iframe();

// Load existing settings
t.loadSecret('days').then(function (days) {
    document.getElementById('days').value = days || 4;
});

t.loadSecret('badgeColor').then(function (badgeColor) {
    document.getElementById('badgeColor').value = badgeColor || 'pink'; // pink
});

t.loadSecret('badgeLabel').then(function (badgeLabel) {
    document.getElementById('badgeLabel').value = badgeLabel || 'new';
});

// Save settings
document.getElementById('save').addEventListener('click', function () {
    var days = document.getElementById('days').value;
    var badgeColor = document.getElementById('badgeColor').value;
    var badgeLabel = document.getElementById('badgeLabel').value;

    return t.set('board', 'private', 'days', days)
        .then(function () {
            return t.set('board', 'private', 'badgeColor', badgeColor);
        })
        .then(function () {
            return t.set('board', 'private', 'badgeLabel', badgeLabel);
        })
        .then(function () {
            t.closePopup();
        });
});