import {adder} from '../src/adder';
import {Bus} from '../src/bus';
import {Wire} from '../src/wire';
import * as assert from 'assert';

const a = Bus.create(8);
const b = Bus.create(8);
const carryIn = new Wire();
carryIn.value = 0;

const [sum, carryOut] = adder(a.wires, b.wires, carryIn);

const sumBus = new Bus(sum);

a.value = 213;
b.value = 11;

assert.equal(sumBus.value, 224);
assert.equal(carryOut.value, 0);
