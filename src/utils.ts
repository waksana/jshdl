export const fold = <T>(fn: (a: T) => (b: T) => T) => function f(bits: T[]): T {
  if(bits.length === 0)
    throw new Error('fold need more than one element');
  if(bits.length === 1)
    return bits[0];
  return fn(bits[0])(f(bits.slice(1)));
}

export const apply = <A, B>(fns: Array<(a: A) => B>) => (a: A[]): B[] => {
  if(fns.length !== a.length)
    throw new Error('apply length mismatch');
  return fns.map((fn, idx) => fn(a[idx]));
}

export const buildArray = <T>(length: number, builder: (i: number) => T): T[] => {
  return length-- === 0 ? [] : buildArray(length, builder).concat(builder(length))
}

export const map = <A, B>(fn: (a: A) => B) => (a: A[]): B[] => {
  return a.map(fn);
}

export const lift2 = <A, B, C>(fn: (a: A) => (b: B) => C) => (as: A[]): (bs: B[]) => C[] => {
  const fns = map(fn)(as);
  return bs => apply(fns)(bs);
}

export const liftN = <A, B>(fn: (a: A[]) => B) => ([a, ...as]: A[][]): B[] => {
  if(a === undefined)
    throw new Error('liftN need more than zero elements');
  if(as.some(x => x.length !== a.length))
    throw new Error('elements are not aligned');
  const rows = as.reduce((rows, xs) => {
    return rows.map((row, i) => row.concat(xs[i]));
  }, a.map(x => [x]));
  return rows.map(fn);
}
