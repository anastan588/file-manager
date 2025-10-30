import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';
import {
  errorFileNotExist,
  errorMissedFileName,
  errorOfReadingFile,
} from '../erros_handling_module/erros.mjs';

export function receiveFileHash(fileInput) {
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
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);
    stream.on('data', (chunk) => {
      hash.update(chunk);
    });
    stream.on('error', (error) => {
      errorOfReadingFile(error);
    });
    stream.on('end', () => {
      const hexHash = hash.digest('hex');
      const fileName = path.basename(filePath);
      const parentDir = path.basename(path.dirname(filePath));
      console.log(`File "${fileName}" hashed successfully (SHA256): ${hexHash}`);
      console.log(`Located in "${parentDir}"`);
      console.log(`You are currently in ${getCurrentDirectory()}`);
      makePromtMessage();
    });
  });
}
