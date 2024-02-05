
import os from 'os';
import { makePromtMessage } from '../index.mjs';

export function receiveOEL() {
  const defaultEOL = os.EOL;
  console.log(`Default EOL: ${JSON.stringify(defaultEOL)}`);
  makePromtMessage();
}