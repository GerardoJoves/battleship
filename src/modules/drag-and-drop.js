import events from './events';
import isValidCell from '../utilities/isValidCell';

let ship = null;
let cellWidth = 0;

function drag(e) {
  e.preventDefault();
  ship.style.top = `${parseInt(ship.style.top, 10) + e.movementY}px`;
  ship.style.left = `${parseInt(ship.style.left, 10) + e.movementX}px`;
}

function drop() {
  const rect = ship.getBoundingClientRect();
  const shipFrontCoordX = rect.left + cellWidth / 2;
  const shipFrontCoordY = rect.top + cellWidth / 2;
  const els = document.elementsFromPoint(shipFrontCoordX, shipFrontCoordY);
  const cell = els.find((el) => el.hasAttribute('data-cell-number'));
  ship.classList.remove('dragging');
  ship.style.zIndex = 5;
  ship.style.top = 0;
  ship.style.left = 0;
  // eslint-disable-next-line
  unbindEvents();
  if (cell) {
    const prevCell = Number(ship.parentElement.getAttribute('data-cell-number'));
    const newCell = Number(cell.getAttribute('data-cell-number'));
    if (isValidCell(prevCell) && isValidCell(newCell)) {
      events.emit('change ship position', { prevCell, newCell });
    }
  }
}

function unbindEvents() {
  window.removeEventListener('touchmove', drag);
  window.removeEventListener('touchend', drop);
  document.body.removeEventListener('touchleave', drop);

  window.removeEventListener('pointermove', drag);
  window.removeEventListener('pointerup', drop);
  document.body.removeEventListener('pointerleave', drop);
}

function bindEvents() {
  window.addEventListener('touchmove', drag);
  window.addEventListener('touchend', drop);
  document.body.addEventListener('touchleave', drop);

  window.addEventListener('pointermove', drag);
  window.addEventListener('pointerup', drop);
  document.body.addEventListener('pointerleave', drop);
}

function grab(e) {
  e.preventDefault();
  ship = e.target;
  ship.classList.add('dragging');
  cellWidth = ship.parentElement.offsetWidth;
  ship.style.zIndex = 10;
  bindEvents();
}

export default grab;
