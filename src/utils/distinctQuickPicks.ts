import * as vscode from 'vscode';
import { createQuickPick } from './createQuickPick';
import { COMMANDS, Command } from '../commands';

export const createDistinctQuickPicks = (context: vscode.ExtensionContext) => {
  COMMANDS.map((command) => {
    return createCommand(command, context);
  });
};

const createCommand = (command: Command, context: vscode.ExtensionContext) => {
  const commandToggle = vscode.workspace
    .getConfiguration()
    .get<boolean>(command.toggleId);

  if (commandToggle !== false) {
    let newCommand = vscode.commands.registerCommand(command.commandId, () => {
      createQuickPick(
        context,
        command.title,
        command.clipboardKey,
        command.clipboardCopy
      );
    });
    context.subscriptions.push(newCommand);
  }
};
