import path from 'path';
import fs from 'fs';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';
import { errorCopyFileNotExist, errorFileNotExist, errorNewFileNotExist} from '../erros_handling_module/erros.mjs';


export function copyFileIncurrentDirectory(sourseFile, destinationFile) {
    if (sourseFile === undefined) {
      errorCopyFileNotExist()
      return;
    }
    if (destinationFile === undefined) {
      errorNewFileNotExist()
      return;
    }
    const currentDirectory = getCurrentDirectory();
    const sourceFilePath = path.join(currentDirectory, sourseFile);
    const destinationFilePath = path.join(currentDirectory, destinationFile);
    fs.access(destinationFilePath, (err) => {
      if (err) {
        fs.access(sourceFilePath, (err) => {
          if (err) {
            errorFileNotExist(sourseFile);
          } else {
            fs.copyFile(
              sourceFilePath,
              destinationFilePath,
              function (error, files) {
                if (error) return console.log(error);
                console.log(
                  `Copy of file ${sourseFile} has been created in ${destinationFile}'`
                );
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
  