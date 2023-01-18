import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.grid = Gameboard.#getGrid();
    this.ships = [];
    this.shipsPositions = [];
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
    this.ships.push(new Ship(length));
    this.shipsPositions.push({ cell, direction, length });
    this.fillAdjacentCells(cell, length, direction, shipIndex);
  }

  removeShip(shipIndex) {
    const [ship] = this.ships.splice(shipIndex, 1);
    const [{ cell, direction, length }] = this.shipsPositions.splice(shipIndex, 1);
    this.fillAdjacentCells(cell, length, direction, null);
    return ship;
  }

  changeShipPosition(shipIndex, newPosition) {
    this.removeShip(shipIndex);
    this.placeShip(newPosition);
  }

  receiveAttack(cell) {
    const cellContent = this.grid[cell];
    /* A number represents a cell occupied by a ship. An 'x' represents a ship
    that's been hit. And a dot ('.') represents a missed shot */
    if (typeof cellContent === 'number') {
      const ship = this.ships[cellContent];
      ship.hit();
      this.grid[cell] = 'x';
    } else if (cellContent === null) {
      this.grid[cell] = '.';
    }
  }

  isPlayableCell(cell) {
    return typeof this.grid[cell] !== 'string';
  }

  areAllShipsDestroyed() {
    return this.ships.every((ship) => ship.isSunk());
  }

  static #getGrid() {
    const grid = [];
    for (let i = 0; i < 100; i++) {
      grid.push(null);
    }
    return grid;
  }
}
