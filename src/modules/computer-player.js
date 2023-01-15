export default class ComputerPlayer {
  constructor(id, gameboard) {
    /* the unorder array allows ComputerPlayer to make random attacks
      and don't repeat previous attacks */
    this.attacks = ComputerPlayer.#getUnorderListOfCells();
    this.id = id;
    this.gameboard = gameboard;
  }

  randomAttack() {
    if (this.attacks.length === 0) return null;
    return this.attacks.pop();
  }

  static #getUnorderListOfCells() {
    const cells = [];
    for (let i = 0; i < 100; i++) {
      cells.push(i);
    }
    cells.sort(() => Math.random() - 0.5);
    return cells;
  }
}
