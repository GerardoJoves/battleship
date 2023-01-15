import events from '../modules/events';

function attackEnemy(e) {
  const cell = e.target.getAttribute('data-cell-number');
  events.emit('attack enemy board', cell);
}

function gameboardCell(cellClass, cellNum) {
  return `<div class=${cellClass} data-cell-number=${cellNum}><div>`;
}

function DOMBoard(boardState) {
  return `<div class="gameBoard">
    ${boardState.map((cell, i) => {
    if (typeof cell === 'number') return gameboardCell('cell ship', i);
    if (cell === 'x') return gameboardCell('cell hit-ship', i);
    if (cell === '.') return gameboardCell('cell missed-shot', i);
    return gameboardCell('cell empty', i);
  })}
  </div>`;
}

function DOMEnemyBoard(boardState) {
  return `<div class="gameboard" @click=${attackEnemy}>
    ${boardState.map((cell, i) => {
    if (cell === 'x') return gameboardCell('cell hit-ship', i);
    if (cell === '.') return gameboardCell('cell missed-shot', i);
    return gameboardCell('cell empty', i);
  })}
  </div>`;
}

export { DOMBoard, DOMEnemyBoard };
