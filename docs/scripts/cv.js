function checkLogin() {
    const loginSuccess = sessionStorage.getItem('loginSuccess');
    const fromGame = sessionStorage.getItem('fromGame');

    if (!loginSuccess && !fromGame) {
        window.location.href = '../index.html';
        return;
    }

    sessionStorage.removeItem('loginSuccess');
    sessionStorage.removeItem('fromGame');
}

checkLogin();

document.querySelector('.imageContainer').addEventListener('click', function () {
    sessionStorage.setItem('fromCV', 'true');
    window.location.href = 'game.html';
});