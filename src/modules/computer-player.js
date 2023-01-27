import Moves from '../utilities/getNextMove';

export default class ComputerPlayer {
  constructor(id, gameboard) {
    /* the unorder array allows ComputerPlayer to make random attacks
      and don't repeat previous attacks */
    this.attacks = new Moves();
    this.id = id;
    this.gameboard = gameboard;
  }

  hitsEnemyShip(slot) {
    this.attacks.successfulShot(slot);
  }

  nextMove() {
    return this.attacks.next();
  }
}
