'use strict';

let orderCount = 1;
let clickZone = null;
let clickZoneColumn = 0;
let clickZoneRow = 0;
let whichStone = null;


// 白と黒を交互にボタンクリックで石を置く
$(function(){
  $('button').on('click', function(){
      if (orderCount % 2 === 0) {  // 白と黒を交互に置く
        if (!$(this).hasClass('blkBtn') && !$(this).hasClass('whtBtn')) {  // 既に置いてある場所には置けない
          $(this).addClass('whtBtn');

          whichStone = 'whtBtn';

          clickZone = this;
          clickZoneColumn = clickZone.dataset.column;
          clickZoneColumn = parseInt(clickZoneColumn);
          clickZoneRow = clickZone.dataset.row;
          clickZoneRow = parseInt(clickZoneRow);

          if (judge(clickZoneColumn,clickZoneRow) === 'keepOn') {
            orderCount += 1;
            $("#guideCont").removeClass("whtColor");
            $('#guideCont').addClass('blkColor');
            document.getElementById('guideCont').textContent = '黒の番です';
          } else if (judge(clickZoneColumn,clickZoneRow) === 'end') {
            document.getElementById('board').classList.add('displaynone');
            $('.guide').addClass('displaynone');
            $("#resetButton").addClass("displaynone");
            $("#victoryTop").removeClass("displaynone");
            document.getElementById('victory').textContent = '５個揃いました白の勝利です！';
          }
        }
      } else {
        if (!$(this).hasClass('whtBtn') && !$(this).hasClass('blkBtn')) {  // 既に置いてある場所には置けない
          $(this).addClass('blkBtn');

          whichStone = 'blkBtn';

          clickZone = this;
          clickZoneColumn = clickZone.dataset.column;
          clickZoneColumn = parseInt(clickZoneColumn);
          clickZoneRow = clickZone.dataset.row;
          clickZoneRow = parseInt(clickZoneRow);

          if (judge(clickZoneColumn,clickZoneRow) === 'keepOn') {
            orderCount += 1;
            $("#guideCont").removeClass("blkColor");
            $('#guideCont').addClass('whtColor');
            document.getElementById('guideCont').textContent = '白の番です';
          } else if (judge(clickZoneColumn,clickZoneRow) === 'end') {
            document.getElementById('board').classList.add('displaynone');
            $('.guide').addClass('displaynone');
            $("#resetButton").addClass("displaynone");
            $("#victoryTop").removeClass("displaynone");
            document.getElementById('victory').textContent = '５個揃いました黒の勝利です！';
          }
        }
      }
  });
});


// リプレイボタンが押された時の処理

$(function(){
  $('#replayMatch').on('click', function(){
    location.reload();
  });
});

// リセットボタンが押された時の処理

$(function(){
  $('#resetButton').on('click', function(){
    location.reload();
  });
});

// 勝利判定関数

function judge(clickZoneColumn,clickZoneRow) {
  const upDownjudge = upJudge(clickZoneColumn, clickZoneRow) + downJudge(clickZoneColumn, clickZoneRow) + 1;
  const leftRightjudge = leftJudge(clickZoneColumn, clickZoneRow) + rightJudge(clickZoneColumn, clickZoneRow) + 1;
  const upLeftDownRightjudge = upLeftJudge(clickZoneColumn, clickZoneRow) + downRightJudge(clickZoneColumn, clickZoneRow) + 1;
  const upRightDownLeftjudge = upRightJudge(clickZoneColumn, clickZoneRow) + downLeftJudge(clickZoneColumn, clickZoneRow) + 1;

  if (upDownjudge >= 5 || leftRightjudge >= 5 || upLeftDownRightjudge >= 5 || upRightDownLeftjudge >= 5) {
    return 'end';
  } else {
    return 'keepOn';
  }
}


// 上・下・左・右・斜め左上・斜め右上・斜め左下・斜め右下の隣接する石の数を判定

/****** 上方向に判定する関数 *******/
function upJudge(column, row) {
  let upJudgeCount = 0;
  let area = document.querySelectorAll(`[data-column="${column}"]`);
  let areaArray = Array.from(area);

  while(row > 0) {
    if (areaArray[row-1].classList.contains(whichStone)) {
      upJudgeCount += 1;
      row -= 1;
    } else {
      break;
    }
  }

  return upJudgeCount - 1;
}

/****** 下方向に判定する関数 *******/
function downJudge(column, row) {
  let downJudgeCount = 0;
  let area = document.querySelectorAll(`[data-column="${column}"]`);
  let areaArray = Array.from(area);
  let areaLength = areaArray.length + 1;

  while(row < areaLength) {
    if (areaArray[row-1].classList.contains(whichStone)) {
      downJudgeCount += 1;
      row += 1;
    } else {
      break;
    }
  }

  return downJudgeCount - 1;
}

/****** 左方向に判定する関数 *******/
function leftJudge(column, row) {
  let leftJudgeCount = 0;
  let area = document.querySelectorAll(`[data-row="${row}"]`);
  let areaArray = Array.from(area);

  while(column > 0) {
    if (areaArray[column-1].classList.contains(whichStone)) {
      leftJudgeCount += 1;
      column -= 1;
    } else {
      break;
    }
  }

  return leftJudgeCount - 1;
}

/****** 右方向に判定する関数 *******/
function rightJudge(column, row) {
  let rightJudgeCount = 0;
  let area = document.querySelectorAll(`[data-row="${row}"]`);
  let areaArray = Array.from(area);
  let areaLength = areaArray.length + 1;

  while(column < areaLength) {
    if (areaArray[column-1].classList.contains(whichStone)) {
      rightJudgeCount += 1;
      column += 1;
    } else {
      break;
    }
  }

  return rightJudgeCount - 1;
}

/****** 左上方向に判定する関数 *******/
function upLeftJudge(column, row) {
  let upLeftJudgeCount = 0;
  let areaArray = [];
  let arrayRow = row;
  let arrayColumn = column;
  let length = null;

  while (arrayRow > 0 || arrayColumn > 0){
    let area = document.querySelectorAll(`[data-row="${arrayRow}"][data-column="${arrayColumn}"]`);
    area = Array.from(area);
    areaArray.push(area); 
    arrayRow -= 1;
    arrayColumn -= 1;
  };


  if (column > row) {
    length = row;
  } else if(column < row) {
    length = column;
  } else {
    length = row;
  };

  let startPoint = 0;
  while (startPoint < length) {
    if (areaArray[startPoint][0].classList.contains(whichStone)) {
      upLeftJudgeCount += 1;
      startPoint += 1;
    } else {
      break;
    };
  };

  return upLeftJudgeCount - 1;
}

/****** 右下方向に判定する関数 *******/
function downRightJudge(column, row) {
  let downRightJudgeCount = 0;
  let areaArray = [];
  let arrayRow = row;
  let arrayColumn = column;
  let length = null;

  let bord = document.querySelectorAll(`[data-row="${row}"]`);
  bord = Array.from(bord);
  let bordLength = bord.length;

  while (arrayRow <= bordLength || arrayColumn <= bordLength){
    let area = document.querySelectorAll(`[data-row="${arrayRow}"][data-column="${arrayColumn}"]`);
    area = Array.from(area);
    areaArray.push(area); 
    arrayRow += 1;
    arrayColumn += 1;
  };

  column = bordLength - column + 1;
  row = bordLength - row + 1;

  if (column > row) {
    length = row;
  } else if(column < row) {
    length = column;
  } else {
    length = row;
  };

  let startPoint = 0;
  while (startPoint < length) {
    if (areaArray[startPoint][0].classList.contains(whichStone)) {
      downRightJudgeCount += 1;
      startPoint += 1;
    } else {
      break;
    };
  };

  return downRightJudgeCount - 1;
}

/****** 右上方向に判定する関数 *******/
function upRightJudge(column, row) {
  let upRightJudgeCount = 0;
  let areaArray = [];
  let arrayRow = row;
  let arrayColumn = column;
  let length = null;

  let bord = document.querySelectorAll(`[data-row="${row}"]`);
  bord = Array.from(bord);
  let bordLength = bord.length;

  while (arrayRow > 0 || arrayColumn <= bordLength){
    let area = document.querySelectorAll(`[data-row="${arrayRow}"][data-column="${arrayColumn}"]`);
    area = Array.from(area);
    areaArray.push(area); 
    arrayRow -= 1;
    arrayColumn += 1;
  };

  column = bordLength - column + 1;

  if (column > row) {
    length = row;
  } else if(column < row) {
    length = column;
  } else {
    length = row;
  };

  let startPoint = 0;
  while (startPoint < length) {
    if (areaArray[startPoint][0].classList.contains(whichStone)) {
      upRightJudgeCount += 1;
      startPoint += 1;
    } else {
      break;
    };
  };

  return upRightJudgeCount - 1;
}

/****** 左下方向に判定する関数 *******/ 
function downLeftJudge(column, row) {
  let downLeftJudgeCount = 0;
  let areaArray = [];
  let arrayRow = row;
  let arrayColumn = column;
  let length = null;

  let bord = document.querySelectorAll(`[data-row="${row}"]`);
  bord = Array.from(bord);
  let bordLength = bord.length;

  while (arrayRow <= bordLength || arrayColumn > 0){
    let area = document.querySelectorAll(`[data-row="${arrayRow}"][data-column="${arrayColumn}"]`);
    area = Array.from(area);
    areaArray.push(area); 
    arrayRow += 1;
    arrayColumn -= 1;
  };

  row = bordLength - row + 1;

  if (column > row) {
    length = row;
  } else if(column < row) {
    length = column;
  } else {
    length = row;
  };

  let startPoint = 0;
  while (startPoint < length) {
    if (areaArray[startPoint][0].classList.contains(whichStone)) {
      downLeftJudgeCount += 1;
      startPoint += 1;
    } else {
      break;
    };
  };

  return downLeftJudgeCount - 1;
}