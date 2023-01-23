import { html } from 'lit-html';
import grab from '../event-handlers/drag-and-drop';
import { startRotation, endRotation } from '../event-handlers/rotate-ship';

export default function draggableShip({ length, direction }) {
  return html`<div
  @pointerdown=${(e) => {
    grab(e);
    startRotation(e);
  }}
  @pointerup=${endRotation}
  class="ship ${direction}"
  style="${direction === 'horizontal' ? 'width' : 'height'}: calc(${length * 100}% - 3px);
  top: 1px; left: 1px;"
  ></div>`;
}
