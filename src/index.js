import './styles/styles.css';
import events from './utilities/events';
import GameAgainstComputer from './modules/game-against-computer';
import activateModal from './templates/modal';

let game = null;

function setupNewGame() {
  game = new GameAgainstComputer();
  game.randomise(game.playerOne);
  game.randomise(game.playerTwo);
}

window.addEventListener('load', setupNewGame);

events.on('setup new game', () => {
  setupNewGame();
});

events.on('attack enemy board', (cell) => {
  game.playRound(cell);
});

events.on('change ship position', ({ prevCell, newCell }) => {
  game.changePlayerShipPosition(game.playerOne, prevCell, newCell);
});

events.on('rotate ship at cell', (cell) => {
  game.rotatePlayerShip(game.playerOne, cell);
});

events.on('start game', () => {
  game.startBattle();
});

events.on('randomise', () => {
  game.randomise(game.playerOne);
});

events.on('hit player ship', (slot) => {
  game.playerTwo.hitsEnemyShip(slot);
});

events.on('winner', (player) => {
  const modalMsg = `Game Over. ${player.id} wins`;
  activateModal(modalMsg);
});
