/* eslint-disable @typescript-eslint/naming-convention */
import * as assert from 'assert';
import { flattenObject, formatObjectForQuickPick } from '../../utils/utils';

suite('Flatten Object Test Suite', () => {
  test('should flatten a nested object', () => {
    const nestedObject = {
      name: 'Alice',
      age: 30,
      contact: {
        email: 'alice@example.com',
        phone: '555-1234',
      },
    };

    const flattenedObject = flattenObject(nestedObject);

    assert.deepStrictEqual(flattenedObject, {
      name: 'Alice',
      age: 30,
      'contact.email': 'alice@example.com',
      'contact.phone': '555-1234',
    });
  });

  test('should return an empty object for an empty object', () => {
    const emptyObject = {};

    const flattenedObject = flattenObject(emptyObject);

    assert.deepStrictEqual(flattenedObject, {});
  });

  test('should return the same object if already flat', () => {
    const flatObject = {
      name: 'Alice',
      age: 30,
      'contact.email': 'alice@example.com',
      'contact.phone': '555-1234',
    };

    const flattenedObject = flattenObject(flatObject);

    assert.deepStrictEqual(flattenedObject, flatObject);
  });
});

suite('Get Object Array Test Suite', () => {
  test('should return an array of objects for a flattened object', () => {
    const flattenedObject = {
      name: 'Alice',
      age: 30,
      'contact.email': 'alice@example.com',
      'contact.phone': '555-1234',
    };

    const objectArray = formatObjectForQuickPick(flattenedObject);

    assert.deepStrictEqual(objectArray, [
      { label: 'name', detail: 'Alice' },
      { label: 'age', detail: 30 },
      { label: 'contact.email', detail: 'alice@example.com' },
      { label: 'contact.phone', detail: '555-1234' },
    ]);
  });

  test('should return an empty array for an empty object', () => {
    const emptyObject = {};

    const objectArray = formatObjectForQuickPick(emptyObject);

    assert.deepStrictEqual(objectArray, []);
  });

  test('should return an array with one object for a flat object', () => {
    const flatObject = {
      name: 'Alice',
      age: 30,
    };

    const objectArray = formatObjectForQuickPick(flatObject);

    assert.deepStrictEqual(objectArray, [
      { label: 'name', detail: 'Alice' },
      { label: 'age', detail: 30 },
    ]);
  });
});
