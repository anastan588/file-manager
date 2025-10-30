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

export function copyFileIncurrentDirectory(
  sourcePathInput,
  destinationDirInput
) {
  if (!sourcePathInput) {
    errorCopyFileNotExist();
    return;
  }
  if (!destinationDirInput) {
    errorNewDirectoryNotExist();
    return;
  }
  const currentDirectory = getCurrentDirectory();
  const sourcePath = path.isAbsolute(sourcePathInput)
    ? sourcePathInput
    : path.resolve(currentDirectory, sourcePathInput);

  const destinationDir = path.isAbsolute(destinationDirInput)
    ? destinationDirInput
    : path.resolve(currentDirectory, destinationDirInput);

  const fileName = path.basename(sourcePath);
  const destinationPath = path.join(destinationDir, fileName);
  fs.access(sourcePath, fs.constants.F_OK, (srcErr) => {
    if (srcErr) {
      errorFileNotExist(sourcePath);
      return;
    }
    fs.mkdir(destinationDir, { recursive: true }, (mkdirErr) => {
      if (mkdirErr) {
        errorOfCreatingDirectory(mkdirErr);
        return;
      }

      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(destinationPath);

      readStream.on('error', (err) => errorOfReadingFile(err));
      writeStream.on('error', (err) => errorOfWritingFile(err));

      writeStream.on('finish', () => {
        console.log(`File "${fileName}" copied to "${destinationDir}"`);
        console.log(`You are currently in ${getCurrentDirectory()}`);
        makePromtMessage();
      });

      readStream.pipe(writeStream);
    });
  });
}
