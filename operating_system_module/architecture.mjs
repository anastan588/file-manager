import os from 'os';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';

export function receiveCPUArchitecture() {
  const cpuArchitecture = os.arch();
  console.log('Node.js CPU Architecture:', cpuArchitecture);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}
