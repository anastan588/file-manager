import path from 'path';
import fs from 'fs';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';
import {
  errorFileAlreadyExist,
  errorMissedFileName,
} from '../erros_handling_module/erros.mjs';

export function createFileIncurrentDirectory(file) {
  if (file === undefined) {
    errorMissedFileName();
    return;
  }
  const currentDirectory = getCurrentDirectory();
  const fileToCreate = path.resolve(currentDirectory, file);
  fs.access(fileToCreate, (err) => {
    if (err) {
      fs.writeFile(fileToCreate, '', function (error) {
        console.log(
          `File ${file} has been created in ${
            currentDirectory.split('\\')[
              currentDirectory.split('\\').length - 1
            ]
          } directory`
        );
        console.log(`You are currently in ${getCurrentDirectory()}`);
        makePromtMessage();
      });
    } else {
      errorFileAlreadyExist(file);
    }
  });
}
