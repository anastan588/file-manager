import { makePromtMessage } from '../index.mjs';

export function errorCommon() {
  console.log('Invalid input. Command doesn\'t exist');
  makePromtMessage();
}

export function errorMissedParamets() {
    console.log('Invalid input. Missed parametrs of command');
    makePromtMessage();
  }

export function errorPath() {
  console.log('Invalid input: directory does not exist.');
  makePromtMessage();
}

export function errorNotContent() {
    console.log('Directory has no files and folders');
    makePromtMessage();
  }
