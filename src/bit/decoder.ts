import { Bit } from '../base/bit';
import { buildArray } from '../utils';
import { pattern } from './pattern';

export const decoder = (bits: Bit[]): Bit[] => {
  const length = 1 << bits.length
  return buildArray(length, i => {
    return pattern(length - 1 - i)(bits);
  });
}
