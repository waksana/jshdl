import { alu } from '../src/signal/alu';
import { Signal } from '../src/signal/signal';

/*
 * 0000 add a b
 * 0001 sub a b
 * 0100 or  a b
 * 1000 and a b
 * 1011 nor a b
 * 1101 slt a b
 * */

const op = Signal.createWithWidth(4);
const a = Signal.createWithWidth(16);
const b = Signal.createWithWidth(16);

const [result, , overflow, /*zero*/] = alu(op)(a)(b)

op.value = 0;
a.value = -400;
b.value = 15;
console.log('result: ', result.value, 'overflow: ', overflow.value);

op.value = 1;
a.value = 0;
b.value = -15;
console.log('result: ', result.value, 'overflow: ', overflow.value);

op.value = 13;
a.value = -16;
b.value = -15;
result.bits.forEach(b => console.log(b.value));
console.log('result: ', result.value, 'overflow: ', overflow.value);
