import { Bit } from '../base/bit';
import { apply, buildArray, map, lift2, liftN } from '../utils';

export class Signal {
  public width: number;
  public max: number;
  constructor(public bits: Bit[]) {
    this.width = bits.length;
    this.max = (1 << this.width) - 1;
  }
  static createWithWidth(width: number) {
    return new Signal(buildArray(width, () => new Bit()));
  }
  static createWithValueAndWidth(value: number, width: number) {
    const newSignal = Signal.createWithWidth(width);
    newSignal.value = value;
    return newSignal;
  }
  static createWithBitAndWidth(bit: Bit, width: number) {
    return new Signal(buildArray(width, () => bit));
  }

  set value(value: number) {
    if(value > this.max)
      throw new Error(`value overflow: ${value} is greater than ${this.max}`);
    let i = this.width;
    while(i--) {
      this.bits[i].value = value & 1;
      value >>= 1;
    }
  }
  get value(): number {
    let res = 0;
    for(let i = 0; i < this.width; i++) {
      res = (res << 1) + this.bits[i].value;
    }
    return res;
  }

  static lift1(fn: (a: Bit) => Bit): (a: Signal) => Signal {
    return a => new Signal(map(fn)(a.bits));
  }

  static lift2(fn: (a: Bit) => (b: Bit) => Bit): (a: Signal) => (b: Signal) => Signal {
    return a => {
      const f = lift2(fn)(a.bits)
      return b => new Signal(f(b.bits))
    }
    return a => b => new Signal(apply(a.bits.map(fn))(b.bits))
  }

  static liftN(fn: (bits: Bit[]) => Bit): (signals: Signal[]) => Signal {
    return signals => new Signal(liftN(fn)(signals.map(signal => signal.bits)))
  }
}
