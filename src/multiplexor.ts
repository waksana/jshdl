import {decoder} from './decoder';
import {and, or} from './gate';
import {Wire} from './wire';

export function multiplexor(control: Wire[], data: Wire[]) {
  const signals = decoder(control);
  return or(...data.map((wire, i) => and(wire, signals[i])));
}
