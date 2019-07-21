import { Signal } from '../src/signal/signal';
import { and } from '../src/base/gate';
import * as assert from 'assert';

// 8 bits signal
const signal = Signal.createWithWidth(8);

signal.value = 255;
assert.ok(signal.bits.every(bit => bit.value === 1));

signal.value = 0;
assert.ok(signal.bits.every(bit => bit.value === 0));

// lift bit functions to signal
const andSignal = Signal.lift2(and);

signal.value = 138;
const signal2 = Signal.createWithValueAndWidth(137, 8);
assert.equal(andSignal(signal)(signal2).value, 136);
