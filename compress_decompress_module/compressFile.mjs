import path from 'path';
import fs from 'fs';
import zlib from 'zlib';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';
import {
  errorCompressFileNotExist,
  errorFileNotExist,
  errorOfCompressionFile,
  errorOutFileAlredyExist,
  errorOutFileNotExist,
  errorOfDeletingFile,
} from '../erros_handling_module/erros.mjs';

export function compressFile(fileInput, outputInput) {
  if (!fileInput) {
    errorCompressFileNotExist();
    return;
  }
  if (!outputInput) {
    errorOutFileNotExist();
    return;
  }
  const currentDirectory = getCurrentDirectory();
  const sourcePath = path.isAbsolute(fileInput)
    ? fileInput
    : path.resolve(currentDirectory, fileInput);

  const outputPath = path.isAbsolute(outputInput)
    ? outputInput
    : path.resolve(currentDirectory, outputInput);
  fs.access(outputPath, fs.constants.F_OK, (outErr) => {
    if (!outErr) {
      errorOutFileAlredyExist(outputInput);
      return;
    }
    fs.access(sourcePath, fs.constants.F_OK, (srcErr) => {
      if (srcErr) {
        errorFileNotExist(fileInput);
        return;
      }
      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(outputPath);
      const brotliStream = zlib.createBrotliCompress();
      readStream.pipe(brotliStream).pipe(writeStream);
      writeStream.on('finish', () => {
        fs.unlink(sourcePath, (unlinkErr) => {
          const sourceName = path.basename(sourcePath);
          const outputName = path.basename(outputPath);
          const outputDir = path.basename(path.dirname(outputPath));

          if (unlinkErr) {
            errorOfDeletingFile(unlinkErr);
            return;
          }
          console.log(`File "${sourceName}" compressed and removed.`);
          console.log(`Compressed as "${outputName}" in "${outputDir}"`);
          console.log(`You are currently in ${getCurrentDirectory()}`);
          makePromtMessage();
        });
      });
      writeStream.on('error', (error) => {
        errorOfCompressionFile(error);
      });
    });
  });
}
