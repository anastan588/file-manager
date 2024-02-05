import os from 'os';
import { makePromtMessage } from '../index.mjs';

export function receiveCPUArchitecture() {
  const cpuArchitecture = os.arch();
  console.log('Node.js CPU Architecture:', cpuArchitecture);
  makePromtMessage();
}
