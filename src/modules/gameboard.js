import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.grid = Array(100).fill(null);
    // ships' indices must start from 1 because negative numbers are used to indicate a hit ship
    this.ships = [null];
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
    if (Number.isInteger(cellContent)) {
      const { ship } = this.ships[cellContent];
      ship.hit();
      // a hit ship is represented by the index of the ship but negative
      this.grid[cell] = Math.abs(cellContent) * -1;
    } else if (cellContent === null) {
      // there's nothing on this cell. It's a missed shot
      this.grid[cell] = '.';
    }
  }

  isPlayableCell(cell) {
    return this.grid[cell] === null || this.grid[cell] > 0;
  }

  areAllShipsDestroyed() {
    return this.ships.slice(1).every(({ ship }) => ship.isSunk());
  }
}
