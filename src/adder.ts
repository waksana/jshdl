import {Wire} from './wire';
import { and, or, xor } from './gate';
import { zip } from './utils';

const halfAdder = (a: Wire, b: Wire): [Wire, Wire] => [xor(a, b), and(a, b)]

export const fullAdder = (a: Wire, b: Wire, carryIn: Wire) => {
  const [halfSum, halfCarryOut] = halfAdder(a, b);
  const [sum, carryOut2] = halfAdder(halfSum, carryIn);
  return [sum, or(carryOut2, halfCarryOut)];
}

export const adder = (a: Wire[], b: Wire[], carryIn: Wire): [Wire[], Wire] => {
  const c = zip(a, b, (wa, wb) => [wa, wb]).reverse().map(([wa, wb]) => {
    const [sum, carryOut] = fullAdder(wa, wb, carryIn);
    carryIn = carryOut;
    return sum;
  }).reverse();
  return [c, carryIn];
}
