import events from '../utilities/events';

let clickWorks = true;

function preventRotation() {
  clickWorks = false;
}

function stopRotationIfShipWasDragged(e) {
  e.target.addEventListener('pointermove', preventRotation);
}

function rotate(e) {
  e.target.removeEventListener('pointermove', preventRotation);
  if (!clickWorks) {
    clickWorks = true;
    return;
  }
  const els = document.elementsFromPoint(e.clientX, e.clientY);
  const cell = els.find((el) => el.hasAttribute('data-cell-number'));
  if (!cell) return;
  const cellNum = Number.parseInt(cell.getAttribute('data-cell-number'), 10);
  events.emit('rotate ship at cell', cellNum);
}

export { stopRotationIfShipWasDragged, rotate };
