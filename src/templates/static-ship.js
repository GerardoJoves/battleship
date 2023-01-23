import { html } from 'lit-html';

export default function staticShip({ length, direction }) {
  return html`<div
  class="ship ${direction}"
  style="${direction === 'horizontal' ? 'width' : 'height'}: calc(${length * 100}% - 1.5px);
  top: 0px; left: 0px;"
  ></div>`;
}
