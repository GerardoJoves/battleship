import events from './events';

export default function attackEnemy(e) {
  let cell = e.target.getAttribute('data-cell-number');
  if (cell === null) return;
  cell = Number(cell);
  events.emit('attack enemy board', cell);
}
