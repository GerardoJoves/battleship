export default class Ship {
  constructor(length) {
    this.length = length;
    this.receivedHits = 0;
  }

  hit() {
    if (this.isSunk()) return;
    this.receivedHits += 1;
  }

  isSunk() {
    return this.length === this.receivedHits;
  }
}
