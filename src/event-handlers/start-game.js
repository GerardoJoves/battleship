import events from '../utilities/events';

export default function startGame() {
  events.emit('start game', null);
}
