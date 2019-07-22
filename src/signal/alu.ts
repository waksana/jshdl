import { Signal } from './signal';
import { Bit } from '../base/bit';
import { and, or } from './gate';
import * as bitExtendGate from '../bit/extendGate';
import { decoder } from '../bit/decoder';
import { multiplexor } from '../bit/multiplexor';
import { foldAnd } from '../bit/extendGate';

export const alu = (op: Signal) => (a: Signal) => (b: Signal): [Signal, Bit, Bit, Bit] => {
  const selector = op.bits.slice(0, 2);
  const bnegate = op.bits[3];
  const aInverse = Signal.lift1(bitExtendGate.xor(op.bits[2]));
  const bInverse = Signal.lift1(bitExtendGate.xor(bnegate));

  const av = aInverse(a);
  const bv = bInverse(b);

  const picker = Signal.liftN(multiplexor(decoder(selector)))

  const adderResult = bitExtendGate.liftAdder(av.bits)(bv.bits)(bnegate);

  const sum = new Signal(adderResult.sums);

  const lt = Signal.createWithBitAndWidth(new Bit(), a.width);

  lt.bits[lt.width - 1] = sum.bits[0];

  const result = picker([lt, and(av)(bv), or(av)(bv), sum]);

  return [result, adderResult.carryOut, adderResult.overflow, foldAnd(result.bits)];
}
