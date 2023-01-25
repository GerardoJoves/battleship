import Gameboard from './gameboard';
import Game from './game';
import Player from './player';
import ComputerPlayer from './computer-player';

export default class GameAgainstComputer extends Game {
  constructor() {
    super(
      new Player('Player one', new Gameboard()),
      new ComputerPlayer('Computer Player', new Gameboard()),
    );
  }

  playRound(cell) {
    this.play(cell);
    while (this.turn === this.playerTwo) {
      this.computerPlay();
    }
  }

  computerPlay() {
    const nextMove = this.playerTwo.nextMove();
    this.play(nextMove);
  }
}
