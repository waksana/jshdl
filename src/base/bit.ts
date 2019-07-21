export class Bit {
  public watcher: Set<(v: number) => void> = new Set();
  private _value: number = 0;
  constructor(value: number = 0) { this.value = value; }
  set value(value: number) {
    if(value !== 0 && value !== 1)
      throw new Error(`invalid signal: ${value} is not in 1 0`);
    if(value != this.value) {
      this._value = value;
      this.watcher.forEach(fn => fn(value));
    }
  }
  get value() { return this._value; }
}
