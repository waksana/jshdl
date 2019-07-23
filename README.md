jshdl
===========

js functional hardware description language for fun

## bit

```typescript
const a = new Bit();
const b = new Bit();

a.connect(b);

a.value = 0; //b.value === 0
a.value = 1; //b.value === 1
```

## gate

```typescript
const a = new Bit();
const b = new Bit();

const c = and(a)(b);

a.value = 0
b.value = 1
assert.equal(c.value, 0);

a.value = 1
b.value = 1
assert.equal(c.value, 1);
```

## signal

```typescript
// 8 bits signal
const signal = Signal.createWithWidth(8);

signal.value = 255;
assert(signal.bits.every(bit => bit.value === 1));

signal.value = 0;
assert(signal.bits.every(bit => bit.value === 0));

// lift bit functions to signal
const andSignal = Signal.lift2(and);

signal.value = 138;
const signal2 = Signal.createWithValueAndWidth(137, 8);
assert.equal(andSignal(signal)(signal2).value, 136);
```

## adder

```typescript
const a = new Bit(1);
const b = new Bit(1);
const carryIn = new Bit();

const result = adder(a)(b)(carryIn);

result.sums[0].value === 1
result.carryOut.value === 1

// it also support multiple bits
const c = new Bit(0);
const d = new Bit(1);
//carry bit will be handled automatically
const multipleBitsResult = result.bind(adder(c)(d));
multipleBitsResult.carryOut.value === 0
// overflowed
multipleBitsResult.overflow.value === 1
```
