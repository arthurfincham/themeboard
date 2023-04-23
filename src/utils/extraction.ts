import { transpile } from 'typescript';
import * as vscode from 'vscode';
import { handleError } from './utils';

export const extractThemeFromFile = async (inputPath: string) => {
  try {
    // Read the contents of the file
    const uriPath = vscode.Uri.file(inputPath);
    const fileContents = await vscode.workspace.fs.readFile(uriPath);
    const fileContentsString = fileContents.toString();
    const transpiled = transpile(fileContentsString, {});
    const themeObject = eval(transpiled);

    return themeObject;
  } catch (error: any) {
    handleError(error.message, inputPath);
    return undefined;
  }
};
