import path from 'path';
import fs from 'fs';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';
import {
  errorFileNotExist,
  errorMissedFileName,
  errorOfDeletingFile,
} from '../erros_handling_module/erros.mjs';

export function deleteFileIncurrentDirectory(fileInput) {
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
    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr) {
        errorOfDeletingFile(unlinkErr);
        return;
      }
      const fileName = path.basename(filePath);
      const parentDir = path.basename(path.dirname(filePath));
      console.log(
        `File "${
          fileName.split(`/`)[fileName.split(`/`).length - 1]
        }" has been deleted from "${parentDir}" directory successfully`
      );
      console.log(`You are currently in ${getCurrentDirectory()}`);
      makePromtMessage();
    });
  });
}
