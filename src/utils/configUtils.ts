import * as vscode from 'vscode';
import * as path from 'path';
import * as utils from './utils';
import { extractThemeFromFile } from './extraction';

export const createExtensionConfig = (context: vscode.ExtensionContext) => {
  let newCommand = vscode.commands.registerCommand(
    'easy-styled-theme.openConfig',
    () => {
      createConfigQuickPick(context);
    }
  );
  context.subscriptions.push(newCommand);
};

const createConfigQuickPick = (context: vscode.ExtensionContext) => {
  const quickPickOptions = {
    title: `💅 StyledTheme: Config`,
    placeholder: 'Filter Theme here...',
    matchOnDetail: true,
  };
  const CONFIG = [
    {
      label: '🎨 Set Theme',
      detail: 'Select the file which exports your theme',
      callback: () => selectTheme(context),
    },
    {
      label: '♻️ Refresh Theme',
      detail: 'Update your theme after any changes',
      callback: () => refreshTheme(context),
    },
    {
      label: '🗑️ Clear Theme',
      detail: 'Remove existing theme from extension',
      callback: () => clearTheme(context),
    },
  ];
  vscode.window
    .showQuickPick(CONFIG, quickPickOptions)
    .then((selectedVariable: any) => {
      if (selectedVariable) {
        selectedVariable.callback();
      }
    });
};

const selectTheme = (context: vscode.ExtensionContext) => {
  vscode.workspace
    .findFiles('**/*.{ts,js}', '**/node_modules/**')
    .then((files) => {
      const fileItems = files.map((file) => ({
        label: path.basename(file.fsPath),
        detail: file.fsPath,
      }));
      vscode.window
        .showQuickPick(fileItems, { placeHolder: 'Select a file' })
        .then(async (selectedFile) => {
          if (selectedFile) {
            context.workspaceState.update(
              'themeLocationPath',
              selectedFile.detail
            );
            const extractedThemeObject = await extractThemeFromFile(
              selectedFile.detail
            );
            const formattedTheme =
              utils.formatObjectForQuickPick(extractedThemeObject);
            const stringifiedTheme = JSON.stringify(formattedTheme);
            context.workspaceState.update('stringifiedTheme', stringifiedTheme);
          }
        });
    });
};

const refreshTheme = async (context: vscode.ExtensionContext) => {
  try {
    const themePath = context.workspaceState.get('themeLocationPath') as string;
    if (themePath === null) {
      vscode.window.showErrorMessage(
        'Unable to find an existing theme.\nTry selecting a theme first.'
      );
    }
    if (themePath !== null) {
      const extractedThemeObject = await extractThemeFromFile(themePath);
      const formattedTheme =
        utils.formatObjectForQuickPick(extractedThemeObject);
      const stringifiedTheme = JSON.stringify(formattedTheme);
      context.workspaceState.update('stringifiedTheme', stringifiedTheme);
    }
  } catch (err) {
    console.log(err);
  }
};

const clearTheme = (context: vscode.ExtensionContext) => {
  context.workspaceState.update('stringifiedTheme', null)!;
  context.workspaceState.update('themeLocationPath', null)!;
};
