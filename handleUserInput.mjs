import { upOperation } from './directory_operations_module/upFolder.mjs';
import { changeFolder } from './directory_operations_module/changeFolder.mjs';
import { printDirectoryContents } from './directory_operations_module/listFilesFolders.mjs';
import { errorCommon } from './erros_handling/erros.mjs';

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
    case '.exit':
      process.exit(0);
    default:
      errorCommon();
  }
}
