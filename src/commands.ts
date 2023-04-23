export interface Command {
  commandId: string;
  toggleId: string | null;
  title: string;
  clipboardKey: string | null;
  clipboardCopy: string | null;
}

export const COMMANDS: Command[] = [
  {
    commandId: 'easy-styled-theme.selectVariableValue',
    toggleId: 'styledThemeToggle.selectVariableValue',
    title: 'Variable Value // rgb(255, 255, 255)',
    clipboardKey: 'label',
    clipboardCopy: null,
  },
  {
    commandId: 'easy-styled-theme.selectVariableName',
    toggleId: 'styledThemeToggle.selectVariableName',
    title: 'Variable Name // brandColorWhite',
    clipboardKey: 'label',
    clipboardCopy: null,
  },
  {
    commandId: 'easy-styled-theme.selectWithPropsFunction',
    toggleId: 'styledThemeToggle.selectWithPropsFunction',
    title: 'Props Function // ${(props) => props.theme...',
    clipboardKey: 'label',
    clipboardCopy: `\${(props) => props.theme.<VAR>};`,
  },
  {
    commandId: 'easy-styled-theme.selectWithMediaQueryMaxWidth',
    toggleId: 'styledThemeToggle.selectWithMediaQueryMaxWidth',
    title: 'Media Query max-width // @media only screen and...',
    clipboardKey: 'label',
    clipboardCopy: `@media only screen and (max-width: \${(props) => props.theme.<VAR>}) {}`,
  },
  {
    commandId: 'easy-styled-theme.selectWithMediaQueryMinWidth',
    toggleId: 'styledThemeToggle.selectWithMediaQueryMinWidth',
    title: 'Media Query min-width // @media only screen and...',
    clipboardKey: 'label',
    clipboardCopy: `@media only screen and (min-width: \${(props) => props.theme.<VAR>}) {}`,
  },
];
