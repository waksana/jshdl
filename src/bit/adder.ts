import { Bit } from '../base/bit';
import { and, or} from '../base/gate';
import { xor } from './extendGate';

const half = (a: Bit, b: Bit): [Bit, Bit] => [xor(a)(b), and(a)(b)]

export class AdderMonad {
  private _overflow?: Bit
  constructor(public sums: Bit[], public carryOut: Bit, public lastCarryOut?: Bit) {}
  bind(fn: (carryIn: Bit) => AdderMonad): AdderMonad {
    const result = fn(this.carryOut);
    return new AdderMonad(result.sums.concat(this.sums), result.carryOut, this.carryOut)
  }
  get overflow() {
    if(!this._overflow) {
      if(this.lastCarryOut)
        this._overflow = xor(this.carryOut)(this.lastCarryOut);
      else
        this._overflow = this.carryOut;
    }
    return this._overflow;
  }
}

export const adder = (a: Bit) => (b: Bit) => (carryIn: Bit): AdderMonad => {
  const [sum1, carryOut1] = half(a, b);
  const [sum2, carryOut2] = half(sum1, carryIn);
  return new AdderMonad([sum2], or(carryOut1)(carryOut2));
}
