'use strict';
//CR: very nice job, nice code and good looking game
const MINE = '*';
const N_EMOJI = '😃';
const DEAD_EMOJI = '😵';
const V_EMOJI = '😍';

var gLevel = [{ size: 4, mines: 2, resStore: 'level1' },
{ size: 6, mines: 5, resStore: 'level2' },
{ size: 8, mines: 15, resStore: 'level3' }];

var gState = {
    isGameOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gGameLevel = {
    size: gLevel[1].size,
    mines: gLevel[1].mines,
    resStore: gLevel[1].resStore
}

var gBoard;
var gTimeInterval;


function initGame() {
    clearInterval(gTimeInterval);
    document.querySelector('h1').classList.add('hide');
    document.querySelector('#best').innerText = numToSTR(localStorage.getItem(gGameLevel.resStore));
    document.querySelector('#time').innerText = '000';
    document.querySelector('#emoji').innerText = N_EMOJI;
    gState = {
        isGameOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    gBoard = buildBoard(gGameLevel.size, gGameLevel.mines);
    renderBoard(gBoard);
    //console.table(gBoard);
}

//CR: mines is not used
function buildBoard(size, mines) {
    //Build the Matrix
    var board = [];
    for (var i = 0; i < size; i++) {
        board.push([]);
        for (let j = 0; j < size; j++) {
            // CR: createMine function would be nice. 
            board[i][j] = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false };
        }
    }
    return board;
}

function renderBoard(board) {

    var elBoard = document.querySelector('.board');
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>\n`;
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            var cellClass = '';
            if (currCell.isShown) cellClass += ' show';
            if (currCell.isMarked) cellClass += ' marked';
            if (currCell.isMine && !gState.isGameOn) cellClass += ' show';
            strHTML += `\t<td class=" cell ${cellClass}" onmousedown="cellClicked(event, ${i}, ${j})">`
            if (currCell.isMine) strHTML += `${MINE}`
            else strHTML += `${currCell.minesAroundCount}`
        }
    }
    strHTML += `</td>\n`;
    strHTML += '</tr>\n';

    elBoard.innerHTML = strHTML;
}

//renders a number between 0 to max (max excluded)
function randomInt(max) {
    var randomNum = Math.floor((Math.random() * max));
    return randomNum;
}

//generation mines neighbors
// CR: good logic, but the inner loops can be move to a functions called countNegs 
// to improve readability
function setMinesNegsCount(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            if (currCell.isMine === true) continue;
            for (let idxi = i - 1; idxi <= i + 1; idxi++) {
                for (let idxj = j - 1; idxj <= j + 1; idxj++) {
                    if (idxi < 0 || idxi >= board.length) continue;
                    if (idxj < 0 || idxj >= board.length) continue;
                    if (board[idxi][idxj].isMine === true) currCell.minesAroundCount++;
                }
            }
        }
    }
}


function cellClicked(event, i, j) {
    if (!gState.isGameOn) return;
    var currCell = gBoard[i][j];
    //start Timer on first click
    if (!gState.markedCount && !gState.shownCount) {
        gTimeInterval = setInterval(function () {
            gState.secsPassed++;
            document.querySelector('#time').innerText = numToSTR(gState.secsPassed);
        }, 1000)
    }

    //if right click
    if (event.button === 2) {
        currCell.isMarked = !currCell.isMarked;
        if (currCell.isMarked) gState.markedCount++;
        else gState.markedCount--;
        renderBoard(gBoard)
        checkGameOver();

    }
    // if left click
    if (currCell.isMarked || currCell.isShown) return;
    if (event.button === 0) {
        if (gState.shownCount === 0) {
        //CR: better place for this if statement code is the if (!gState.markedCount && !gState.shownCount) {   
            addMines(gGameLevel.mines, i, j);
            setMinesNegsCount(gBoard);
        }
        if (currCell.isMine) {
            document.querySelector('#emoji').innerText = DEAD_EMOJI;
            gameOver('GAME OVER');
        } else if (currCell.minesAroundCount === 0) expandShown(gBoard, i, j);
        else {
            currCell.isShown = true;
            gState.shownCount++;
        }
        renderBoard(gBoard);
        checkGameOver();
    }
}

function expandShown(board, i, j) {
    var emptyCells = []
    for (let idxi = i - 1; idxi <= i + 1; idxi++) {
        for (let idxj = j - 1; idxj <= j + 1; idxj++) {
            if (idxi < 0 || idxi >= gGameLevel.size ||
                idxj < 0 || idxj >= gGameLevel.size) continue;
            if (board[idxi][idxj].minesAroundCount === 0
                && !board[idxi][idxj].isShown
                && !board[idxi][idxj].isMarked) {
                // CR: empty cell array is over complicated for no reason.
                // just call the expandShown function
                emptyCells.push({ i: idxi, j: idxj });
            }
            if (!board[idxi][idxj].isShown && !board[idxi][idxj].isMarked) {
                board[idxi][idxj].isShown = true;
                gState.shownCount++;
            }
        }
    }
    while (emptyCells.length > 0) {
        expandShown(board, emptyCells[0].i, emptyCells[0].j);
        emptyCells.shift();
    }
}

function checkGameOver() {

    if (gState.shownCount + gState.markedCount === gGameLevel.size * gGameLevel.size) {
        gState.isGameOn = false;
        var tempRes = +localStorage.getItem(gGameLevel.resStore)
        if (!tempRes) localStorage.setItem(gGameLevel.resStore, gState.secsPassed);
        else if (gState.secsPassed < tempRes) localStorage.setItem(gGameLevel.resStore, gState.secsPassed);
        document.querySelector('#emoji').innerText = V_EMOJI;
        clearInterval(gTimeInterval);
        gameOver('WINNER!')
    } else return;
}

function gameOver(message) {
    gState.isGameOn = false;

    clearInterval(gTimeInterval);
    document.querySelector('h1').innerText = message;
    document.querySelector('h1').classList.remove('hide');
}

function gameLevel(level) {
    gGameLevel = {
        size: gLevel[level].size,
        mines: gLevel[level].mines,
        resStore: gLevel[level].resStore
    }
    initGame();
}



// CR: mines is name of array.
function addMines(mines, i, j) {

    var mineReleased = 0;
    while (mineReleased < mines) {
        var currCell = gBoard[randomInt(gGameLevel.size)][randomInt(gGameLevel.size)]
        if (currCell.isMine === false && currCell !== gBoard[i][j]) {
            currCell.isMine = true;
            mineReleased++;
        }
    }
}

function numToSTR(num) {
    if (num === null) return 999
    var nNum;
    if (num < 10) nNum = '0' + '0' + num;
    else if (num < 100) nNum = '0' + num;
    else if (num < 1000) nNum = num;
    else nNum = 999;
    return nNum
}