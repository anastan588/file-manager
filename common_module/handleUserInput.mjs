import { upOperation } from '../directory_operations_module/upFolder.mjs';
import { changeFolder } from '../directory_operations_module/changeFolder.mjs';
import { printDirectoryContents } from '../directory_operations_module/listFilesFolders.mjs';
import { errorCommon, errorPrefix } from '../erros_handling_module/erros.mjs';
import { readFileIncurrentDirectory } from '../operations_files_module/readFile.mjs';
import { createFileIncurrentDirectory } from '../operations_files_module/createFile.mjs';
import { renameFileIncurrentDirectory } from '../operations_files_module/renameFile.mjs';
import { copyFileIncurrentDirectory } from '../operations_files_module/copyFile.mjs';
import { moveFileIncurrentDirectory } from '../operations_files_module/moveFile.mjs';
import { deleteFileIncurrentDirectory } from '../operations_files_module/deleteFile.mjs';
import { receiveOEL } from '../operating_system_module/eol.mjs';
import { receiveCPU } from '../operating_system_module/cpu.mjs';
import { receiveHomeDir } from '../operating_system_module/homeDir.mjs';
import { receiveUserName } from '../operating_system_module/username.mjs';
import { receiveCPUArchitecture } from '../operating_system_module/architecture.mjs';
import { receiveFileHash } from '../hash_module/hash.mjs';
import { compressFile } from '../compress_decompress_module/compressFile.mjs';
import { decompressFile } from '../compress_decompress_module/decomPressFile.mjs';

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
    case 'rn':
      const namesOfFilesToRename = args.slice(1);
      const [sourseFileToRename, destinationFileToRename] =
        namesOfFilesToRename;
      renameFileIncurrentDirectory(sourseFileToRename, destinationFileToRename);
      break;
    case 'cp':
      const namesOfFilesToCopy = args.slice(1);
      const [sourseFileToCopy, destinationDirectory] = namesOfFilesToCopy;
      copyFileIncurrentDirectory(sourseFileToCopy, destinationDirectory);
      break;
    case 'mv':
      const namesOfFilesToMove = args.slice(1);
      const [sourseFileToMove, destinationDirectoryToMove] = namesOfFilesToMove;
      moveFileIncurrentDirectory(sourseFileToMove, destinationDirectoryToMove);
      break;
    case 'rm':
      deleteFileIncurrentDirectory(args[1]);
      break;
    case 'hash':
      receiveFileHash(args[1]);
      break;
    case 'compress':
      const namesOfFilesToCompress = args.slice(1);
      const [fileToCompress, fileToOut] = namesOfFilesToCompress;
      compressFile(fileToCompress, fileToOut);
      break;
    case 'decompress':
      const namesOfFilesToDeCompress = args.slice(1);
      const [fileToDECompress, fileToOutDe] = namesOfFilesToDeCompress;
      decompressFile(fileToDECompress, fileToOutDe);
      break;
    case 'os':
      const commandOsPrefix = args[1];
      switch (commandOsPrefix) {
        case '--EOL':
          receiveOEL();
          break;
        case '--cpus':
          receiveCPU();
          break;
        case '--homedir':
          receiveHomeDir();
          break;
        case '--username':
          receiveUserName();
          break;
        case '--username':
          receiveUserName();
          break;
        case '--architecture':
          receiveCPUArchitecture();
          break;
        default:
          errorPrefix();
      }
      break;
    case '.exit':
      process.exit(0);
    default:
      errorCommon();
  }
}
