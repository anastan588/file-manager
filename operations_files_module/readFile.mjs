import path from 'path';
import fs from 'fs';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';
import {
  errorFileNotExist,
  errorMissedFileName,
} from '../erros_handling_module/erros.mjs';

export function readFileIncurrentDirectory(file) {
  if (file === undefined) {
    errorMissedFileName();
    return;
  }
  const currentDirectory = getCurrentDirectory();
  const fileToRead = path.join(currentDirectory, file);
  fs.access(fileToRead, (err) => {
    if (err) {
      errorFileNotExist(file);
    } else {
      fs.readFile(fileToRead, 'utf-8', (error, data) => {
        if (error) return console.log(error);
        console.log(data);
        makePromtMessage();
      });
    }
  });
}
