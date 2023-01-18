import { html } from 'lit-html';
import events from '../modules/events';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function attackEnemy(e) {
  let cell = e.target.getAttribute('data-cell-number');
  if (cell === null) return;
  cell = Number(cell);
  events.emit('attack enemy board', cell);
}

function gameboardCell(cellClass, cellNum) {
  return html`<div class=${cellClass} data-cell-number=${cellNum}></div>`;
}

function coordsLetters() {
  return html`<div class="letter-coords">
    ${letters.map((l) => html`<div class="coord">${l}</div>`)}
  </div>`;
}

function coordsNums() {
  return html`<div class="number-coords">
    ${nums.map((n) => html`<div class="coord">${n}</div>`)}
  </div>`;
}

function DOMBoard(boardState) {
  return html`<div class="gameboard">
    ${coordsLetters()}
    ${coordsNums()}
    ${boardState.map((cell, i) => {
    if (typeof cell === 'number') return gameboardCell('cell ship', i);
    if (cell === 'x') return gameboardCell('cell hit-ship', i);
    if (cell === '.') return gameboardCell('cell missed-shot', i);
    return gameboardCell('cell empty', i);
  })}
  </div>`;
}

function DOMEnemyBoard(boardState) {
  return html`<div class="gameboard" @click=${attackEnemy}>
    ${coordsLetters()}
    ${coordsNums()}
    ${boardState.map((cell, i) => {
    if (cell === 'x') return gameboardCell('cell hit-ship', i);
    if (cell === '.') return gameboardCell('cell missed-shot', i);
    return gameboardCell('cell empty', i);
  })}
  </div>`;
}

export { DOMBoard, DOMEnemyBoard };
