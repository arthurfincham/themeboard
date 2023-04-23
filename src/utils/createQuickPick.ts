import * as vscode from 'vscode';
import { getThemeVariables } from './utils';

const defaultQuickPickOptions = {
  placeholder: 'Filter Theme here...',
  matchOnDetail: true,
};

interface Props {
  context;
  title: string;
  copyProperty: string;
  copyString: string;
}

export const createQuickPick = (
  context,
  title,
  copyProperty,
  copyString = '<VAR>'
): any => {
  const themeVariables = getThemeVariables(context);
  const quickPickOptions = {
    title: `💅 StyledTheme: ${title}`,
    ...defaultQuickPickOptions,
  };
  vscode.window
    .showQuickPick(themeVariables, quickPickOptions)
    .then((selectedVariable: any) => {
      if (selectedVariable) {
        const copy = copyString.replace(
          '<VAR>',
          selectedVariable[copyProperty]
        );
        vscode.env.clipboard.writeText(copy);
      }
    });
};
