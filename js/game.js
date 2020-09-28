'use strict'

const MINE = '💣'
const EMPTY_CELL = " "
var gIntervalId;
var gStartTime;


var gBoard;
var gGame;
var gDifficulty = 4
var gStartTime;

function init() {
    if (gIntervalId) clearInterval(gIntervalId);
    gGame = {
        score: 0,
        isOn: true
    };
    gBoard = buildBoard(gDifficulty)
    addMinesToBoard(gBoard, getNumOfMinesBaseOnDifficulty(gDifficulty))
    runTime()
    setMinesCount(gBoard)
    hideModal()
    hideVictoryModal()
    // hideTimeModal()

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
    showModal()
}





function onGameOver() {
    gGame.isOn = false;
    showAllCellsContent()
    gameOverAlert()
    clearInterval(gIntervalId);
    // hideTimeModal()
    // setTimeout(function () {
    //     gameOverAlert()
    // }
    //     , 1000)
    setTimeout(function () { init() }, 3000)
    renderBoard(gBoard)
}

function showNeighborCells(cellI, cellJ, board) {
    console.log('showNeighborCells');
    for (var i = cellI - 1; i <= cellI + 1; i++) {

        if (i < 0 || i >= board.length) continue;

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (board[i][j].isMarked === true) continue;
            board[i][j].isShown = true
        }
    }
    console.log('board :', board);
    renderBoard(board);

}




function toggleFlag(event, elCell, i, j) {
    event.preventDefault();
    console.log('toggleFlag :', elCell);
    var cell = gBoard[i][j]
    cell.isMarked = !cell.isMarked;


    if (cell.isMarked && isGameWin(gBoard, gDifficulty)) {
        victoryModal()

    }
    renderBoard(gBoard);
}


function isGameWin(board, diff) {
    var numOfFlags = 0;
    var numOfOpenCell = 0;
    var totalNumOfMines = getNumOfMinesBaseOnDifficulty(diff);
    var totalNumOfCell = diff * diff - totalNumOfMines;

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var cell = board[i][j];

            if (!cell.isMine && cell.isShown) numOfOpenCell++;
            if (cell.isMine && cell.isMarked) numOfFlags++;


        }
    }

    if (numOfOpenCell === totalNumOfCell && numOfFlags === totalNumOfMines) {
        return true
    }

    return false;


}

function cellClicked(elCell, i, j) {
    var currentCell = gBoard[i][j];
    currentCell.isShown = true;
    elCell.classList.remove('hidden')


    if (currentCell.isMine && !currentCell.isMarked) {
        onGameOver();
        return;
    }



    if (gBoard[i][j].minesAroundCount === 0) {
        // showNeighborCellsRecursive(i, j, gBoard)
        showNeighborCells(i, j, gBoard);
        renderBoard(gBoard)

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


function runTime() {
    gStartTime = Date.now();
    gIntervalId = setInterval(runTimer, 1000);
}

function runTimer() {
    var elTimeModal = document.querySelector('.time-modal');
    elTimeModal.style.display = 'block';
    var timer = parseInt(((Date.now() - gStartTime))/ 1000);
    elTimeModal.innerText = timer;
    return;
}

// function getTime() {
//     setInterval(function () {
//         var now = new Date().getTime();
//         var countDownDate = isGameWin() || onGameOver()
//         var distance = now - countDownDate.getTime();
//         console.log(countDownDate)
//         var seconds = Math.floor((distance % (1000 * 60)) / 1000);
//         elTime = Element.getElementsByClassName('.time-modal')
//         elTime.innerHTML = seconds;
//     }, 1000);

//     renderBoard(gBoard)
// }


function showModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block';
}

function hideModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none';
}

function victoryModal() {
    var elModal = document.querySelector('.victory-modal')
    elModal.style.display = 'block';
    // elModal.style.display = (elModal.style.display === 'none') ? 'block' : 'none';
}

function hideVictoryModal() {
    var elModal = document.querySelector('.victory-modal')
    elModal.style.display = 'none';
}

// function showTimeModal() {
//     var elModal = document.querySelector('.time-modal')
//     elModal.style.display = 'block';
// }

// function hideTimeModal() {
//     var elModal = document.querySelector('.time-modal')
//     elModal.style.display = 'none';
// }