import { html } from 'lit-html';

export default function staticShip({ length, direction }) {
  return html`<div
  class="ship ${direction}"
  style="${direction === 'horizontal' ? 'width' : 'height'}: calc(${length * 100}% - 3px);
  top: 1px; left: 1px;"
  ></div>`;
}
