import path from 'path';
import fs from 'fs';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';
import {
  errorCopyFileNotExist,
  errorDirectoryNotExist,
  errorFileNotExist,
  errorMoveDirectoryNotExist,
  errorMoveFileNotExist,
  errorNewDirectoryNotExist,
  errorOfCreatingDirectory,
  errorOfDeletingFile,
  errorOfReadingFile,
  errorOfWritingFile,
} from '../erros_handling_module/erros.mjs';

export function moveFileIncurrentDirectory(sourseFile, destinationDirectory) {
  if (sourseFile === undefined) {
    errorMoveFileNotExist();
    return;
  }
  if (destinationDirectory === undefined) {
    errorMoveDirectoryNotExist();
    return;
  }
  const currentDirectory = getCurrentDirectory();
  const sourceFilePath = path.resolve(currentDirectory, sourseFile);

  let destinationDirectoryPath = path.resolve(
    currentDirectory,
    destinationDirectory
  );
  const parentDirectoryPath = path.dirname(sourceFilePath);
  let parentDirectoryPathArray = parentDirectoryPath.toLowerCase().split('\\');

  if (parentDirectoryPathArray.includes(destinationDirectory.toLowerCase())) {
    let destinationPathArray = parentDirectoryPathArray.slice(
      0,
      parentDirectoryPathArray.indexOf(destinationDirectory.toLowerCase()) + 1
    );
    let resultPath = destinationPathArray.join('\\');
    console.log(resultPath);
    destinationDirectoryPath = resultPath;
  }
  let destinationFilePath = path.resolve(destinationDirectoryPath, sourseFile);
  fs.access(destinationDirectoryPath, (err) => {
    if (err) {
      errorDirectoryNotExist(destinationDirectoryPath);
      fs.mkdir(destinationDirectoryPath, { recursive: true }, (err) => {
        if (err) {
          errorOfCreatingDirectory(err);
        } else {
          console.log(
            `Directory ${destinationDirectory} created successfully. You can try to move file again`
          );
          makePromtMessage();
        }
      });
    } else {
      fs.access(sourceFilePath, (err) => {
        if (err) {
          errorFileNotExist(sourseFile);
        } else {
          const readStream = fs.createReadStream(sourceFilePath);

          const writeStream = fs.createWriteStream(destinationFilePath);

          readStream.on('error', (error) => {
            errorOfReadingFile(error);
          });

          writeStream.on('error', (error) => {
            errorOfWritingFile(error);
          });

          writeStream.on('finish', () => {
            fs.unlink(sourceFilePath, (err) => {
              if (err) {
                errorOfDeletingFile(err);
                return;
              }
              console.log(
                `File ${sourseFile} has been moved to ${destinationDirectory} directory successfully`
              );
              makePromtMessage();
            });
          });
          readStream.pipe(writeStream);
        }
      });
    }
  });
}
