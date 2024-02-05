import path from 'path';
import fs from 'fs';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';
import {
  errorDestinationFileNotExist,
  errorFileAlreadyExist,
  errorFileNotExist,
  errorSourceFileNotExist,
} from '../erros_handling_module/erros.mjs';

export function renameFileIncurrentDirectory(sourseFile, destinationFile) {
  if (sourseFile === undefined) {
    errorSourceFileNotExist();
    return;
  }
  if (destinationFile === undefined) {
    errorDestinationFileNotExist();
    return;
  }
  const currentDirectory = getCurrentDirectory();
  const sourceFilePath = path.resolve(currentDirectory, sourseFile);
  const destinationFilePath = path.resolve(currentDirectory, destinationFile);
  fs.access(destinationFilePath, (err) => {
    if (err) {
      fs.access(sourceFilePath, (err) => {
        if (err) {
          errorFileNotExist(sourseFile);
        } else {
          fs.rename(
            sourceFilePath,
            destinationFilePath,
            function (error, files) {
              if (error) return console.log(error);
              console.log(
                `File ${sourseFile} has been renamed to ${destinationFile}`
              );
              console.log(`You are currently in ${getCurrentDirectory()}`);
              makePromtMessage();
            }
          );
        }
      });
    } else {
      errorFileAlreadyExist(destinationFile);
      makePromtMessage();
    }
  });
}
