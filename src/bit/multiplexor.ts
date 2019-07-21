import {Bit} from '../base/bit';
import {liftAnd, foldOr} from './extendGate';

export const multiplexor = (control: Bit[]) => (data: Bit[]): Bit => {
  return foldOr(liftAnd(control)(data))
}
