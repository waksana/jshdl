jshdl
===========

js hardware description language for fun

## bit

```typescript
const a = new Bit();

a.value = 0;
a.value = 1;
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
