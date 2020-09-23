function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            var cell = row[j]
            var mineIcon = (cell.isMine) ? MINE : ''
            // strHtml += `<td data-i="${i}" data-j="${j}" >`; 
            strHtml += '<td>';
            strHtml += mineIcon;
            strHtml += '</td>';

        }
        strHtml += '</tr>\n'
    }

    var elTable = document.querySelector('.board')
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

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
