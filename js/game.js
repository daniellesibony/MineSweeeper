'use strict'

const MINE = '💣'
const EMPTY_CELL = " "


var gBoard;
var gGame;
var gDifficulty = 4
var gStartTime;

function init() {
    gGame = {
        score: 0,
        isOn: true
    };
    gBoard = buildBoard(gDifficulty)
    addMinesToBoard(gBoard, getNumOfMinesBaseOnDifficulty(gDifficulty))
    setMinesCount(gBoard)

    renderBoard(gBoard)
}

function getNumOfMinesBaseOnDifficulty(diff) {

    switch (diff) {
        case 4:
            return 2;

        case 8:
            return 12;

        case 12:
            return 30;

        default:
            return 2;
    }
}



// function getValidRnd() {
//     var rndIdx = getRandomInt(1, gDifficulty.length);
//     var rndNum = gBoard.splice(rndIdx, 1)[0];
//     return rndNum;
// }
function buildBoard(gDifficulty) {
    var board = [];
    for (var i = 0; i < gDifficulty; i++) {
        board.push([]);
        for (var j = 0; j < gDifficulty; j++) {
            board[i][j] = createCell();
        }
    }
    return board;
}

function addMinesToBoard(board, numOfMinesToAdd) {

    var numOfAddedMine = 0;

    while (numOfAddedMine < numOfMinesToAdd) {
        var col = getRandomInt(1, gDifficulty);
        var row = getRandomInt(1, gDifficulty);

        if (!board[col][row].isMine) {
            board[col][row].isMine = true;
            numOfAddedMine++;
        }
    }



}



function createCell() {
    var cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
        showFlag: false,
    }
    return cell;
}

function showAllCellsContent() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            gBoard[i][j].isShown = true;
        }
    }

    renderBoard(gBoard);
}

function gameOverAlert() {
    alert('YOU SUCK 🤦🏼‍♀️')
}

function isGameWin(i, j) {
    var curCell = gBoard[i][j]
    if (curCell.isMine === curCell.showFlag && showAllCellsContent()) {
        alert('WINNER WINNER CHICKEN DINNER!!!!')
    }
}




function onGameOver() {
    gGame.isOn = false;
    showAllCellsContent()
    setTimeout(function () {
        gameOverAlert()
    }
        , 1000)
}

function showNeighborCells(cellI, cellJ, board) {
    console.log('showNeighborCells');
    for (var i = cellI - 1; i <= cellI + 1; i++) {

        if (i < 0 || i >= board.length) continue;

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            board[i][j].isShown = true
            // if (board[i][j].isMine === true) neighborsSum++;
        }
    }
    console.log('board :', board);
    renderBoard(board);

}

function toggleFlag(event, elCell, i, j) {
    event.preventDefault();
    console.log('toggleFlag :', elCell);
    gBoard[i][j].showFlag = !gBoard[i][j].showFlag;
    renderBoard(gBoard);
}

function cellClicked(elCell, i, j) {
    var currentCell = gBoard[i][j];
    currentCell.isShown = true;

    elCell.classList.remove('hidden')
    console.log(elCell)
    if (currentCell.isMine) {
        onGameOver();
    }

    if (gBoard[i][j].minesAroundCount === 0) {
        showNeighborCells(i, j, gBoard);
    }
}




function countMinesNbrs(cellI, cellJ, board) {
    var neighborsSum = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (board[i][j].isMine === true) neighborsSum++;
        }
    }
    return neighborsSum;
}

function setMinesCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var cell = board[i][j];
            cell.minesAroundCount = countMinesNbrs(i, j, board)
        }
    }
    return board;
}

function changeDifficulty(difficulty) {
    gDifficulty = difficulty;
    init();
}

