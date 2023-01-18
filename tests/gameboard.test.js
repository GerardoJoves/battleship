import Gameboard from '../src/modules/gameboard';

describe('Gameboard instance', () => {
  test('places ships in specified position', () => {
    const gameboard = new Gameboard();
    const expectation = [
      null, null, 3, null, null, null, null, null, null, null,
      null, null, 3, null, null, null, 2, 2, 2, 2,
      null, null, null, null, null, null, null, null, null, null,
      4, 4, 4, 4, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, 0, null,
      null, null, null, 5, 5, 5, 5, null, 0, null,
      1, null, null, null, null, null, null, null, 0, null,
      1, null, null, null, null, null, null, null, 0, null,
      1, null, null, null, null, null, null, null, 0, null,
      1, null, null, null, null, null, null, null, null, null,
    ];
    gameboard.placeShip({
      cell: 48,
      direction: 'vertical',
      length: 5,
    });
    gameboard.placeShip({
      cell: 60,
      direction: 'vertical',
      length: 4,
    });
    gameboard.placeShip({
      cell: 16,
      direction: 'horizontal',
      length: 4,
    });
    gameboard.placeShip({
      cell: 2,
      direction: 'vertical',
      length: 2,
    });
    gameboard.placeShip({
      cell: 30,
      direction: 'horizontal',
      length: 4,
    });
    gameboard.placeShip({
      cell: 53,
      direction: 'horizontal',
      length: 4,
    });

    expect(gameboard.grid).toStrictEqual(expectation);
  });

  test('hits ships or records missed shots', () => {
    const gameboard = new Gameboard();
    const expectation = [
      null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null,
      null, null, null, 0, 0, 'x', 0, 0, null, null,
      null, null, null, null, null, null, null, null, null, null,
      null, '.', null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null,
    ];
    gameboard.placeShip({
      cell: 33,
      direction: 'horizontal',
      length: 5,
    });
    gameboard.receiveAttack(35);
    gameboard.receiveAttack(51);
    expect(gameboard.grid).toStrictEqual(expectation);
  });

  test('reports all ships have been sunk', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip({
      cell: 33,
      direction: 'horizontal',
      length: 3,
    });
    gameboard.receiveAttack(33);
    gameboard.receiveAttack(34);
    expect(gameboard.areAllShipsDestroyed()).toBeFalsy();
    gameboard.receiveAttack(35);
    expect(gameboard.areAllShipsDestroyed()).toBeTruthy();
  });
});
