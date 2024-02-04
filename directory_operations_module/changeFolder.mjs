import path from 'path';
import { makePromtMessage } from '../index.mjs';
import fs from 'fs';
import { setCurrentDirectory, getCurrentDirectory } from '../index.mjs';
import { errorMissedParamets, errorPath } from '../erros_handling_module/erros.mjs';

export function changeFolder(directory) {
  if (directory === undefined) {
    errorMissedParamets();
    return;
  }
  let currentDirectory = getCurrentDirectory();
  console.log(directory);
  console.log(currentDirectory);
  const newPath = path.resolve(currentDirectory, directory);
  fs.access(newPath, (err) => {
    if (err) {
      const curFolderPathArray = currentDirectory.split('\\');
      if (
        curFolderPathArray[
          curFolderPathArray.length - 1
        ].toLocaleLowerCase() === directory
      ) {
        console.log(`You are already in ${directory}`);
        makePromtMessage();
      } else {
        errorPath();
      }
    } else {
      console.log(newPath);
      setCurrentDirectory(newPath);
      console.log(`You are currently in ${newPath}`);
      makePromtMessage();
    }
  });
}
