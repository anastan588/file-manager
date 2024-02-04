import { upOperation } from './directory_operations_module/upFolder.mjs';
import { changeFolder } from './directory_operations_module/changeFolder.mjs';
import { printDirectoryContents } from './directory_operations_module/listFilesFolders.mjs';
import { errorCommon } from './erros_handling_module/erros.mjs';
import { readFileIncurrentDirectory } from './operations_files_module/readFile.mjs';
import { createFileIncurrentDirectory } from './operations_files_module/createFile.mjs';

export function handleUserInput(input) {
  const args = input.trim().split(' ');
  const command = args[0].toLowerCase();
  switch (command) {
    case 'up':
      upOperation();
      break;
    case 'cd':
      changeFolder(args[1]);
      break;
    case 'ls':
      printDirectoryContents();
      break;
    case 'cat':
      readFileIncurrentDirectory(args[1]);
      break;
    case 'add':
      createFileIncurrentDirectory(args[1]);
      break;
    case '.exit':
      process.exit(0);
    default:
      errorCommon();
  }
}
