import path from 'path';
import fs from 'fs';
import zlib from 'zlib';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';
import {
  errorDeCompressFileNotExist,
  errorFileNotExist,
  errorOfDeCompressionFile,
  errorOutFileAlredyExist,
  errorOutFileNotExist,
  errorOfDeletingFile,
} from '../erros_handling_module/erros.mjs';

export function decompressFile(fileInput, outputInput) {
  if (!fileInput) {
    errorDeCompressFileNotExist();
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
      const brotliStream = zlib.createBrotliDecompress();
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
          console.log(`File "${sourceName}" decompressed and removed.`);
          console.log(`Decompressed as "${outputName}" in "${outputDir}"`);
          console.log(`You are currently in ${getCurrentDirectory()}`);
          makePromtMessage();
        });
      });
      writeStream.on('error', (error) => {
        errorOfDeCompressionFile(error);
      });
    });
  });
}
