import { Bit } from '../base/bit';
import { or, not } from '../base/gate';

export const latches = (r: Bit) => (s: Bit): [Bit, Bit] => {
  const q = new Bit();
  const nq = not(or(q)(s))
  not(or(nq)(r)).connect(q);
  return [q, nq];
}
