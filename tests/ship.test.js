import Ship from '../src/modules/ship';

describe('Ship instance', () => {
  test('sinks if num of hits equals length', () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  });
});
