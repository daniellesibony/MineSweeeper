function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            var cell = row[j]
            var mineInCell = (cell.isMine) ? MINE : cell.minesAroundCount; 
            var className = `cell cell-${i}-${j}`;
            var hiddenClass = cell.isShown ? '' : 'hidden' ;
            strHtml += `<td onclick="cellClicked(this, ${i}, ${j})" 
                            oncontextmenu="toggleFlag(event,this, ${i}, ${j})"
                            data-i="${i}" 
                            data-j="${j}" 
                            class="${className} ${hiddenClass}">`;
            if (cell.showFlag) strHtml += `<img class="flag" src="../asset/images/flag.png" />`;                
            strHtml += `<span>${mineInCell}</span>`;
            strHtml += '</td>';

        }
        strHtml += '</tr>\n'
    }

    var elTable = document.querySelector('.board')
    // document.getElementById("test").style.display= 'none';
    elTable.innerHTML = strHtml;
}



// var timer = setInterval(function() {
//     var now = new Date().getTime();
//     var distance = now - countDownDate.getTime();
//     var seconds = Math.floor((distance % (1000 * 60)) / 1000);
//     document.querySelector('.modal').innerHTML = seconds;
// }, 1000);


function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

// function getRandomIntInclusive(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
