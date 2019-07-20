export class Wire {
  private _value: number = -1;
  public watcher: Set<(v: number) => void> = new Set();
  get value() {
    return this._value;
  }
  set value(value: number) {
    if(value !== 0 && value !== 1 && value !== -1)
      throw new Error(`invalid signal: ${value} is not in 1 0 -1`);
    if(value != this.value) {
      this._value = value;
      this.watcher.forEach(fn => fn(value));
    }
  }
  watch(fn: (v: number) => void) {
    this.watcher.add(fn);
    return this;
  }
}
