const DELAY = 5;
const getRandom = max => Math.floor(Math.random() * Math.floor(max));
const btnSimulate = document.querySelector('#btnSimulate');
const btnReset = document.querySelector('#btnReset');
const cbSwitch = document.querySelector('#cbSwitch');
const txtNumAttempts = document.querySelector('#txtNumAttempts');
const labelNumAttempts = document.querySelector('#num-attempts');
const barWin = document.querySelector('#bar-win');
const barLose = document.querySelector('#bar-lose');
let win = 0;
let lose = 0;
let count = 0;
let runSimulation = false;

btnSimulate.addEventListener('click', () => {
    this.disabled = true;
    btnReset.disabled = true;

    runSimulation = true;
    let isSwitch = cbSwitch.checked;
    let numAttempts = parseInt(txtNumAttempts.value);
    let maxAttempts = numAttempts;

    if (!DELAY) {
        while (numAttempts) {
            numAttempts--;
            simulate(maxAttempts, isSwitch);
        }

        btnReset.disabled = false;
        console.log('DONE');
    } else {
        // USE INTERVAL
        let interval = setInterval(() => {
            numAttempts--;

            simulate(maxAttempts, isSwitch);

            if (!runSimulation || numAttempts <= 0) {
                clearInterval(interval);
                btnReset.disabled = false;
                console.log('DONE');
            };
        }, DELAY);
    }
});

btnReset.addEventListener('click', reset);

function simulate(maxAttempts, isSwitch) {
    console.log('Simulating ...');

    count++;
    let prize = getRandom(3);
    let pick = getRandom(3);

    console.log(prize, pick);

    let isEqual = prize === pick;

    if (isSwitch) {
        if (isEqual) { // lose
            lose++
            updateLose(win, lose);
        } else { // win
            win++;
            updateWin(win, lose);
        }
    } else {
        if (isEqual) { // win
            win++;
            updateWin(win, lose);
        } else { // lose
            lose++
            updateLose(win, lose);
        }
    }

    labelNumAttempts.innerText = count;
}

function updateWin(win, lose) {
    let max = win + lose;
    let perc = ((win / max) * 100).toFixed(2) + '%';
    barWin.innerText = win + ' (' + perc + ')';
    barWin.style.width = perc;
}

function updateLose(win, lose) {
    let max = win + lose;
    let perc = ((lose / max) * 100).toFixed(2) + '%';
    barLose.innerText = lose + ' (' + perc + ')';
    barLose.style.width = perc;
}

function reset() {
    btnSimulate.disabled = false;
    barWin.style.width = '0';
    barLose.style.width = '0';
    labelNumAttempts.innerText = 0;
    win = 0;
    lose = 0;
    count = 0;
}