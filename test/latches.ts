import { ok } from 'assert';
import {latches} from '../src/bit/latches';
import { Bit } from '../src/base/bit';

const r = new Bit();
const s = new Bit();

const [q, nq] = latches(r)(s);

ok(q.value === 0 && nq.value === 1);

s.value = 1;
ok(q.value === 1 && nq.value === 0);

s.value = 0;
ok(q.value === 1 && nq.value === 0);

r.value = 1;
ok(q.value === 0 && nq.value === 1);

r.value = 0;
ok(q.value === 0 && nq.value === 1);
