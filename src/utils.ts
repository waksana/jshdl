export const toBinary = (value: number, bitCount: number) =>
  value.toString(2).padStart(bitCount, '0').split('').map(Number);

export const toNumber = (biteArray: number[]): number =>
  biteArray.reduce((r, c) => (r << 1) + c, 0);

export const zip = <A, B, C>(a: Array<A>, b: Array<B>, fn: (a: A, b: B) => C): Array<C> => {
  return a.map((x, idx) => fn(x, b[idx]));
}

export const array = (n: number) => {
  const res = [];
  for(let i = 0; i < n; i++)
    res[i] = i;
  return res;
}
