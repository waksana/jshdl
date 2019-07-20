import { Wire } from './wire';
import {truthTable} from './truthTable';
import {array} from './utils';

export const decoder = (wires: Wire[]): Wire[]  => {
  return array(Math.pow(2, wires.length)).map(i => truthTable([i])(wires));
}
