import path from 'path';
import fs from 'fs';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';
import {
  errorFileNotExist,
  errorMissedFileName,
  errorOfDeletingFile,
} from '../erros_handling_module/erros.mjs';

export function deleteFileIncurrentDirectory(file) {
  if (file === undefined) {
    errorMissedFileName();
    return;
  }
  const currentDirectory = getCurrentDirectory();
  const fileToDelete = path.resolve(currentDirectory, file);
  fs.access(fileToDelete, (err) => {
    if (err) {
      errorFileNotExist(file);
    } else {
      fs.unlink(fileToDelete, (err) => {
        if (err) {
          errorOfDeletingFile(err);
          return;
        }
        console.log(
          `File ${file} has been deleted from ${
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
