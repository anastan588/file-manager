import os from 'os';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';

export function receiveUserName() {
  const username = os.userInfo().username;
  console.log('Current System User Name:', username);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}
