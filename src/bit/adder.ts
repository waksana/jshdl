import { Bit } from '../base/bit';
import { and, or} from '../base/gate';
import { xor } from './extendGate';

const half = (a: Bit, b: Bit): [Bit, Bit] => [xor(a)(b), and(a)(b)]

export const fullAdder = (a: Bit, b: Bit, carryIn: Bit) => {
  const [sum1, carryOut1] = half(a, b);
  const [sum2, carryOut2] = half(sum1, carryIn);
  return [sum2, or(carryOut1)(carryOut2)];
}
