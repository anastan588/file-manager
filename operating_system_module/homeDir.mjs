import os from 'os';
import { makePromtMessage } from '../index.mjs';

export function receiveHomeDir() {
  const homeDirectory = os.homedir();
  console.log('Home Directory:', homeDirectory);
  makePromtMessage();
}
