function checkLogin() {
    const fromCV = sessionStorage.getItem('fromCV');
    if (!fromCV) {
        window.location.href = '../index.html';
        return;
    }
    sessionStorage.removeItem('fromCV');
}

checkLogin();

const clickToPlay = document.getElementById('clickToPlay');
const messageDiv = document.getElementById('messageDiv');
const gamefield = document.getElementById('gamefield');
const finalDiv = document.getElementById('finalDiv');
const finalTextDiv = document.getElementById('finalTextDiv');
const restartDiv = document.getElementById('restartDiv');

const highscoreSpan = document.getElementById('highscore');

let colors = [];
const MAX_ROUNDS = 40;
const COLOR_MAP = ['#ef4444', '#22c55e', '#f3c333', '#3b82f6'];

let currentRound = 0;
let userInputCount = 0;
let highscore = 0;

function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

const playFunction = function () {
    finalDiv.style.display = 'none';
    currentRound = 0;
    colors = [];
    for (let i = 0; i < MAX_ROUNDS; i++) {
        const randomColor = Math.floor(Math.random() * 4);
        colors.push(randomColor);
    }

    clickToPlay.style.display = 'none';
    messageDiv.style.display = 'grid';
    messageDiv.textContent = 'Merken Sie sich die Reihenfolge der angezeigten Farben. In jeder Runde wird eine weitere Farbe hinzugefügt.';
    setTimeout(function () {
        let countdown = 3;
        messageDiv.style.fontSize = '8rem';
        messageDiv.textContent = countdown;
        const interval = setInterval(function () {
            countdown--;
            if (countdown > 0) {
                messageDiv.textContent = countdown;
            } else {
                clearInterval(interval);
                messageDiv.style.display = 'none';
                messageDiv.style.fontSize = '1.2rem';
                showColors();
            }
        }, 1000);
    }, 3000);
};

clickToPlay.addEventListener('click', playFunction);
restartDiv.addEventListener('click', playFunction);

async function showColors() {
    const colorDiv = document.getElementById('colorDiv');
    colorDiv.style.display = 'grid';
    colorDiv.textContent = '';
    for (let i = 0; i <= currentRound; i++) {
        colorDiv.style.backgroundColor = COLOR_MAP[colors[i]];
        await sleep(1000);
        colorDiv.style.backgroundColor = 'transparent';
        await sleep(500);
    }
    colorDiv.style.display = 'none';
    gamefield.style.display = 'grid';
    userInputCount = 0;
}

const buttons = document.querySelectorAll('#gamefield .button');
buttons.forEach(function (button, index) {
    button.addEventListener('click', function () {
        if (index === colors[userInputCount]) {
            userInputCount++;
            if (userInputCount > currentRound) {
                if (currentRound === MAX_ROUNDS - 1) {
                    finalDiv.style.display = 'grid';
                    finalTextDiv.textContent = 'Herzlichen Glückwunsch! Sie haben alle ' + MAX_ROUNDS + ' Runden geschafft!';
                    gamefield.style.display = 'none';
                    highscore = MAX_ROUNDS;
                    highscoreSpan.textContent = highscore;
                } else {
                    currentRound++;
                    messageDiv.style.display = 'grid';
                    messageDiv.textContent = 'Richtig! Die nächste Runde startet.';
                    gamefield.style.display = 'none';
                    setTimeout(function () {
                        messageDiv.style.display = 'none';
                        showColors();
                    }, 2000);
                }
            }
        } else {
            finalDiv.style.display = 'grid';
            finalTextDiv.textContent = 'Falsch! Sie haben ' + currentRound + (currentRound === 1 ? ' Runde' : ' Runden') + ' geschafft.';
            gamefield.style.display = 'none';
            highscore = currentRound > highscore ? currentRound : highscore;
            highscoreSpan.textContent = highscore;
            return;
        }
    });
});