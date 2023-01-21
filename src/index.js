import './styles/styles.css';
import Game from './modules/game-loop';
import events from './modules/events';

const game = new Game();
game.render();

events.on('attack enemy board', (cell) => {
  game.playRound(cell);
});

events.on('change ship position', ({ prevCell, newCell }) => {
  game.changePlayerShipPosition(prevCell, newCell);
});
