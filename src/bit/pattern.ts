import { Bit } from '../base/bit';
import { not } from '../base/gate';
import { foldAnd } from './extendGate';

export const pattern = (pattern: number) => (bits: Bit[]): Bit => {
  let p = pattern;
  return foldAnd(bits.reverse().map(bit => {
    let res;
    if((p & 1) === 1)
      res = bit;
    else
      res = not(bit);
    p >>= 1;
    return res;
  }));
}
