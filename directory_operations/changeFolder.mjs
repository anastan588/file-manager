import path from 'path';
import { readLine } from '../index.mjs';
import fs from 'fs';
import { setCurrentDirectory, getCurrentDirectory } from '../index.mjs';

export function changeFolder(directory) {
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
      } else {
        console.log('Invalid input: directory does not exist.');
      }

      readLine.prompt();
    } else {
      console.log(newPath);
      setCurrentDirectory(newPath);
      console.log(`You are currently in ${newPath}`);
      readLine.prompt();
    }
  });
}
