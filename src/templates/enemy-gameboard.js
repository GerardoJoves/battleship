import { html } from 'lit-html';
import { coordsLetters, coordsNums } from './coords';
import attackEnemy from '../event-handlers/attack-enemy';
import gameboardCell from './cell';

export default function enemyGameboard(boardState, ships) {
  return html`<div class="gameboard enemy" @click=${attackEnemy}>
    ${coordsLetters()}
    ${coordsNums()}
    ${boardState.map((cell, i) => {
    if (cell === '.') return gameboardCell('cell missed-shot', i);
    if (cell === null || cell > 0) return gameboardCell('cell empty', i);
    if (ships[Math.abs(cell)].ship.isSunk()) return gameboardCell('cell occupied hit sunk', i);
    return gameboardCell('cell occupied hit', i);
  })}
  </div>`;
}
