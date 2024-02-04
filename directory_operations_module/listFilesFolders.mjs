import fs from 'fs';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';
import Table from 'cli-table';
import { errorNotContent } from '../erros_handling/erros.mjs';

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
  const table = new Table({
    head: ['(index)', 'Name', 'Type'],
    colWidths: [10, 30, 10],
    style: { head: ['cyan'] },
  });

  for (let i = 0; i < directoryContents.length; i += 1) {
    table.push([i, directoryContents[i].name, directoryContents[i].type]);
  }
  console.log(table.toString());
  makePromtMessage();
}
