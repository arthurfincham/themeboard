import * as assert from 'assert';
import { extractThemeFromFile } from '../../utils/extraction';
import * as path from 'path';

suite('Extract Theme From File Test Suite', () => {
  test('should return the theme object from a JavaScript file', async () => {
    const filePath = path.resolve(__dirname, './sampleData/sampleTheme.js');
    const themeObject = await extractThemeFromFile(filePath);

    assert.deepStrictEqual(themeObject, {
      colors: {
        primary: '#FF0000',
        secondary: '#00FF00',
      },
      fonts: {
        body: 'Arial, sans-serif',
        heading: 'Helvetica, sans-serif',
      },
    });
  });

  // test('should handle errors and return undefined', async () => {
  //   const filePath = './test/nonexistentFile.js';
  //   const themeObject = await extractThemeFromFile(filePath);

  //   assert.strictEqual(themeObject, undefined);
  // });
});
