import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';
import {
  errorFileNotExist,
  errorMissedFileName,
  errorOfReadingFile,
} from '../erros_handling_module/erros.mjs';

export function receiveFileHash(file) {
  if (file === undefined) {
    errorMissedFileName();
    return;
  }
  const currentDirectory = getCurrentDirectory();
  const fileToHash = path.resolve(currentDirectory, file);
  fs.access(fileToHash, (err) => {
    if (err) {
      errorFileNotExist(file);
    } else {
      const hash = crypto.createHash('sha256');
      const stream = fs.createReadStream(fileToHash);
      stream.on('data', (data) => {
        hash.update(data);
      });
      stream.on('error', (error) => {
        errorOfReadingFile(error);
      });
      stream.on('end', () => {
        const hexHash = hash.digest('hex');
        console.log('File SHA256 hash:', hexHash);
        console.log(
          `File ${file} has been cashed from ${
            currentDirectory.split('\\')[
              currentDirectory.split('\\').length - 1
            ]
          } directory successfully`
        );
        makePromtMessage();
      });
    }
  });
}
