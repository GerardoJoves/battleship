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

function gameboardCell(cellClass, cellNum, ship = '') {
  return html`<div class=${cellClass} data-cell-number=${cellNum}>
    ${ship}
  </div>`;
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

function DOMShip({ length, direction }) {
  return html`<div 
  class="ship ${direction}"
  style="${direction === 'horizontal' ? 'width' : 'height'}: calc(${length * 100}% - 1px)"
  ></div>`;
}

function DOMBoard(boardState, ships) {
  const renderedShips = [];
  return html`<div class="gameboard player">
    ${coordsLetters()}
    ${coordsNums()}
    ${boardState.map((cell, i) => {
    if (cell === '.') return gameboardCell('cell missed-shot', i);
    if (cell === null) return gameboardCell('cell empty', i);
    if (cell > 0 && renderedShips.includes(cell)) return gameboardCell('cell occupied', i);
    if (cell < 0 && renderedShips.includes(Math.abs(cell))) {
      return gameboardCell('cell occupied hit', i);
    }
    renderedShips.push(Math.abs(cell));
    if (cell > 0) return gameboardCell('cell occupied', i, DOMShip(ships[cell].position));
    return gameboardCell('cell occupied hit', i, DOMShip(ships[Math.abs(cell)].position));
  })}
  </div>`;
}

function DOMEnemyBoard(boardState) {
  return html`<div class="gameboard enemy" @click=${attackEnemy}>
    ${coordsLetters()}
    ${coordsNums()}
    ${boardState.map((cell, i) => {
    if (cell === '.') return gameboardCell('cell missed-shot', i);
    if (cell === null || cell > 0) return gameboardCell('cell empty', i);
    return gameboardCell('cell occupied hit', i);
  })}
  </div>`;
}

export { DOMBoard, DOMEnemyBoard };
