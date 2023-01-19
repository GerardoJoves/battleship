let ship = null;

function drag(e) {
  ship.style.top = `${parseInt(ship.style.top, 10) + e.movementY}px`;
  ship.style.left = `${parseInt(ship.style.left, 10) + e.movementX}px`;
}

function drop() {
  ship.style.zIndex = 1;
  window.removeEventListener('pointermove', drag);
  window.removeEventListener('pointerup', drop);
  document.body.removeEventListener('pointerleave', drop);
}

function grab(e) {
  ship = e.target;
  ship.style.zIndex = 10;
  window.addEventListener('pointermove', drag);
  window.addEventListener('pointerup', drop);
  document.body.addEventListener('pointerleave', drop);
}

export default grab;
