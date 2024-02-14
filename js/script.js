const container = document.getElementById('container');
const callingNumbers = container.querySelector('.calling_numbers');

const lotteryCard = container.querySelector('.card');
const randNum = container.querySelector('.numbers');
const cardRow1 = container.querySelector('.card_row1');
const cardRow2 = container.querySelector('.card_row2');
const cardRow3 = container.querySelector('.card_row3');
const gameOver = container.querySelector('.game-over');

const clickPlay = container.querySelector('.play_click');
const clickStop = container.querySelector('.stop_click');
const clickAgain = container.querySelector('.try_again');

const row1 = cardRow1.children;
const row2 = cardRow2.children;
const row3 = cardRow3.children;

let cardColumn = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
]

let emptyIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let emptyIndexForLast = [0, 1, 2, 3, 4, 5, 6, 7, 8];

let allNumbers = [];

let cardRows = [
    [],
    [],
    []
];

let checkWin = 0;
let callNums;
let showGameOver;

class CardLotto {
    constructor (num, boolian) {
        this.num = num;
        this.check = boolian;
    }
}

pushAllNumbers(allNumbers);
pushRowNumbers();

addRowNums(cardRows[0]);
addRowNums(cardRows[1]);
addRowNums(cardRows[2]);

emptyAreas(cardRows[0], emptyIndex);
emptyAreas(cardRows[1], emptyIndex);
emptyAreas(cardRows[2], emptyIndexForLast);

rendNums(row1, cardRows[0]);
rendNums(row2, cardRows[1]);
rendNums(row3, cardRows[2]);

function playGame () {
    createNumber();
    changeClick('inline-block', 'none');
}

function stopGame () {
    changeClick('none', 'inline-block');
    clearInterval(callNums);
}

for (let i = 0; i < 9; i++) {
    row1[i].onclick = function() {
        closeNumber(row1[i], cardRows[0][i]);
    }
    
    row2[i].onclick = function() {
        closeNumber(row2[i], cardRows[1][i]);
    }
    
    row3[i].onclick = function() {
        closeNumber(row3[i], cardRows[2][i]);
    }
}

function newGame () {
    clearInterval(callNums);
    CreateNewGame();
}

//// game play /////////////////////////////////////////////////////////
function createNumber () {
    clearInterval(callNums);
    callNums = setInterval(() => {
        rendCallingNumbers();
        winShower();
    }, 3 * 1000);
}

function rendCallingNumbers () {
    if (allNumbers.length === 0) {
        clearInterval(callNums);
        clearInterval(showGameOver);
        showGameOver = setTimeout(() => {
            if (checkWin !== 15) {
                gameOver.innerText = 'Game Over. You Lost!';
                randNum.innerHTML = '';
                clickAgain.style.display = 'inline-block';
                changeClick('none', 'none');
            } else {
                winShower();
            }
        }, 4 * 1000);
    } else {
        randNum.innerHTML = `<div>${callRandomNumber(allNumbers)}</div>`;
    }
}

function winShower () {
    if (checkWin === 15) {
        clearInterval(callNums);
        gameOver.innerText = 'You Win!';
        randNum.innerHTML = '';
        clickAgain.style.display = 'inline-block';
        clickAgain.innerText = 'New Game';
        changeClick('none', 'none');
    }
}

function closeNumber (box, row) {
    if (row.check === true) {
        box.innerHTML = `<div class="number-out">${row.num}</div>`;
        checkWin++;
        row.check = false;
    }
}

function changeClick (on, off) {
    clickPlay.style.display = off;
    clickStop.style.display = on;
}

function CreateNewGame () {
    cardColumn = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];

    emptyIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    emptyIndexForLast = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    allNumbers = [];
    checkWin = 0;

    cardRows = [
        [],
        [],
        []
    ];

    pushAllNumbers(allNumbers);
    pushRowNumbers();

    addRowNums(cardRows[0]);
    addRowNums(cardRows[1]);
    addRowNums(cardRows[2]);

    emptyAreas(cardRows[0], emptyIndex);
    emptyAreas(cardRows[1], emptyIndex);
    emptyAreas(cardRows[2], emptyIndexForLast);

    rendNums(row1, cardRows[0]);
    rendNums(row2, cardRows[1]);
    rendNums(row3, cardRows[2]);

    clickAgain.style.display = 'none';
    clickPlay.style.display = 'inline-block';
    gameOver.innerText = '';
    callingNumbers.innerHTML = '';
}

//// create all numbers ////////////////////////////////////////////////
function pushRowNumbers () {
    for (let i = 0; i <= 9; i++) {
        if (i !== 0) {
            cardColumn[0].push(i);
        }
        cardColumn[1].push(i + 10);
        cardColumn[2].push(i + 20);
        cardColumn[3].push(i + 30);
        cardColumn[4].push(i + 40);
        cardColumn[5].push(i + 50);
        cardColumn[6].push(i + 60);
        cardColumn[7].push(i + 70);
        cardColumn[8].push(i + 80);
    }
}

function randomindex (row) {
    let randomindex = Math.floor(Math.random() * row.length);
    return randomindex;
}

function addRowNums (row) {
    let randomNum1 = cardColumn[0].splice(randomindex(cardColumn[0]), 1)[0];
    let randomNum2 = cardColumn[1].splice(randomindex(cardColumn[1]), 1)[0];
    let randomNum3 = cardColumn[2].splice(randomindex(cardColumn[2]), 1)[0];
    let randomNum4 = cardColumn[3].splice(randomindex(cardColumn[3]), 1)[0];
    let randomNum5 = cardColumn[4].splice(randomindex(cardColumn[4]), 1)[0];
    let randomNum6 = cardColumn[5].splice(randomindex(cardColumn[5]), 1)[0];
    let randomNum7 = cardColumn[6].splice(randomindex(cardColumn[6]), 1)[0];
    let randomNum8 = cardColumn[7].splice(randomindex(cardColumn[7]), 1)[0];
    let randomNum9 = cardColumn[8].splice(randomindex(cardColumn[8]), 1)[0];

    let randNumsArr = [
        randomNum1,
        randomNum2,
        randomNum3,
        randomNum4,
        randomNum5,
        randomNum6,
        randomNum7,
        randomNum8,
        randomNum9
    ]

    for (let i = 0; i < randNumsArr.length; i++) {
        row.push(new CardLotto(randNumsArr[i], false));
    }
}

function emptyAreas (row, empty) {
    for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * empty.length);
        let findEmptyIndex = empty.splice(index, 1)[0];
        row[findEmptyIndex].num = undefined;
    }
}

function rendNums (row, rowArr) {
    for (let i = 0; i < row.length; i++) {
        if (rowArr[i].num !== undefined) {
            row[i].innerText = rowArr[i].num;
        } else {
            row[i].innerText = '';
        }
    }
}

function pushAllNumbers (arr) {
    for (let i = 1; i < 90; i++) {
        arr.push(i);
    }
}

function callRandomNumber (arr) {
    let index = Math.floor(Math.random() * arr.length);
    let randomNum = arr.splice(index, 1)[0];
    callingNumbers.innerHTML += `<div>${randomNum}</div>`;
    checkNumber(cardRows[0], randomNum);
    checkNumber(cardRows[1], randomNum);
    checkNumber(cardRows[2], randomNum);
    return randomNum;
}

function checkNumber (cardRow, randomNum) {
    cardRow.forEach(e => {
        if(e.num === randomNum) {
            e.check = true;
        }
    });
}