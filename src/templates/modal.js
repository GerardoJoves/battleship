import { html, render } from 'lit-html';
import events from '../utilities/events';

const modal = document.querySelector('#modal');

function startNewGame() {
  modal.classList.remove('active');
  events.emit('setup new game', null);
}

function modalConstent(msg) {
  return html`<div class="modal-content">
    <div class="msg">${msg}</div>
    <button
    @click=${startNewGame}
    class="new-game">New Game</button>
  </div>`;
}

export default function activateModal(msg) {
  modal.classList.add('active');
  render(modalConstent(msg), modal);
}
