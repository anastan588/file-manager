import * as readline from 'readline';
import path from 'path';
import { upOperation } from './directory_operations/upFolder.mjs';
import { changeFolder } from './directory_operations/changeFolder.mjs';

export function handleUserInput(input) {
  const args = input.trim().split(' ');
  const command = args[0].toLowerCase();
  switch (command) {
    case 'up':
      upOperation();
      break;
    case 'cd':
      changeFolder(args[1]);// ... existing code for the "cd" command ...
      break;
    case 'ls':
      // ... existing code for the "ls" command ...
      break;
    case '.exit':
      process.exit(0);
    default:
      console.log('Invalid input.');
      console.log();
  }
}
