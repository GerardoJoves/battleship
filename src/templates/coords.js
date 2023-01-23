import { html } from 'lit-html';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function coordsLetters() {
  return html`<div class="letter-coords">
    ${letters.map((l) => html`<div class="coord">${l}</div>`)}
  </div>`;
}

function coordsNums() {
  return html`<div class="number-coords">
    ${nums.map((n) => html`<div class="coord">${n}</div>`)}
  </div>`;
}

export { coordsLetters, coordsNums };
