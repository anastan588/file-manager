import path from 'path';
import { makePromtMessage } from '../index.mjs';
import { setCurrentDirectory, getCurrentDirectory } from '../index.mjs';
import { errorCommon } from '../erros_handling/erros.mjs';

export function upOperation() {
  let currentDirectory = getCurrentDirectory();
  if (currentDirectory !== path.parse(currentDirectory).root) {
    let parentDirectory = path.dirname(currentDirectory);
    if (currentDirectory !== parentDirectory) {
      currentDirectory = parentDirectory;
      console.log('Moved up to the parent directory:', currentDirectory);
      console.log(`You are currently in ${currentDirectory}`);
      setCurrentDirectory(currentDirectory);
    } else {
      errorCommon();
    }
  } else {
    console.log(`You are already in root directory ${currentDirectory}`);
  }
  makePromtMessage();
}
