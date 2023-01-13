import Gameboard from '../modules/gameboard';

describe('Gameboard instance', () => {
  test('places ships in specified position', () => {
    const gameboard = new Gameboard();
    const expectation = [
      [null, null, 3, null, null, null, null, null, null, null],
      [null, null, 3, null, null, null, 2, 2, 2, 2],
      [null, null, null, null, null, null, null, null, null, null],
      [4, 4, 4, 4, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, 0, null],
      [null, null, null, 5, 5, 5, 5, null, 0, null],
      [1, null, null, null, null, null, null, null, 0, null],
      [1, null, null, null, null, null, null, null, 0, null],
      [1, null, null, null, null, null, null, null, 0, null],
      [1, null, null, null, null, null, null, null, null, null],
    ];
    gameboard.placeShip({
      row: 4,
      col: 8,
      direction: 'vertical',
      length: 5,
    });
    gameboard.placeShip({
      row: 6,
      col: 0,
      direction: 'vertical',
      length: 4,
    });
    gameboard.placeShip({
      row: 1,
      col: 6,
      direction: 'horizontal',
      length: 4,
    });
    gameboard.placeShip({
      row: 0,
      col: 2,
      direction: 'vertical',
      length: 2,
    });
    gameboard.placeShip({
      row: 3,
      col: 0,
      direction: 'horizontal',
      length: 4,
    });
    gameboard.placeShip({
      row: 5,
      col: 3,
      direction: 'horizontal',
      length: 4,
    });

    expect(gameboard.grid).toStrictEqual(expectation);
  });

  test('hits ships or records missed shots', () => {
    const gameboard = new Gameboard();
    const expectation = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, 0, 0, 'x', 0, 0, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, '.', null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ];
    gameboard.placeShip({
      row: 3,
      col: 3,
      direction: 'horizontal',
      length: 5,
    });
    gameboard.receiveAttack(5, 1);
    gameboard.receiveAttack(3, 5);
    expect(gameboard.grid).toStrictEqual(expectation);
  });

  test('reports all ships have been sunk', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip({
      row: 3,
      col: 3,
      direction: 'horizontal',
      length: 2,
    });
    gameboard.receiveAttack(3, 3);
    gameboard.receiveAttack(3, 4);
    expect(gameboard.allShipsSunk).toBeTruthy();
  });
});
