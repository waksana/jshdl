import { Bit } from '../base/bit';
import { and, or, not } from '../base/gate';
import { fold, lift2, map } from '../utils'

export const foldAnd = fold(and);

export const foldOr = fold(or);

export const liftAnd = lift2(and);

export const liftOr = lift2(or);

export const liftNot = map(not);

export const foldLiftAnd = fold(liftAnd);

export const foldLiftOr = fold(liftOr);

export const xor = (a: Bit) => (b: Bit): Bit => and(or(a)(b))(not(and(a)(b)))

//xor

export const foldXor = fold(xor);

export const liftXor = lift2(xor);

export const foldLiftXor = fold(liftXor);
