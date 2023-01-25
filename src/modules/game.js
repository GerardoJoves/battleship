import { render } from 'lit-html';
import enemyGameboard from '../templates/enemy-gameboard';
import playerGameboard from '../templates/player-gameboard';
import events from '../utilities/events';
import isValidCell from '../utilities/isValidCell';

const gameBoardContainerOne = document.querySelector('#left-container');
const gameBoardContainerTwo = document.querySelector('#right-container');

function reportWinner(player) {
  events.emit('winner', player);
}

function isLoser(player) {
  return player.gameboard.areAllShipsDestroyed();
}

function attack(player, cell) {
  return player.gameboard.receiveAttack(cell);
}

export default class Game {
  constructor(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.gameOver = false;
    this.arrangingShips = true;
    this.turn = playerOne;
    this.render();
  }

  randomise(player) {
    player.gameboard.placeShipsRandomly();
    this.render();
  }

  startBattle() {
    this.arrangingShips = false;
    this.render();
  }

  endGame() {
    this.gameOver = true;
  }

  changeTurn() {
    this.turn = this.turn === this.playerOne ? this.playerTwo : this.playerOne;
  }

  play(cell) {
    if (!isValidCell(cell)) return;
    const target = this.turn === this.playerOne ? this.playerTwo : this.playerOne;
    if (!target.gameboard.isPlayableCell(cell)) return;
    const attackResult = attack(target, cell);
    if (!attackResult.hitShip) this.changeTurn();
    if (isLoser(target)) {
      reportWinner(this.turn);
      this.endGame();
    }
    this.render();
  }

  isValidMove(cell) {
    return (Number.isInteger(cell)
    && cell < 100 && cell >= 0
    && this.playerTwo.gameboard.isPlayableCell(cell));
  }

  changePlayerShipPosition(prevCell, newCell) {
    this.playerOne.gameboard.changeShipPosition(prevCell, newCell);
    this.render();
  }

  rotatePlayerShip(cell) {
    this.playerOne.gameboard.rotateShipAtCell(cell);
    this.render();
  }

  render() {
    const boardOne = playerGameboard(
      this.playerOne.gameboard.grid,
      this.playerOne.gameboard.ships,
      this.arrangingShips,
    );
    const boardTwo = enemyGameboard(
      this.playerTwo.gameboard.grid,
      this.playerTwo.gameboard.ships,
      this.arrangingShips,
    );
    render(boardOne, gameBoardContainerOne);
    render(boardTwo, gameBoardContainerTwo);
  }
}
