import ComputerPlayer from '../src/modules/computer-player';
import GameBoard from '../src/modules/gameboard';

describe('computer player', () => {
  test('capable of making random plays', () => {
    const computerPlayer = new ComputerPlayer('player 1', []);
    const enemyBoard = new GameBoard();
    const expectation = [
      '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',
      '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',
      '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',
      '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',
      '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',
      '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',
      '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',
      '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',
      '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',
      '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',
    ];
    for (let i = 0; i < 100; i++) {
      enemyBoard.receiveAttack(computerPlayer.randomAttack());
    }
    expect(enemyBoard.grid).toStrictEqual(expectation);
    expect(computerPlayer.randomAttack()).toBeNull();
  });
});
