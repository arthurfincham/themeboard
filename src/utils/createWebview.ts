import * as vscode from 'vscode';
import * as path from 'path';

export const createWebview = (context: vscode.ExtensionContext) => {
  const disposable = vscode.commands.registerCommand(
    'themeBoard.showWebview',
    () => {
      // Create a webview panel
      const panel = vscode.window.createWebviewPanel(
        'myWebview',
        'ThemeBoard',
        vscode.ViewColumn.One,
        {}
      );

      // Get data from the extension context
      const stringyTheme: string =
        context.workspaceState.get('stringifiedTheme')!;
      const data = JSON.parse(stringyTheme);

      const onDiskPath = vscode.Uri.file(
        path.join(context.extensionPath, 'resources', 'theme.css')
      );

      // const styleSrc = vscode.Uri.file(
      //   path.join(context.extensionPath, '/resources/theme.css')
      // ).with({ scheme: 'vscode-resource' });
      // And get the special URI to use with the webview
      const cssURI = panel.webview.asWebviewUri(onDiskPath);

      const getIcon = (item) => {
        if (item.label.includes('size')) {
          return `
  <svg height="30px" width="30px"  xmlns="http://www.w3.org/2000/svg" " 
     viewBox="0 0 396 396" xml:space="preserve">
  <path d="M390,190.762h-47.635v-48.824c0-4.142-3.357-7.5-7.5-7.5h-16.932V46.346c0-5.523-4.478-10-10-10H10c-5.523,0-10,4.477-10,10
    v191.182c0,5.523,4.477,10,10,10h103.467c-1.99,11.434-6.269,30.326-14.881,49.079c-1.422,3.096-1.169,6.703,0.67,9.571
    c1.839,2.868,5.011,4.603,8.418,4.603h70.528v26.272c0,4.142,3.357,7.5,7.5,7.5h107.975v9.101c0,3.313,2.687,6,6,6H390
    c3.314,0,6-2.687,6-6V196.762C396,193.448,393.314,190.762,390,190.762z M178.202,141.938v85.591H20V56.346h277.934v78.091H185.702
    C181.56,134.438,178.202,137.795,178.202,141.938z M293.677,329.553H193.202v-8.709h59.583v0.704c0,4.143,3.357,7.5,7.5,7.5
    c4.143,0,7.5-3.357,7.5-7.5v-0.704h25.892V329.553z M293.677,196.762v109.082H193.202V149.438h134.163v41.324h-27.688
    C296.363,190.762,293.677,193.448,293.677,196.762z M384,347.654h-78.323v-7.065h33.162v0.597c0,3.314,2.686,6,6,6
    c3.313,0,6-2.686,6-6v-0.597H384V347.654z M384,328.588h-78.323V221.827H384V328.588z M384,209.827h-78.323v-7.065H384V209.827z"/>
  </svg>`;
        }
        if (item.label.includes('shadow')) {
          return `<div class="shadow" style='box-shadow:${item.detail};'></div>`;
        }
        return `<span style='background-color:${item.detail};'></span>`;
      };

      const generateCells = () => {
        const arr = [];

        data.forEach((item) => {
          const icon = getIcon(item);
          arr.push(`<div>${icon}<p>${item.label}</p></div>`);
        });
        return arr.join('');
      };

      const themeCells = generateCells();

      const htmlContent = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel='stylesheet' href='${cssURI}' /> 
          <title>ThemeBoard</title>
      </head>
      <body>
      ${themeCells}
      </body>
      </html>`;
      panel.webview.html = htmlContent;
    }
  );

  context.subscriptions.push(disposable);
};
