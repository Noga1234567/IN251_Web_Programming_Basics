const form = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const expectedUsername = 'zukuenftigerArbeitsgeber';

function showLoginError() {
    errorMessage.textContent = 'Die eingegebenen Anmeldedaten sind ungültig. Bitte versuchen Sie es erneut.';
    passwordInput.value = '';
    passwordInput.focus();
}

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    errorMessage.textContent = '';

    if (username !== expectedUsername || !password || password.includes('/') || password.includes('\\') || password.includes('..')) {
        showLoginError();
        return;
    }

    const targetPage = 'pages/' + password + '.html';

    //For local file access (directly opening index.html in browser)
    if (window.location.protocol === 'file:') {
        if (Array.isArray(window.availablePages) && window.availablePages.includes(password)) {
            sessionStorage.setItem('loginSuccess', 'true');
            window.location.href = targetPage;
        } else {
            showLoginError();
        }
        return;
    }

    // For access vial URL
    try {
        const response = await fetch(targetPage, { cache: 'no-store' });

        if (!response.ok) {
            showLoginError();
            return;
        }

        sessionStorage.setItem('loginSuccess', 'true');
        window.location.href = targetPage;
    } catch {
        showLoginError();
    }
});