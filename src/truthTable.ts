import { Wire } from './wire';
import { and, or, not} from './gate';
import {toBinary} from './utils';

export const truthTable = (trueList: number[]) => (wires: Wire[]): Wire => {
  const bitCount = wires.length;
  const inversed = [wires.map(wire => not(wire)), wires];
  return or(...trueList.map(trueCondition =>
    and(...toBinary(trueCondition, bitCount).map((v, i) => inversed[v][i]))));
}
