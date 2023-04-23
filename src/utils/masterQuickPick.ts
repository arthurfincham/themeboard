import * as vscode from 'vscode';
import { createQuickPick } from './createQuickPick';
import { COMMANDS, Command } from '../commands';

const masterQuickPick = (context: vscode.ExtensionContext) => {
  const quickPickOptions = {
    title: `💅 StyledTheme: Config`,
    placeholder: 'Filter Theme here...',
    matchOnDetail: true,
  };
  const CONFIG = COMMANDS.map((command) => {
    return {
      label: command.title,
      detail: '💅 StyledTheme',
      callback: () =>
        createQuickPick(
          context,
          command.title,
          command.clipboardKey,
          command.clipboardCopy
        ),
    };
  });
  vscode.window
    .showQuickPick(CONFIG, quickPickOptions)
    .then((selectedVariable: any) => {
      if (selectedVariable) {
        selectedVariable.callback();
      }
    });
};

export const createMasterQuickPick = (context: vscode.ExtensionContext) => {
  let newCommand = vscode.commands.registerCommand(
    'easy-styled-theme.createMasterQuickPick',
    () => {
      masterQuickPick(context);
    }
  );
  context.subscriptions.push(newCommand);
};
