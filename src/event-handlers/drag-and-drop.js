import events from '../utilities/events';
import isValidCell from '../utilities/isValidCell';

let ship = null;
let cellWidth = 0;

function getCellNumber() {
  const rect = ship.getBoundingClientRect();
  const shipFrontCoordX = rect.left + cellWidth / 2;
  const shipFrontCoordY = rect.top + cellWidth / 2;
  const els = document.elementsFromPoint(shipFrontCoordX, shipFrontCoordY);
  const cellNum = els.find((el) => el.hasAttribute('data-cell-number'));
  return cellNum;
}

function drag(e) {
  e.preventDefault();
  ship.classList.add('dragging');
  ship.style.top = `${parseInt(ship.style.top, 10) + e.movementY}px`;
  ship.style.left = `${parseInt(ship.style.left, 10) + e.movementX}px`;
}

function drop() {
  const cell = getCellNumber();
  ship.classList.remove('dragging');
  ship.style.zIndex = 5;
  ship.style.top = '1px';
  ship.style.left = '1px';
  // eslint-disable-next-line
  unbindEvents();
  if (cell) {
    const prevCell = Number(ship.parentElement.getAttribute('data-cell-number'));
    const newCell = Number(cell.getAttribute('data-cell-number'));
    if (prevCell === newCell) return;
    if (isValidCell(prevCell) && isValidCell(newCell)) {
      events.emit('change ship position', { prevCell, newCell });
    }
  }
}

function unbindEvents() {
  window.removeEventListener('pointermove', drag);
  window.removeEventListener('pointerup', drop);
  document.body.removeEventListener('pointerleave', drop);
}

function bindEvents() {
  window.addEventListener('pointermove', drag);
  window.addEventListener('pointerup', drop);
  document.body.addEventListener('pointerleave', drop);
}

function grab(e) {
  e.preventDefault();
  ship = e.target;
  cellWidth = ship.parentElement.offsetWidth;
  ship.style.zIndex = 10;
  bindEvents();
}

export default grab;
