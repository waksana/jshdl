import { Bit } from './bit';

const watch = (bits: Bit[], handler: () => void) => {
  handler();
  bits.forEach(bit => bit.watcher.add(handler));
}

export const and = (a: Bit) => (b: Bit): Bit => {
  const c = new Bit();
  watch([a, b], () => {
    c.value = a.value & b.value;
  });
  return c;
}

export const or = (a: Bit) => (b: Bit): Bit => {
  const c = new Bit();
  watch([a, b], () => {
    c.value = a.value | b.value;
  });
  return c;
}

export const not = (a: Bit): Bit => {
  const b = new Bit();
  watch([a, b], () => {
    b.value = 1 - a.value;
  });
  return b;
}
