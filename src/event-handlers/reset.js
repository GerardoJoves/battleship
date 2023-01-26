import events from '../utilities/events';

export default function reset() {
  events.emit('reset', null);
}
