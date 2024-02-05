import fs from 'fs';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';
import { errorNotContent } from '../erros_handling_module/erros.mjs';

function getDirectoryContents(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, { withFileTypes: true }, (err, contents) => {
      if (err) {
        reject(err);
        return;
      }
      const files = [];
      const folders = [];
      contents.forEach((item) => {
        if (item.isFile()) {
          files.push({ name: item.name, type: 'File' });
        } else if (item.isDirectory()) {
          folders.push({ name: item.name, type: 'Directory' });
        }
      });
      const sortedFolders = folders.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      const sortedFiles = files.sort((a, b) => a.name.localeCompare(b.name));
      resolve(sortedFolders.concat(sortedFiles));
    });
  });
}

export async function printDirectoryContents() {
  const currentDirectory = getCurrentDirectory();
  const directoryContents = await getDirectoryContents(currentDirectory);
  if (directoryContents.length === 0) {
    errorNotContent();
    return;
  }
  console.table([...directoryContents]);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}
