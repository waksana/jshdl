import {Wire} from './wire';
import {toNumber, toBinary, array, zip} from './utils';

export class Bus {
  constructor(public wires: Wire[]) { }
  static create(width: number) {
    return new Bus(array(width).map(() => new Wire()));
  }
  set value(value: number) {
    zip(toBinary(value, this.wires.length), this.wires, (v, wire) =>
      wire.value = v);
  }
  get value(): number {
    if(this.wires.some(wire => wire.value === -1))
      return -1;
    return toNumber(this.wires.map(wire => wire.value));
  }
}
