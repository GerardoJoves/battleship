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
    this.computerPlay();
  }

  computerPlay() {
    setTimeout(() => {
      if (this.turn !== this.playerTwo) return;
      const nextMove = this.playerTwo.nextMove();
      const attackResult = this.play(nextMove);
      if (attackResult.hitShip) {
        this.playerTwo.hitsEnemyShip(nextMove);
      }
      if (this.turn === this.playerTwo) {
        this.computerPlay();
      }
    }, 200);
  }
}
