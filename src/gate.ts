import { Wire } from './wire';

const gate = (logic: (...vs: number[]) => number) => (...wires: Wire[]) : Wire => {
  const out = new Wire();
  function watcher() {
    if(wires.some(wire => wire.value === -1))
      out.value = -1;
    else
      out.value = logic(...wires.map(wire => wire.value));
  }
  wires.forEach(wire => wire.watch(watcher));
  return out;
}

export const and = gate((...v) => v.reduce((r, c) => r & c, 1));

export const or = gate((...v) => v.reduce((r, c) => r | c, 0));

export const not = gate((a) => (1 - a));

export const xor = (...wires: Wire[]): Wire => and(not(and(...wires)), or(...wires))

export const nor = (...wires: Wire[]): Wire => not(or(...wires))
