'use strict'

const MINE = '💣'
const EMPTY_CELL = " "


var gBoard;

function init() {
    var gBoard = buildBoard()
    // gMines(gBoard)
    renderBoard(gBoard)
}


function buildBoard() {
    var SIZE = 4;
    var cell;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = createCell();
            // if (i === 0 && j === 0 ||
            //     i === 1 && j === 3) {
            //     board[i][j] = MINE;
            // }
        }
    }
    board[0][0].isMine = true, 
    board[1][3].isMine = true
    return board;
}


function createCell() {
    var cell= {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false
    }
return cell;
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


// var gCell;
// function createCell(board) {
//     gCell = {
//         location: {
//             i: 3,
//             j: 5
//         },
//         isSuper: false
//     }
//     board[gPacman.location.i][gPacman.location.j] = PACMAN

// function countNeighbors(cellI, cellJ, board) { 
//     var neighborsSum = 0;
//     for (var i = cellI - 1; i <= cellI + 1; i++) { 
//         if (i < 0 || i >= board.length) continue;
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (j < 0 || j >= board[i].length) continue;
//             if (i === cellI && j === cellJ) continue;
//             if (board[i][j] === MINE || mat[i][j] === EMPTY_CELL) neighborsSum++;
//         }
//     }
//     return neighborsSum;
// }

// function renderCell(i, j, val) {
//     // var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
//     var elCell = document.querySelector(`.cell-${i}-${j}`);
//     elCell.innerText = val;
// }


//     // var gMines;
//     // function gMines(board) {
//     //     gMines = {
//     //         location: {
//     //             i: 0,
//     //             j: 0
//     //         },
//     //         isShown: true
//     //     }
//     //     board[gMines.location.i][gMines.location.j] = MINE
//     //     return board;
//     // }



//     // function cellclicked(){
//     //     var cellId;
//     //     for (var i = 0; i < gBoard.length; i++) {
//     //         var row = gBoard[i]
//     //         for (var j = 0; j < row.length; j++) {
//     //             gBoard[i][j] = cellId
//     //     }
//     //     console.log(cellId)


// //     }
// // }