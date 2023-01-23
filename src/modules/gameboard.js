import events from '../utilities/events';
import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.grid = Array(100).fill(null);
    // ships' indices must start from 1 because negative numbers are used to indicate a hit ship
    this.ships = [null];
  }

  static* getCellsIndeces(start, direction, length) {
    const end = direction === 'vertical' ? length * 10 + (start - 10) : start + length - 1;
    if (direction === 'vertical') {
      for (let i = start; i <= end; i += 10) {
        yield i;
      }
    } else if (direction === 'horizontal') {
      for (let i = start; i <= end; i++) {
        yield i;
      }
    }
  }

  fillAdjacentCells(start, length, direction, value) {
    // eslint-disable-next-line
    for (const i of Gameboard.getCellsIndeces(start, direction, length)) {
      this.grid[i] = value;
    }
  }

  isValidPosition(start, length, direction, curShip) {
    if (direction === 'horizontal' && (start % 10) + length > 10) return false;
    if (direction === 'vertical' && length * 10 + (start - 10) > 99) return false;
    // eslint-disable-next-line
    for (const i of Gameboard.getCellsIndeces(start, direction, length)) {
      if (i > 99 || i < 0) return false;
      if (typeof this.grid[i] === 'number' && this.grid[i] !== curShip) return false;
    }
    return true;
  }

  placeShip({ cell, direction, length }) {
    const shipIndex = this.ships.length;
    this.ships.push({
      ship: new Ship(length),
      position: { cell, direction, length },
    });
    this.fillAdjacentCells(cell, length, direction, shipIndex);
  }

  updateGrid() {
    this.ships.forEach((ship, i) => {
      if (ship === null) return;
      const { cell, direction, length } = ship.position;
      this.fillAdjacentCells(cell, length, direction, i);
    });
  }

  removeShip(shipIndex) {
    if (!this.ships[shipIndex]) return;
    const [{ position }] = this.ships.splice(shipIndex, 1);
    const { cell, length, direction } = position;
    this.fillAdjacentCells(cell, length, direction, null);
    this.updateGrid();
  }

  changeShipPosition(prevCell, newCell) {
    if (prevCell === newCell) return;
    const shipIndex = this.grid[prevCell];
    const { position: { direction, length } } = this.ships[shipIndex];
    if (!this.isValidPosition(newCell, length, direction, shipIndex)) return;
    this.removeShip(shipIndex);
    this.placeShip({ cell: newCell, direction, length });
  }

  rotateShipAtCell(cellNum) {
    const cellContent = this.grid[cellNum];
    if (typeof cellContent !== 'number') return;
    const { position: { length, direction, cell } } = this.ships[cellContent];
    const newDirection = direction === 'horizontal' ? 'vertical' : 'horizontal';
    if (!this.isValidPosition(cell, length, newDirection, cellContent)) {
      events.emit('rotation invalid', null);
      return;
    }
    this.removeShip(cellContent);
    this.placeShip({ cell, direction: newDirection, length });
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
