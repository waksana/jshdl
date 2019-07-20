jshdl
===========

js hardware description language for fun

## wire

```typescript
const wire = new Wire();

wire.watch(v => console.log('state changed', v));
wire.value = 1; //state changed 1
```

## gate

```typescript
const a = new Wire();
const b = new Wire();
const c = new Wire();

const aAndBAndC = and(a, b, c);
const aOrBOrC = or(a, b, c);
const notA = not(a);
```

## bus

```typescript
const bus = Bus.create(8); // 8 wires(bits)
bus.value = 255; // set all 8 wires to 1
```
