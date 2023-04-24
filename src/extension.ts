import * as vscode from 'vscode';
import { createExtensionConfig } from './utils/configUtils';
import { createMasterQuickPick } from './utils/masterQuickPick';
import { createDistinctQuickPicks } from './utils/distinctQuickPicks';
import { createWebview } from './utils/createWebview';
export function activate(context: vscode.ExtensionContext) {
  createExtensionConfig(context);
  createMasterQuickPick(context);
  createDistinctQuickPicks(context);
  createWebview(context);
}

export function deactivate() {}
