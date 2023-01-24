import './styles/styles.css';
import Game from './modules/game-loop';
import events from './utilities/events';

let game = null;

function setupNewGame() {
  game = new Game();
}

window.addEventListener('load', setupNewGame);

events.on('attack enemy board', (cell) => {
  game.playRound(cell);
});

events.on('change ship position', ({ prevCell, newCell }) => {
  game.changePlayerShipPosition(prevCell, newCell);
});

events.on('rotate ship at cell', (cell) => {
  game.rotatePlayerShip(cell);
});

events.on('start game', () => {
  game.startGame();
});
