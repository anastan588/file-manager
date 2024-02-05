import { getCurrentDirectory, makePromtMessage } from '../index.mjs';

export function errorCommon() {
  console.log("Invalid input. Command doesn't exist");
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorExtra() {
  console.log('Invalid input. There are extra characters in the command.');
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorNameOfFile() {
  console.log('Invalid input. Invalid name of file. File extension is required');
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorNameOfFolder() {
  console.log('Invalid input. Invalid name of folder');
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorPrefix() {
  console.log("Invalid input. Command prefix doesn't exist");
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}
export function errorMissedFolderName() {
  console.log('Invalid input. Missed directory name');
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}
export function errorMissedFileName() {
  console.log('Invalid input. Missed file name');
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorPath() {
  console.log('Invalid input: directory does not exist.');
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorNotContent() {
  console.log('Directory has no files and folders');
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorFileNotExist(file) {
  console.log(`FS operation failed: File ${file} doesn't exist`);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorDirectoryNotExist(directory) {
  console.log(`FS operation failed: Directory ${directory} doesn't exist`);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}
export function errorFileAlreadyExist(file) {
  console.log(
    `FS operation failed: File ${file} already exist in current directory`
  );
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorDirectoryAlreadyExist(directory) {
  console.log(
    `FS operation failed: Destination ${directory} already exist in current directory`
  );
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorDestinationFileNotExist() {
  console.log(`FS operation failed: Proper name of file} undefined`);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorSourceFileNotExist() {
  console.log(`FS operation failed: Wrong name of file undefined`);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorCopyFileNotExist() {
  console.log(`FS operation failed: Name of copy file undefined`);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorNewDirectoryNotExist() {
  console.log(`FS operation failed: Name of directory to copy undefined`);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorMoveFileNotExist() {
  console.log(`FS operation failed: Name of move file undefined`);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorMoveDirectoryNotExist() {
  console.log(`FS operation failed: Name of directory to move undefined`);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorOfReadingFile(error) {
  console.error('Error reading file:', error);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorOfWritingFile(error) {
  console.error('Error writing file:', error);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorOfCreatingDirectory(error) {
  console.error('Error creating directory:', error);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorOfDeletingFile(error) {
  console.error('Error deleting source file:', error);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorCompressFileNotExist() {
  console.log(`FS operation failed: Compress name of file undefined`);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorOutFileNotExist() {
  console.log(`FS operation failed: Name of out file undefined`);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}
export function errorOutFileAlredyExist(file) {
  console.log(
    `FS operation failed: File out ${file} already exist in current directory`
  );
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorOfCompressionFile(error) {
  console.error('Error compressing file:', error);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorDeCompressFileNotExist() {
  console.log(`FS operation failed: Decompress name of file undefined`);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}

export function errorOfDeCompressionFile(error) {
  console.error('Error decompressing file:', error);
  console.log(`You are currently in ${getCurrentDirectory()}`);
  makePromtMessage();
}
