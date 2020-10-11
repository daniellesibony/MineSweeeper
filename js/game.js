'use strict'

const MINE = '💣'
const EMPTY_CELL = " "


var gBoard;
var gGame;

function init() {
    gGame = {
        score: 0,
        isOn: true
    };
    gBoard = buildBoard()
    setMinesCount(gBoard)
    // gMines(gBoard)
    renderBoard(gBoard)
}

var boardlength = 4

function buildBoard(boardlength) {
    var boardlength = 4;
    var board = [];
    for (var i = 0; i < boardlength; i++) {
        board.push([]);
        for (var j = 0; j < boardlength; j++) {
            board[i][j] = createCell();
        }
    }
    board[0][0].isMine = true,
        board[1][3].isMine = true
    return board;
}


function createCell() {
    var cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false
    }
    return cell;
}

function cellClicked(elCell, i, j) {
    gBoard[i][j].isShown = true
    elCell.classList.remove('hidden')
    console.log(elCell)

}

function resetNums(gDifficulty) {
    var nums = [];
    for (var i = 0; i < gDifficulty + 1; i++) {
        nums[i] = i;
    }
    return nums;
}

function changeDifficulty(difficulty) {
    console.log(elBtn.innerText);
    gDifficulty = difficulty;
}

checkGameOver()
function checkGameOver(gBoard, i, j) {
    console.log('Game Over');
    if (gBoard[i][j].isMine === true) {
        gGame.isOn = false;

    }
}


runTime()
function runTime() {
    gStartTime = Date.now();
    gIntervalId = setInterval(runTimer, 1);
}

function runTimer() {
    var elModal = document.querySelector('.modal')
    var timer = (Date.now() - gStartTime) / 1000
    elModal.innerText = timer;
    return;
}


// function finishGame(){
//     clearInterval(gIntervalId);
//     init();
// }
// function getRandMine() {
//     var rndIdx = getRandomInt(1, gboard.length);
//     var rndNum = gBoard.splice(rndIdx, 1)[0];
//     return rndNum;


// function cellclicked(i, j, gBoard) {
//     var cellId;
//     for (var i = 0; i < gBoard.length; i++) {
//         var row = gBoard[i]
//         for (var j = 0; j < row.length; j++) {
//             gBoard[i][j] = cellId
//             console.log(cellId)
//         }
//     }
//     return cellId;
// }



// var gMine;
// function creategMine() {
//     var gMine = {
//         isShown: false,
//         isMine: true,
//         isMarked: false
//     }
//     gMine = MINE
// }

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

//     function cellClicked(elCell, i, j) {
//     // if (elCell.innerText)
//     // if (elCell.classList.contains('occupied'))
//     if (gBoard[i][j] === LIFE) {
//         gBoard[i][j] = SUPER_LIFE;
//         elCell.innerText = gBoard[i][j]
//         blowUpNegs(i, j, gBoard);
//     }
// }


// function renderCell(i, j, val) {
//     // var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
//     var elCell = document.querySelector(`.cell-${i}-${j}`);
//     elCell.innerText = val;
// }



// //     }
// // }