import { readFileSync } from 'fs';

export const convertHtmlToString = () => {
  const file = readFileSync('./test/fixtures/googlePage_hosting.html');

  return file.toString();
};
