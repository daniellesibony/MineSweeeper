function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            var cell = row[j]
            var mineInCell = (cell.isMine) ? MINE : cell.minesAroundCount; 
            // var className = cell === MINE ? 'hidden' : ' '
            // className += ` cell cell-${i}-${j}`;
            var className = `cell cell-${i}-${j}`;
            var hiddenClass = cell.isShown ? '' : 'hidden' ;
            strHtml += `<td onclick="cellClicked(this, ${i}, ${j})" 
                            data-i="${i}" 
                            data-j="${j}" 
                            class="${className} ${hiddenClass}" >`;
                            // class="${className} ${}" >`;
            strHtml += `<span>${mineInCell}</span>`;
            strHtml += '</td>';

        }
        strHtml += '</tr>\n'
    }

    var elTable = document.querySelector('.board')
    // document.getElementById("test").style.display= 'none';
    elTable.innerHTML = strHtml;
}





// function renderBoard(board) {
//     var strHtml = '';
//     for (var i = 0; i < board.length; i++) {
//         var row = board[i];
//         strHtml += '<tr>'
//         for (var j = 0; j < board[0].length; j++) {
//             var cell = row[j]
//             strHtml += '<td>'; 
//             strHtml += cell; 
//             strHtml += '</td>';

//         }
//         strHtml += '</tr>'
//     }
//     var elTable = document.querySelector('.board')
//     elTable.innerHTML = strHtml;
// }

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

