const DELAY = 5;
const getRandom = max => Math.floor(Math.random() * Math.floor(max));
const btnSimulate = document.querySelector('#btnSimulate');
const btnReset = document.querySelector('#btnReset');
const cbSwitch = document.querySelector('#cbSwitch');
const txtNumAttempts = document.querySelector('#txtNumAttempts');
const txtNumTimes = document.querySelector('#txtNumTimes');
const labelNumAttempts = document.querySelector('#num-attempts');
const barWin = document.querySelector('#bar-win');
const barLose = document.querySelector('#bar-lose');

let runSimulation = false;
var scores = {};

txtNumTimes.addEventListener('change', () => {
    txtNumTimes.dataset.value = txtNumTimes.value;
});

btnSimulate.addEventListener('click', () => {
    count = 0;
    this.disabled = true;
    btnReset.disabled = true;
    runSimulation = true;

    let bar = document.createElement('div');
    bar.id = 'bar-'+txtNumTimes.value;
    bar.classList = 'bar';

    let barWin = document.createElement('div');
    barWin.classList = 'bar-value bar-win';
    barWin.style.width = '50%';

    let barLose = document.createElement('div');
    barLose.classList = 'bar-value bar-lose';
    barLose.style.width = '50%';

    bar.appendChild(barWin);
    bar.appendChild(barLose);

    document.querySelector('#chart').appendChild(bar);

    scores[txtNumTimes.value] = {win: 0, lose: 0};

    run(txtNumTimes.value, barWin, barLose, scores[txtNumTimes.value]);
});

btnReset.addEventListener('click', reset);

function run(instance, barWin, barLose, scores) {
    console.log(barWin, barLose)
    let isSwitch = cbSwitch.checked;
    let numAttempts = parseInt(txtNumAttempts.value);
    let maxAttempts = numAttempts;
    
    var win = 0;
    var lose = 0;
    var count = 0;

    console.log(numAttempts)
    
    let interval = setInterval(() => {
        console.log('numAttempts', numAttempts)
        numAttempts--;

        simulate(isSwitch, barWin, barLose, scores);

        if (!runSimulation || numAttempts <= 0) {
            var ave = getAverage() * 100;
            document.querySelector('#mean-finder').style.left = ave+'%';

            clearInterval(interval);
            btnReset.disabled = false;

            var numTimes = parseInt(txtNumTimes.value);
            txtNumTimes.value = numTimes - 1;
            
            if (numTimes - 1 > 0) {
                btnSimulate.click();
            } else {
                txtNumTimes.value = txtNumTimes.dataset.value;
                console.log('DONE');
            }
        };
    }, DELAY);
}

function simulate(isSwitch, barWin, barLose, scores) {
    console.log(scores)

    console.log('Simulating ...');
    count++;
    let prize = getRandom(3);
    let pick = getRandom(3);

    console.log(prize, pick);
    console.log(barWin, barLose)

    let isEqual = prize === pick;

    if (isSwitch) {
        if (isEqual) { // lose
            scores.lose++;
            updateLose(scores, barLose);
        } else { // win
            scores.win++;
            updateWin(scores, barWin);
        }
    } else {
        if (isEqual) { // win
            scores.win++;
            updateWin(scores, barWin);
        } else { // lose
            scores.lose++;
            updateLose(scores, barLose);
        }
    }

    // labelNumAttempts.innerText = count;
}

function getAverage() {
    var sum = 0;
    for (var instance in scores) {
        sum += scores[instance].win;
    }

    return (sum / Object.keys(scores).length) / parseInt(txtNumAttempts.value);
}

function updateWin(scores, barWin) {
    let max = scores.win + scores.lose;
    let perc = ((scores.win / max) * 100).toFixed(2) + '%';

    barWin.innerText = scores.win + ' (' + perc + ')';
    barWin.style.width = perc;
}

function updateLose(scores, barLose) {
    let max = scores.win + scores.lose;
    let perc = ((scores.lose / max) * 100).toFixed(2) + '%';
    barLose.innerText = scores.lose + ' (' + perc + ')';
    barLose.style.width = perc;
}

function reset() {
    window.location.reload();
    // btnSimulate.disabled = false;
    // barWin.style.width = '0';
    // barLose.style.width = '0';
    // labelNumAttempts.innerText = 0;
    // win = 0;
    // lose = 0;
    // count = 0;
}