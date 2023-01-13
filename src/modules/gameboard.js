import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.grid = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ];
    this.ships = [];
    this.sunkShips = 0;
    this.allShipsSunk = false;
  }

  placeShip({
    row,
    col,
    direction,
    length,
  }) {
    const shipIndex = this.ships.length;
    if (direction === 'vertical') {
      for (let i = row; i < row + length; i++) {
        this.grid[i][col] = shipIndex;
      }
    } else if (direction === 'horizontal') {
      for (let i = col; i < col + length; i++) {
        this.grid[row][i] = shipIndex;
      }
    }
    this.ships.push(new Ship(length));
  }

  receiveAttack(row, col) {
    const cellContent = this.grid[row][col];

    /* A number represents a cell occupied by a ship.
      An 'x' represents a cell occupied by a ship that's been hit.
      And a dot ('.') represents a missed shot */
    if (typeof cellContent === 'number') {
      const ship = this.ships[cellContent];
      ship.hit();
      if (ship.sunk) this.sunkShips += 1;
      this.grid[row][col] = 'x';
      this.#shipGotHit();
    } else if (cellContent === null) {
      this.grid[row][col] = '.';
    }
  }

  #shipGotHit() {
    if (this.sunkShips === this.ships.length) {
      this.allShipsSunk = true;
    }
  }
}
