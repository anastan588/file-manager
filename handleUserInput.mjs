import * as readline from 'readline';
import path from 'path';
import { upOperation } from './directory_operations/up.mjs';

export function handleUserInput(input, currentDirectory) {
  const args = input.trim().split(' ');
  console.log(args);
  const command = args[0].toLowerCase();
  console.log(command);
  switch (command) {
    case 'up':
      upOperation(currentDirectory);
      break;
    case 'cd':
      // ... existing code for the "cd" command ...
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
