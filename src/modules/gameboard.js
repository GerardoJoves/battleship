import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.grid = Array(100).fill(null);
    this.ships = [];
  }

  fillAdjacentCells(start, length, direction, value) {
    if (direction === 'vertical') {
      for (let i = start; i < start + length * 10; i += 10) {
        this.grid[i] = value;
      }
    } else if (direction === 'horizontal') {
      for (let i = start; i < start + length; i++) {
        this.grid[i] = value;
      }
    }
  }

  placeShip({ cell, direction, length }) {
    const shipIndex = this.ships.length;
    this.ships.push({
      ship: new Ship(length),
      position: { cell, direction, length },
    });
    this.fillAdjacentCells(cell, length, direction, shipIndex);
  }

  removeShip(shipIndex) {
    if (!this.ships[shipIndex]) return;
    const [{ position }] = this.ships.splice(shipIndex, 1);
    const { cell, length, direction } = position;
    this.fillAdjacentCells(cell, length, direction, null);
  }

  changeShipPosition(shipIndex, newPosition) {
    this.removeShip(shipIndex);
    this.placeShip(newPosition);
  }

  receiveAttack(cell) {
    const cellContent = this.grid[cell];
    // a cell with a number indicates the index of the ship placed on that cell
    if (typeof cellContent === 'number') {
      const { ship } = this.ships[cellContent];
      ship.hit();
      // a shit got hit in this cell
      this.grid[cell] = 'x';
    } else if (cellContent === null) {
      // there's nothing on this cell. It's a missed shot
      this.grid[cell] = '.';
    }
  }

  isPlayableCell(cell) {
    // a string represets an already played cell
    return typeof this.grid[cell] !== 'string';
  }

  areAllShipsDestroyed() {
    return this.ships.every(({ ship }) => ship.isSunk());
  }
}
