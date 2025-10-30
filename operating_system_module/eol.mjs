
import os from 'os';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';

export function receiveOEL() {
  const defaultEOL = os.EOL;
  console.log(`Default EOL: ${JSON.stringify(defaultEOL)}`);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}