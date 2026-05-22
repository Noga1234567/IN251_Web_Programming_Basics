const form = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === 'zukuenftigerArbeitsgeber' && password === 'Extr3m$ich3r3$P@ssw0rtFuerD@sCVv0nN0@G@sch3') {
        sessionStorage.setItem('loginSuccess', 'true');
        window.location.href = 'pages/cv.html';
    } else {
        errorMessage.textContent = 'Die eingegebenen Anmeldedaten sind ungültig. Bitte versuchen Sie es erneut.';
        passwordInput.value = '';
        passwordInput.focus();
    }
});