import './styles/styles.css';
import events from './utilities/events';
import GameAgainstComputer from './modules/game-against-computer';

let game = null;

function setupNewGame() {
  game = new GameAgainstComputer();
  game.randomise(game.playerOne);
  game.randomise(game.playerTwo);
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
  game.startBattle();
});

events.on('randomise', () => {
  game.randomise(game.playerOne);
});
