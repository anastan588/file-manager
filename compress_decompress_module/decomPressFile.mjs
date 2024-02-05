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
} from '../erros_handling_module/erros.mjs';

export function decompressFile(fileToDeCompress, fileToOut) {
  if (fileToDeCompress === undefined) {
    errorDeCompressFileNotExist();
    return;
  }
  if (fileToOut === undefined) {
    errorOutFileNotExist();
    return;
  }
  const currentDirectory = getCurrentDirectory();
  const fileToDeCompressPath = path.resolve(currentDirectory, fileToDeCompress);
  const fileToOutPath = path.resolve(currentDirectory, fileToOut);

  fs.access(fileToOutPath, (err) => {
    if (err) {
      fs.access(fileToDeCompressPath, (err) => {
        if (err) {
          errorFileNotExist(fileToDeCompress);
        } else {
          const streamToDeCompress = fs.createReadStream(fileToDeCompressPath);
          const streamToOut = fs.createWriteStream(fileToOutPath);
          const brotliStream = zlib.createBrotliDecompress();
          streamToDeCompress.pipe(brotliStream).pipe(streamToOut);
          streamToOut.on('finish', () => {
            console.log(
              `Decompression of ${fileToDeCompress} to ${fileToOut} file completed successfully.`
            );
            makePromtMessage();
          });
          streamToOut.on('error', (error) => {
            errorOfDeCompressionFile(error);
          });
          makePromtMessage();
        }
      });
    } else {
      errorOutFileAlredyExist(fileToOut);
    }
  });
}
