import { Signal } from './signal';
import * as bitGate from '../base/gate';
import * as extendBitGate from '../bit/extendGate';

export const and = Signal.lift2(bitGate.and);

export const or = Signal.lift2(bitGate.or);

export const not = Signal.lift1(bitGate.not);

export const xor = Signal.lift2(extendBitGate.xor);
