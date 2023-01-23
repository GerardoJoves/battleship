import events from '../utilities/events';

let poiterMoved = false;

function preventRotation() {
  poiterMoved = true;
}

function startRotation(e) {
  e.target.addEventListener('pointermove', preventRotation);
}

function endRotation(e) {
  e.target.removeEventListener('pointermove', preventRotation);
  if (poiterMoved) {
    poiterMoved = false;
    return;
  }
  const els = document.elementsFromPoint(e.clientX, e.clientY);
  const cell = els.find((el) => el.hasAttribute('data-cell-number'));
  if (!cell) return;
  const cellNum = Number.parseInt(cell.getAttribute('data-cell-number'), 10);
  events.emit('rotate ship at cell', cellNum);
  poiterMoved = false;
}

export { startRotation, endRotation };
