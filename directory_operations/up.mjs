import path from 'path';
import { readLine } from '../index.mjs';
export function upOperation(currentDirectory) {
  if (currentDirectory !== path.parse(currentDirectory).root) {
    currentDirectory = path.dirname(currentDirectory);
  }
  console.log(`You are currently in ${currentDirectory}`);
  readLine.prompt();
}
