import path from 'path';
import { readLine } from '../index.mjs';
import { setCurrentDirectory, getCurrentDirectory } from '../index.mjs';

export function upOperation() {
  let currentDirectory = getCurrentDirectory();
  console.log(currentDirectory);
  if (currentDirectory !== path.parse(currentDirectory).root) {
    let parentDirectory = path.dirname(currentDirectory);
    console.log(parentDirectory);
    if (currentDirectory !== parentDirectory) {
      currentDirectory = parentDirectory;
      console.log('Moved up to the parent directory:', currentDirectory);
      console.log(`You are currently in ${currentDirectory}`);
      setCurrentDirectory(currentDirectory);
    } else {
      console.log(`You are already in ${currentDirectory}`);
    }
  } else {
    console.log(`You are already in root directory ${currentDirectory}`);
  }
  readLine.prompt();
}
