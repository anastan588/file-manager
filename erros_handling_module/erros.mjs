import { makePromtMessage } from '../index.mjs';

export function errorCommon() {
  console.log("Invalid input. Command doesn't exist");
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

export function errorFileAlreadyExist(file) {
  console.log(
    `FS operation failed: File ${file} already exist in current directory`
  );
  makePromtMessage();
}

export function errorDestinationFileNotExist(file) {
  console.log(`FS operation failed: Proper name of ${file} uderfined`);
  makePromtMessage();
}

export function errorSourceFileNotExist(file) {
  console.log(`FS operation failed: Wrong name of ${file} uderfined`);
  makePromtMessage();
}
