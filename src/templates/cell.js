import { html } from 'lit-html';

export default function gameboardCell(cellClass, cellNum, ship = '') {
  return html`<div
    class=${cellClass}
    data-cell-number=${cellNum}>${ship}</div>`;
}
