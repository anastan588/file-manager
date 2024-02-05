import * as readline from 'readline';
import path from 'path';
import { handleUserInput } from './common_module/handleUserInput.mjs';
const username = process.argv[2].split('=')[1];
console.log(`Welcome to the File Manager, ${username}!`);

export const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export let currentDirectory = path.resolve(process.env.USERPROFILE);
console.log(`You are currently in ${currentDirectory}`);

readLine.setPrompt('> ');

export function makePromtMessage() {
  readLine.prompt();
}

makePromtMessage();

readLine.on('line', (input) => {
  console.log(`Received input: ${input}`);
  makePromtMessage();
  if (input.trim() === '.exit') {
    readLine.close();
  }
  handleUserInput(input.trim());
});

readLine.on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});

export function setCurrentDirectory(newDirectory) {
  currentDirectory = newDirectory;
}

export function getCurrentDirectory() {
  return currentDirectory;
}
