import Ship from '../modules/ship';

describe('Ship instance', () => {
  test('sinks if num of hits equals length', () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.sunk).toBeTruthy();
  });
});
