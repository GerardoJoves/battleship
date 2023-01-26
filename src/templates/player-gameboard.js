import { html, nothing } from 'lit-html';
import gameboardCell from './cell';
import { coordsLetters, coordsNums } from './coords';
import draggableShip from './draggable-ship';
import staticShip from './static-ship';
import randomise from '../event-handlers/randomise';
import reset from '../event-handlers/reset';

function label() {
  return html`<div class="gameboard-label">Your grid</div>`;
}

function boardButtons() {
  return html`<div class="gameboard-options">
    <button @click=${randomise}>Randomise</button>
    <button @click=${reset}>Reset</button>
  </div>`;
}

export default function playerGameboard(boardState, ships, arrangingShips) {
  const renderedShips = [];
  return html`<div>
    <div class="gameboard player">
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
    const { position } = ships[Math.abs(cell)];
    const ship = arrangingShips ? draggableShip(position) : staticShip(position);
    if (cell > 0) return gameboardCell('cell occupied', i, ship);
    return gameboardCell('cell occupied hit', i, ship);
  })}
  </div>
  ${label()}
  ${arrangingShips ? boardButtons() : nothing}
  </div>`;
}
