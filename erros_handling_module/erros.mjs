import { makePromtMessage } from '../index.mjs';

export function errorCommon() {
  console.log("Invalid input. Command doesn't exist");
  makePromtMessage();
}
export function errorPrefix() {
  console.log("Invalid input. Command prefix doesn't exist");
  makePromtMessage();
}
export function errorMissedFolderName() {
  console.log('Invalid input. Missed directory name');
  makePromtMessage();
}
export function errorMissedFileName() {
  console.log('Invalid input. Missed file name');
  makePromtMessage();
}

export function errorPath() {
  console.log('Invalid input: directory does not exist.');
  makePromtMessage();
}

export function errorNotContent() {
  console.log('Directory has no files and folders');
  makePromtMessage();
}

export function errorFileNotExist(file) {
  console.log(`FS operation failed: File ${file} doesn't exist`);
  makePromtMessage();
}

export function errorDirectoryNotExist(directory) {
  console.log(`FS operation failed: Directory ${directory} doesn't exist`);
  makePromtMessage();
}
export function errorFileAlreadyExist(file) {
  console.log(
    `FS operation failed: File ${file} already exist in current directory`
  );
  makePromtMessage();
}

export function errorDirectoryAlreadyExist(directory) {
  console.log(
    `FS operation failed: Destination ${directory} already exist in current directory`
  );
  makePromtMessage();
}

export function errorDestinationFileNotExist() {
  console.log(`FS operation failed: Proper name of file} undefined`);
  makePromtMessage();
}

export function errorSourceFileNotExist() {
  console.log(`FS operation failed: Wrong name of file undefined`);
  makePromtMessage();
}

export function errorCopyFileNotExist() {
  console.log(`FS operation failed: Name of copy file undefined`);
  makePromtMessage();
}

export function errorNewDirectoryNotExist() {
  console.log(`FS operation failed: Name of directory to copy undefined`);
  makePromtMessage();
}

export function errorMoveFileNotExist() {
  console.log(`FS operation failed: Name of move file undefined`);
  makePromtMessage();
}

export function errorMoveDirectoryNotExist() {
  console.log(`FS operation failed: Name of directory to move undefined`);
  makePromtMessage();
}

export function errorOfReadingFile(error) {
  console.error('Error reading file:', error);
  makePromtMessage();
}

export function errorOfWritingFile(error) {
  console.error('Error writing file:', error);
  makePromtMessage();
}

export function errorOfCreatingDirectory(error) {
  console.error('Error creating directory:', error);
  makePromtMessage();
}

export function errorOfDeletingFile(error) {
  console.error('Error deleting source file:', error);
  makePromtMessage();
}

export function errorCompressFileNotExist() {
  console.log(`FS operation failed: Compress name of file undefined`);
  makePromtMessage();
}

export function errorOutFileNotExist() {
  console.log(`FS operation failed: Name of out file undefined`);
  makePromtMessage();
}
export function errorOutFileAlredyExist(file) {
  console.log(`FS operation failed: File out ${file} already exist in current directory`);
  makePromtMessage();
}

export function errorOfCompressionFile(error) {
  console.error('Error compressing file:', error);
  makePromtMessage();
}
