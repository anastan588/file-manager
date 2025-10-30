import os from 'os';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';

export function receiveHomeDir() {
  const homeDirectory = os.homedir();
  console.log('Home Directory:', homeDirectory);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}
