import path from 'path';
import fs from 'fs';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';
import {
  errorFileNotExist,
  errorMoveDirectoryNotExist,
  errorMoveFileNotExist,
  errorOfCreatingDirectory,
  errorOfDeletingFile,
  errorOfReadingFile,
  errorOfWritingFile,
} from '../erros_handling_module/erros.mjs';

export function moveFileIncurrentDirectory(
  sourcePathInput,
  destinationDirInput
) {
  if (!sourcePathInput) {
    errorMoveFileNotExist();
    return;
  }
  if (!destinationDirInput) {
    errorMoveDirectoryNotExist();
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
      errorFileNotExist(sourcePathInput);
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
        fs.unlink(sourcePath, (unlinkErr) => {
          if (unlinkErr) {
            errorOfDeletingFile(unlinkErr);
            return;
          }

          console.log(
            `File "${
              fileName.split(`/`)[fileName.split(`/`).length - 1]
            }" moved to "${destinationDir}"`
          );
          console.log(`You are currently in ${getCurrentDirectory()}`);
          makePromtMessage();
        });
      });

      readStream.pipe(writeStream);
    });
  });
}
