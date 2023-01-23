import { render } from 'lit-html';
import { DOMPlayerBoard, DOMEnemyBoard } from '../templates/dom-gameboard';
import events from '../utilities/events';
import Player from './player';
import ComputerPlayer from './computer-player';
import Gameboard from './gameboard';

const gameBoardContainerOne = document.querySelector('.player.gameboard-container');
const gameBoardContainerTwo = document.querySelector('.enemy.gameboard-container');

export default class Game {
  constructor() {
    this.player = new Player('player one', new Gameboard());
    this.computerPlayer = new ComputerPlayer('player two', new Gameboard());
    this.gameOver = false;
    this.player.gameboard.placeShip({
      cell: 43,
      direction: 'vertical',
      length: 4,
    });
    this.player.gameboard.placeShip({
      cell: 16,
      direction: 'horizontal',
      length: 4,
    });
    this.computerPlayer.gameboard.placeShip({
      cell: 43,
      direction: 'vertical',
      length: 4,
    });
    this.computerPlayer.gameboard.placeShip({
      cell: 16,
      direction: 'horizontal',
      length: 4,
    });
  }

  playRound(selectedCell) {
    if (this.gameOver) return;
    if (!this.isValidMove(selectedCell)) return;
    this.attackComputerPlayer(selectedCell);
    if (this.computerPlayer.gameboard.areAllShipsDestroyed()) {
      events.emit('there is a winner', this.player.id);
      this.gameOver = true;
    } else {
      this.attackPlayer();
      if (this.player.gameboard.areAllShipsDestroyed()) {
        events.emit('there is a winner', this.computerPlayer.id);
        this.gameOver = true;
      }
    }
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

  changePlayerShipPosition(prevCell, newCell) {
    this.player.gameboard.changeShipPosition(prevCell, newCell);
    this.render();
  }

  rotatePlayerShip(cell) {
    this.player.gameboard.rotateShipAtCell(cell);
    this.render();
  }

  render() {
    const boardOne = DOMPlayerBoard(this.player.gameboard.grid, this.player.gameboard.ships);
    const boardTwo = DOMEnemyBoard(
      this.computerPlayer.gameboard.grid,
      this.computerPlayer.gameboard.ships,
    );
    render(boardOne, gameBoardContainerOne);
    render(boardTwo, gameBoardContainerTwo);
  }
}
