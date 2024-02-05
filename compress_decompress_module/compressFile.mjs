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
} from '../erros_handling_module/erros.mjs';

export function compressFile(fileToCompress, fileToOut) {
  if (fileToCompress === undefined) {
    errorCompressFileNotExist();
    return;
  }
  if (fileToOut === undefined) {
    errorOutFileNotExist();
    return;
  }
  const currentDirectory = getCurrentDirectory();
  const fileToCompressPath = path.resolve(currentDirectory, fileToCompress);
  const fileToOutPath = path.resolve(currentDirectory, fileToOut);

  fs.access(fileToOutPath, (err) => {
    if (err) {
      fs.access(fileToCompressPath, (err) => {
        if (err) {
          errorFileNotExist(fileToCompress);
        } else {
          const streamToCompress = fs.createReadStream(fileToCompressPath);
          const streamToOut = fs.createWriteStream(fileToOutPath);
          const brotliStream = zlib.createBrotliCompress();
          streamToCompress.pipe(brotliStream).pipe(streamToOut);
          streamToOut.on('finish', () => {
            console.log(
              `Compression of ${fileToCompress} to ${fileToOut} file completed successfully.`
            );
            console.log(`You are currently in ${getCurrentDirectory()}`);
            makePromtMessage();
          });
          streamToOut.on('error', (error) => {
            errorOfCompressionFile(error);
          });
          makePromtMessage();
        }
      });
    } else {
      errorOutFileAlredyExist(fileToOut);
    }
  });
}
