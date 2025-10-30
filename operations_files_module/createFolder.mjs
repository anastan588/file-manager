import path from 'path';
import fs from 'fs';
import { getCurrentDirectory, makePromtMessage } from '../index.mjs';
import {
    errorDirectoryAlreadyExist,
  errorMissedFolderName,
} from '../erros_handling_module/erros.mjs';

export function createFolderIncurrentDirectory(folder) {
  if (folder === undefined) {
    errorMissedFolderName;
    return;
  }
  const currentDirectory = getCurrentDirectory();
  const folderToCreate = path.resolve(currentDirectory, folder);
  fs.access(folderToCreate, (err) => {
    if (err) {
      fs.mkdir(folderToCreate, { recursive: true }, function (error) {
        console.log(
          `Folder ${folder} has been created in ${
            currentDirectory.split('\\')[
              currentDirectory.split('\\').length - 1
            ]
          } directory`
        );
        console.log(`You are currently in ${getCurrentDirectory()}`);
        makePromtMessage();
      });
    } else {
      errorDirectoryAlreadyExist(folder);
    }
  });
}
