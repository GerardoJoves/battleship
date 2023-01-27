import events from '../utilities/events';
import Ship from './ship';

const SHIPS_PER_PLAYER = [
  { length: 4 },
  { length: 4 },
  { length: 3 },
  { length: 3 },
  { length: 3 },
  { length: 2 },
  { length: 2 },
  { length: 2 },
  { length: 1 },
];

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

  isValidPosition(start, length, direction, curShip = null) {
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
    if (Number.isInteger(cellContent)) {
      // hit ship
      const { ship } = this.ships[cellContent];
      ship.hit();
      this.grid[cell] = Math.abs(cellContent) * -1;
      const shipSunk = ship.isSunk();
      return { hitShip: true, shipSunk };
    }
    if (cellContent === null) {
      // missed-shot
      this.grid[cell] = '.';
      return { hitShip: false };
    }
    return { hitShip: false };
  }

  reset() {
    this.grid = Array(100).fill(null);
    this.ships = [null];
  }

  isPlayableCell(cell) {
    return this.grid[cell] === null || this.grid[cell] > 0;
  }

  isCellEmpty(cell) {
    return this.grid[cell] === null;
  }

  areAllShipsDestroyed() {
    return this.ships.slice(1).every(({ ship }) => ship.isSunk());
  }

  isThereAShipCloseTo(cell) {
    const surroudingCells = [
      cell + 1,
      cell - 1,
      cell + 10,
      cell - 10,
    ];
    return surroudingCells.some((c) => typeof this.grid[c] === 'number');
  }

  getRandomPosition(length) {
    let cell;
    let direction;
    do {
      do {
        cell = Math.floor(Math.random() * 100);
      } while (!this.isCellEmpty(cell) || this.isThereAShipCloseTo(cell));
      direction = Math.random() > 0.4 ? 'horizontal' : 'vertical';
      if (!this.isValidPosition(cell, length, direction)) {
        direction = direction === 'horizontal' ? 'vertical' : 'horizontal';
      }
    } while (!this.isValidPosition(cell, length, direction));
    return { cell, length, direction };
  }

  placeShipsRandomly() {
    SHIPS_PER_PLAYER.forEach((ship) => {
      const position = this.getRandomPosition(ship.length);
      this.placeShip(position);
    });
  }
}
