import ComputerPlayer from '../modules/computer-player';
import GameBoard from '../modules/gameboard';

describe('computer player', () => {
  test('capable of making random plays', () => {
    const computerPlayer = new ComputerPlayer('player 1', []);
    const enemyBoard = new GameBoard();
    const expectation = [
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ];
    for (let i = 0; i < 100; i++) {
      const coords = computerPlayer.randomAttack();
      enemyBoard.receiveAttack(...coords);
    }
    expect(enemyBoard.grid).toStrictEqual(expectation);
    expect(computerPlayer.randomAttack()).toBeNull();
  });
});
