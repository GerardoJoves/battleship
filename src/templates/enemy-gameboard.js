import { html, nothing } from 'lit-html';
import { coordsLetters, coordsNums } from './coords';
import attackEnemy from '../event-handlers/attack-enemy';
import gameboardCell from './cell';
import startGame from '../event-handlers/start-game';

function cover() {
  return html`<div class="cover">
    <button
    @click=${startGame}
    class="play-button">Play</button>
  </div>`;
}

export default function enemyGameboard(boardState, ships, placementPhase) {
  return html`<div>
    <div
    class="gameboard enemy"
    @click=${placementPhase ? nothing : attackEnemy}>
    ${placementPhase ? cover() : ''}
    ${coordsLetters()}
    ${coordsNums()}
    ${boardState.map((cell, i) => {
    if (cell === '.') return gameboardCell('cell missed-shot', i);
    if (cell === null || cell > 0) return gameboardCell('cell empty', i);
    if (ships[Math.abs(cell)].ship.isSunk()) return gameboardCell('cell occupied hit sunk', i);
    return gameboardCell('cell occupied hit', i);
  })}
  </div>
  <div class="gameboard-label">Opponent's grid</div>
  </div>`;
}
