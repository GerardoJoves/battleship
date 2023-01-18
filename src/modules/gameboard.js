import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.grid = Gameboard.#getGrid();
    this.ships = [];
  }

  placeShip({ cell, direction, length }) {
    const shipNum = this.ships.length;
    this.ships.push(new Ship(length));
    if (direction === 'vertical') {
      for (let i = cell; i < cell + length * 10; i += 10) {
        this.grid[i] = shipNum;
      }
    } else if (direction === 'horizontal') {
      for (let i = cell; i < cell + length; i++) {
        this.grid[i] = shipNum;
      }
    }
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
