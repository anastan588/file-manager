import * as readline from 'readline';
import path from 'path';
const username = process.argv[2].split('=')[1];
console.log(`Welcome to the File Manager, ${username}!`);

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readLine.setPrompt('> ');
readLine.prompt();

readLine.on('line', (input) => {
  console.log(`Received input: ${input}`);
  const currentDirectory = path.resolve(process.env.USERPROFILE);;
  console.log(`You are currently in ${currentDirectory}`);
  readLine.prompt();

  if (input.trim() === '.exit') {
    readLine.close();
  }
});

readLine.on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});
