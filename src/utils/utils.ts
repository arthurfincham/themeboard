import * as vscode from 'vscode';

export const flattenObject = (obj: {}) => {
  var toReturn = {};
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) {
      continue;
    }
    if (typeof obj[i] === 'object' && obj[i] !== null) {
      var flatObject = flattenObject(obj[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) {
          continue;
        }
        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = obj[i];
    }
  }
  return toReturn;
};

export const getThemeVariables = (
  context: vscode.ExtensionContext
): vscode.QuickPickItem[] => {
  const stringyTheme: string = context.workspaceState.get('stringifiedTheme')!;
  const themeVariables = JSON.parse(stringyTheme);
  if (typeof stringyTheme !== 'string') {
    vscode.window.showInformationMessage(
      `💅 We can't find a theme. Try Config > Set theme!`
    );
    return;
  }
  return themeVariables;
};

export const handleError = (errMessage: string, errContext: string) => {
  console.error(`Error reading ${errContext} : ${errMessage}`);
  vscode.window.showInformationMessage(
    `Error reading ${context} : ${errMessage}`
  );
};

export const formatObjectForQuickPick = (object): vscode.QuickPickItem[] => {
  const flattentedThemeObject = flattenObject(object);
  const quickPickItems = Object.entries(flattentedThemeObject).map((item) => {
    const key = item[0];
    const val = item[1] as string;
    const quickPickItem: vscode.QuickPickItem = {
      label: key,
      detail: val,
    };
    return quickPickItem;
  });
  return quickPickItems;
};
