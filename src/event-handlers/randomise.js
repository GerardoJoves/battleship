import events from '../utilities/events';

export default function randomise() {
  events.emit('randomise', null);
}
