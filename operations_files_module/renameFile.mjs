import path from 'path';
import fs from 'fs';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';
import {
  errorDestinationFileNotExist,
  errorFileAlreadyExist,
  errorFileNotExist,
  errorSourceFileNotExist,
} from '../erros_handling_module/erros.mjs';

export function renameFileIncurrentDirectory(sourceInput, destinationInput) {
  if (!sourceInput) {
    errorSourceFileNotExist();
    return;
  }
  if (!destinationInput) {
    errorDestinationFileNotExist();
    return;
  }
  const currentDirectory = getCurrentDirectory();
  const sourcePath = path.isAbsolute(sourceInput)
    ? sourceInput
    : path.resolve(currentDirectory, sourceInput);
  const destinationPath = path.isAbsolute(destinationInput)
    ? destinationInput
    : path.resolve(currentDirectory, destinationInput);

  fs.access(destinationPath, fs.constants.F_OK, (destErr) => {
    if (!destErr) {
      errorFileAlreadyExist(destinationInput);
      makePromtMessage();
      return;
    }
    fs.access(sourcePath, fs.constants.F_OK, (srcErr) => {
      if (srcErr) {
        errorFileNotExist(sourceInput);
        return;
      }
      fs.rename(sourcePath, destinationPath, (renameErr) => {
        if (renameErr) {
          console.error(`Rename failed: ${renameErr.message}`);
          makePromtMessage();
          return;
        }
        const oldName = path.basename(sourcePath);
        const newName = path.basename(destinationPath);
        const targetDir = path.basename(path.dirname(destinationPath));
        console.log(`File "${oldName}" has been renamed to "${newName}" in "${targetDir}"`);
        console.log(`You are currently in ${getCurrentDirectory()}`);
        makePromtMessage();
      });
    });
  });
}
