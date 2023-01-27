function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getUnorderListOfSlots(numOfSlots) {
  const slots = [];
  for (let i = 0; i < numOfSlots; i++) {
    slots.push(i);
  }
  return shuffle(slots);
}

function getAdjecentSlots(slot) {
  const adjacentSlots = [];
  if (slot > 9) adjacentSlots.push(slot - 10);
  if (slot < 90) adjacentSlots.push(slot + 10);
  if (slot % 10 < 9) adjacentSlots.push(slot + 1);
  if (slot % 10 > 0) adjacentSlots.push(slot - 1);
  return adjacentSlots;
}

export default class Moves {
  constructor() {
    this.slots = getUnorderListOfSlots(100);
    this.target = null;
  }

  next() {
    if (this.target) return this.attackTarget();
    return this.randomMove();
  }

  randomMove() {
    return this.slots.pop();
  }

  attackTarget() {
    const { hitsRecord } = this.target;

    if (hitsRecord.length === 1) {
      // target has received just one shot, thus its direction is unknown
      const slot = hitsRecord[0];
      const adjacentSlots = getAdjecentSlots(slot);
      const moveIndex = this.slots.findIndex((s) => adjacentSlots.includes(s));
      if (moveIndex === -1) {
        this.clearTarget();
        return this.randomMove();
      }
      const move = this.slots.splice(moveIndex, 1)[0];
      return move;
    }

    // target has received more than one shot, thus its direciton can be deduce
    if (Math.abs(hitsRecord[0] - hitsRecord[1]) === 1) {
      // target's direction is horizontal
      const rightMostSlot = hitsRecord[hitsRecord.length - 1];
      const leftMostSlot = hitsRecord[0];
      if (rightMostSlot % 10 !== 9 && this.slots.includes(rightMostSlot + 1)) {
        const slot = rightMostSlot + 1;
        this.removeFromAvailableSlots(slot);
        return slot;
      }
      if (leftMostSlot % 10 !== 0 && this.slots.includes(leftMostSlot - 1)) {
        const slot = leftMostSlot - 1;
        this.removeFromAvailableSlots(slot);
        return slot;
      }
    }

    // target's direction must be vertical
    const topMostSlot = hitsRecord[0];
    const bottomMostSlot = hitsRecord[hitsRecord.length - 1];
    if (topMostSlot > 9 && this.slots.includes(topMostSlot - 10)) {
      const slot = topMostSlot - 10;
      this.removeFromAvailableSlots(slot);
      return slot;
    }
    if (bottomMostSlot < 90 && this.slots.includes(bottomMostSlot + 10)) {
      const slot = bottomMostSlot + 10;
      this.removeFromAvailableSlots(slot);
      return slot;
    }

    this.clearTarget();
    return this.randomMove();
  }

  removeFromAvailableSlots(slot) {
    const index = this.slots.findIndex((s) => s === slot);
    return this.slots.splice(index, 1)[0];
  }

  successfulShot(slot) {
    if (!this.target) {
      this.setTarget(slot);
      return;
    }
    this.target.hitsRecord.push(slot);
    this.target.hitsRecord.sort((a, b) => a - b);
  }

  setTarget(slot) {
    this.target = {
      hitsRecord: [slot],
    };
  }

  clearTarget() {
    this.target = null;
  }
}
