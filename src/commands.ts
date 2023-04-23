export interface Command {
  commandId: string;
  toggleId: string | null;
  title: string;
  clipboardKey: string | null;
  clipboardCopy: string | null;
}

export const COMMANDS: Command[] = [
  {
    commandId: 'themeboard.selectVariableValue',
    toggleId: 'themeBoardToggle.selectVariableValue',
    title: 'Variable Value // rgb(255, 255, 255)',
    clipboardKey: 'label',
    clipboardCopy: null,
  },
  {
    commandId: 'themeboard.selectVariableName',
    toggleId: 'themeBoardToggle.selectVariableName',
    title: 'Variable Name // brandColorWhite',
    clipboardKey: 'label',
    clipboardCopy: null,
  },
  {
    commandId: 'themeboard.selectWithPropsFunction',
    toggleId: 'themeBoardToggle.selectWithPropsFunction',
    title: 'Props Function // ${(props) => props.theme...',
    clipboardKey: 'label',
    clipboardCopy: `\${(props) => props.theme.<VAR>};`,
  },
  {
    commandId: 'themeboard.selectWithMediaQueryMaxWidth',
    toggleId: 'themeBoardToggle.selectWithMediaQueryMaxWidth',
    title: 'Media Query max-width // @media only screen and...',
    clipboardKey: 'label',
    clipboardCopy: `@media only screen and (max-width: \${(props) => props.theme.<VAR>}) {}`,
  },
  {
    commandId: 'themeboard.selectWithMediaQueryMinWidth',
    toggleId: 'themeBoardToggle.selectWithMediaQueryMinWidth',
    title: 'Media Query min-width // @media only screen and...',
    clipboardKey: 'label',
    clipboardCopy: `@media only screen and (min-width: \${(props) => props.theme.<VAR>}) {}`,
  },
];
