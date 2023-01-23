import { html } from 'lit-html';
import gameboardCell from './cell';
import { coordsLetters, coordsNums } from './coords';
import draggableShip from './draggable-ship';

export default function playerGameboard(boardState, ships) {
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
    if (cell > 0) return gameboardCell('cell occupied', i, draggableShip(ships[cell].position));
    return gameboardCell('cell occupied hit', i, draggableShip(ships[Math.abs(cell)].position));
  })}
  </div>`;
}