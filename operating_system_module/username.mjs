import os from 'os';
import { makePromtMessage } from '../index.mjs';

export function receiveUserName() {
  const username = os.userInfo().username;
  console.log('Current System User Name:', username);
  makePromtMessage();
}
