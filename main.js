"use strict";

const grids = document.querySelectorAll('.cell');
const stroke = document.getElementById('strike');
const winnerTextArea = document.getElementById('winnerTextArea');
const winnerText = document.getElementById('winnerText');
const restartBtn = document.getElementById('restartBtn');
const turnSymbol = document.getElementById('turnSymbol');
const X = 'X';
const O = 'O';
let turn = X;
const gameState = Array(grids.length).fill(null);
const winCombos = [
  // Rows
  { combos: [1, 2, 3], strokeClass: 'strike-row1' },
  { combos: [4, 5, 6], strokeClass: 'strike-row2' },
  { combos: [7, 8, 9], strokeClass: 'strike-row3' },
  // Columns
  { combos: [1, 4, 7], strokeClass: 'strike-col1' },
  { combos: [2, 5, 8], strokeClass: 'strike-col2' },
  { combos: [3, 6, 9], strokeClass: 'strike-col3' },
  // Diagonals
  { combos: [1, 5, 9], strokeClass: 'strike-diag-lr' },
  { combos: [3, 5, 7], strokeClass: 'strike-diag-rl' },
];

turnSymbol.innerText = turn;

grids.forEach((grid) => grid.addEventListener('click', gridClickHandler));

function gridClickHandler(e) {
  if ((winnerTextArea.classList.contains('block'))) return;

  const grid = e.target;

  if (grid.innerText !== "") return;

  if (turn === X) {
    grid.innerText = X;
    gameState[grid.id - 1] = X;
    turn = O;
  } else {
    grid.innerText = O;
    gameState[grid.id - 1] = O;
    turn = X;
  }
  turnSymbol.innerText = turn;
  hoverEffectHandler();
  checkCombos();
}


function hoverEffectHandler() {
  grids.forEach(grid => {
    grid.classList.remove('x-hover');
    grid.classList.remove('o-hover');
  })

  const hoverClass = `${turn.toLowerCase()}-hover`;

  grids.forEach((grid) => {
    if (grid.innerText == "") {
      grid.classList.add(hoverClass);
    }
  })
}
hoverEffectHandler();


function checkCombos() {
  for (const winCombo of winCombos) {
    const { combos, strokeClass } = winCombo;
    const gridVal1 = gameState[combos[0] - 1];
    const gridVal2 = gameState[combos[1] - 1];
    const gridVal3 = gameState[combos[2] - 1];

    if (gridVal1 != null 
      && gridVal1 == gridVal2 
      && gridVal1 == gridVal3) {
      stroke.classList.add(strokeClass);
      winnerFind(gridVal1);
      return;
    }
  }

  if(gameState.every((grid) => grid !== null)) {
    winnerFind(null);
  }
}



function winnerFind(winnerPlayer) {
  turnSymbol.parentNode.classList.add('hidden');
  let text = "Draw 😑";
  if(winnerPlayer != null)  {
    text = `Winner is ${winnerPlayer} 🏆`
  }

  winnerTextArea.classList.remove('hidden');
  winnerTextArea.classList.add('block');
  winnerText.innerText = text;
}


restartBtn.addEventListener('click', restartHandler)


function restartHandler() {
  winCombos.forEach((winCombo) => {
    if(stroke.classList.contains(winCombo.strokeClass)) {
      stroke.classList.remove(winCombo.strokeClass);
    }
  })
  winnerTextArea.classList.add('hidden');
  winnerTextArea.classList.remove('block');
  gameState.fill(null);
  grids.forEach((grid) => (grid.innerText = ''));
  turn = X;
  turnSymbol.parentNode.classList.remove('hidden');
  turnSymbol.innerText = turn;
  hoverEffectHandler();
}