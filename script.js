const TIMER = 500;
const getRandom = max => Math.floor(Math.random() * Math.floor(max));
const doors = document.querySelectorAll('.door');
const door1 = document.querySelector('#door-0');
const door2 = document.querySelector('#door-1');
const door3 = document.querySelector('#door-2');
const message = document.querySelector('#message');
const btnConfirm = document.querySelector('#btnConfirmSelection');
const btnSwitch = document.querySelector('#btnSwitch');
const btnReset = document.querySelector('#btnReset');
const btnCheckWinner = document.querySelector('#btnCheckWinner');
const scoreWin = document.querySelector('#score-win');
const scorelose = document.querySelector('#score-lose');
const winRate = document.querySelector('#win-rate');
let win = 0;
let lose = 0;
let isDoorSelectionAllowed = true;
let selectedDoor = null;
let prizedDoor = null;

doors.forEach(door => {
    door.addEventListener('click', (el) => {
        clearSelected();
        door.classList.add('selected');
        selectedDoor = parseInt(door.dataset.id);
        console.log('SELECTED DOOR IS ' + selectedDoor);
        message.innerText = 'Please Confirm Selection';
        btnConfirmSelection.classList.remove('hide');
    });
});

btnCheckWinner.addEventListener('click', () => {
    btnCheckWinner.classList.add('hide');
    btnSwitch.classList.add('hide');
    checkWinner();
});

btnReset.addEventListener('click', start);

btnSwitch.addEventListener('click', () => {
    message.innerText = 'Switching ...';
    btnSwitch.classList.add('hide');
    btnCheckWinner.classList.add('hide');

    setTimeout(switchSelection, TIMER);
});

btnConfirm.addEventListener('click', () => {
    btnConfirm.classList.add('hide');
    doors.forEach(door => {
        door.classList.add('events-off');
    });

    openRandomNotSelectedDoor();
});

function clearSelected() {
    doors.forEach(door => {
        door.classList.remove('selected');
        door.classList.remove('open');
        var id = parseInt(door.dataset.id);
        door.querySelector('span').innerText = id;
    });
}

function openRandomNotSelectedDoor() {
    var toBeOpenedDoor = document.querySelector('.door:not(.selected):not(.has-prize)');
    message.innerText = 'Opening one door ...';
    setTimeout(() => {
        toBeOpenedDoor.classList.add('open');
        toBeOpenedDoor.querySelector('span').innerText = 'X';
        message.innerText = 'Do you want to switch?';

        btnSwitch.classList.remove('hide');
        btnCheckWinner.classList.remove('hide');
    }, TIMER);
}

function checkWinner() {
    message.innerText = 'Checking if you win or not ...';

    setTimeout(() => {
        console.log('SELECTED: ' + selectedDoor);
        console.log('PRIZE: ' + prizedDoor);

        if (selectedDoor === prizedDoor) {
            message.innerText = 'Congratulations! You won!';
            win++;
        } else {
            message.innerText = 'You Lose! Prize is at Door ' + prizedDoor;
            lose++;
        }

        document.querySelector('#door-' + prizedDoor).classList.add('show-prize');

        btnReset.classList.remove('hide');
        updateScore();
    }, TIMER + 500);
}

function switchSelection() {
    console.log('SWITCHING ...');
    console.log('PRIZE IS AT DOOR ' + prizedDoor);
    console.log('SELECTED: ' + selectedDoor);
    var selected = document.querySelector('.door.selected');
    var notOpenAndSelected = document.querySelector('.door:not(.selected):not(.open)');

    // DESELECT SELETED
    selected.classList.remove('selected');

    // SELECT THE OTHER ONE
    notOpenAndSelected.classList.add('selected');
    selectedDoor = parseInt(notOpenAndSelected.dataset.id);

    console.log('SWITCHED TO NEW SELECTED DOOR ' + selectedDoor);

    checkWinner();
}

function updateScore() {
    scoreWin.innerText = win;
    scorelose.innerText = lose;
    winRate.innerText = ((win / (win + lose)) * 100).toFixed(2) + '%';
}

function start() {
    console.log('------------------------------\n');
    doors.forEach(function (el) {
        el.className = 'door';
    });

    btnReset.classList.add('hide');

    message.innerText = 'Select between doors 0, 1, or 2.';
    selectedDoor = null;
    prizedDoor = getRandom(3);

    // ADD CLASS .prize TO DOOR
    clearSelected();
    console.log('PRIZE IS AT DOOR ' + prizedDoor);
    document.querySelector('#door-' + prizedDoor).classList.add('has-prize');
}

start();