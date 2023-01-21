export default function isValidCell(cell) {
  return (Number.isInteger(cell) && cell < 100 && cell >= 0);
}
