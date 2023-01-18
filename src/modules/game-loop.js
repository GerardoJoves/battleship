import { render } from 'lit-html';
import { DOMBoard, DOMEnemyBoard } from '../templates/dom-gameboard';
import Player from './player';
import ComputerPlayer from './computer-player';
import Gameboard from './gameboard';

const gameBoardContainerOne = document.querySelector('.player.gameboard-container');
const gameBoardContainerTwo = document.querySelector('.enemy.gameboard-container');

export default class Game {
  constructor() {
    this.player = new Player('player one', new Gameboard());
    this.computerPlayer = new ComputerPlayer('player two', new Gameboard());
    this.player.gameboard.placeShip({
      cell: 40,
      direction: 'horizontal',
      length: 4,
    });
    this.computerPlayer.gameboard.placeShip({
      cell: 40,
      direction: 'horizontal',
      length: 4,
    });
  }

  playRound(selectedCell) {
    if (!this.isValidMove(selectedCell)) return;
    this.attackComputerPlayer(selectedCell);
    this.attackPlayer();
    this.render();
  }

  attackPlayer() {
    const cell = this.computerPlayer.randomAttack();
    if (typeof cell === 'number') this.player.gameboard.receiveAttack(cell);
  }

  attackComputerPlayer(cell) {
    this.computerPlayer.gameboard.receiveAttack(cell);
  }

  isValidMove(cell) {
    return (Number.isInteger(cell)
    && cell < 100 && cell >= 0
    && this.computerPlayer.gameboard.isPlayableCell(cell));
  }

  render() {
    const boardOne = DOMBoard(this.player.gameboard.grid);
    const boardTwo = DOMEnemyBoard(this.computerPlayer.gameboard.grid);
    render(boardOne, gameBoardContainerOne);
    render(boardTwo, gameBoardContainerTwo);
  }
}
