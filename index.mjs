import * as readline from 'readline';
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
  readLine.prompt();

  if (input.trim() === '.exit') {
    readLine.close();
  }
});

readLine.on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});
