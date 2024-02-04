import path from 'path';
import fs from 'fs';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';
import {
  errorCopyFileNotExist,
  errorDirectoryNotExist,
  errorFileNotExist,
  errorNewDirectoryNotExist,
  errorOfCreatingDirectory,
  errorOfReadingFile,
  errorOfWritingFile,
} from '../erros_handling_module/erros.mjs';

export function copyFileIncurrentDirectory(sourseFile, destinationDirectory) {
  if (sourseFile === undefined) {
    errorCopyFileNotExist();
    return;
  }
  if (destinationDirectory === undefined) {
    errorNewDirectoryNotExist();
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
  console.log(parentDirectoryPathArray);
  console.log(destinationDirectory);
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
  console.log();
  console.log(currentDirectory);
  console.log(sourceFilePath);
  console.log(destinationDirectoryPath);
  console.log(destinationFilePath);

  fs.access(destinationDirectoryPath, (err) => {
    if (err) {
      errorDirectoryNotExist(destinationDirectoryPath);
      fs.mkdir(destinationDirectoryPath, { recursive: true }, (err) => {
        if (err) {
          errorOfCreatingDirectory(err);
        } else {
          console.log(
            `Directory ${destinationDirectory} created successfully. You can try to copy file again`
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
            console.log(
              `Copy of file ${sourseFile} has been created in ${destinationDirectory} directory`
            );
            makePromtMessage();
          });
          readStream.pipe(writeStream);
        }
      });
    }
  });
}
