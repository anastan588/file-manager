import path from 'path';
import fs from 'fs';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';
import {
  errorFileNotExist,
  errorMissedFileName,
  errorOfReadingFile,
} from '../erros_handling_module/erros.mjs';

export function readFileIncurrentDirectory(fileInput) {
  if (!fileInput) {
    errorMissedFileName();
    return;
  }
  const currentDirectory = getCurrentDirectory();
  const filePath = path.isAbsolute(fileInput)
    ? fileInput
    : path.resolve(currentDirectory, fileInput);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      errorFileNotExist(fileInput);
      return;
    }
    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
    readStream.on('data', (chunk) => {
      console.log(chunk);
    });
    readStream.on('error', (error) => {
      errorOfReadingFile(error);
    });
    readStream.on('end', () => {
      const fileName = path.basename(filePath);
      const parentDir = path.basename(path.dirname(filePath));
      console.log(`Finished reading "${fileName}" from "${parentDir}"`);
      console.log(`You are currently in ${getCurrentDirectory()}`);
      makePromtMessage();
    });
  });
}
