import path from 'path';
import fs from 'fs';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';
import {
  errorFileNotExist,
  errorMissedFileName,
  errorOfReadingFile,
} from '../erros_handling_module/erros.mjs';

export function readFileIncurrentDirectory(file) {
  if (file === undefined) {
    errorMissedFileName();
    return;
  }
  const currentDirectory = getCurrentDirectory();
  const fileToRead = path.resolve(currentDirectory, file);
  fs.access(fileToRead, (err) => {
    if (err) {
      errorFileNotExist(file);
    } else {
      const readStream = fs.createReadStream(fileToRead, { encoding: 'utf8' });
      readStream.on('data', (chunk) => {
        console.log(chunk);
      });
      readStream.on('error', (error) => {
        errorOfReadingFile(error);
      });
      readStream.on('end', () => {
        console.log('File reading finished.');
        makePromtMessage();
      });
    }
  });
}
