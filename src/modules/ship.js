export default class Ship {
  constructor(length) {
    this.length = length;
    this.hitsNum = 0;
    this.sunk = false;
  }

  hit() {
    this.hitsNum += 1;
    this.#isSunk();
  }

  #isSunk() {
    if (this.hitsNum >= this.length) {
      this.sunk = true;
    }
  }
}
