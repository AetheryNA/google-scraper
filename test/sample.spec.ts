import { expect } from '@jest/globals';

describe('sample test file for CI', () => {
  it('sample test', () => {
    function addition(a: number, b: number) {
      return a + b;
    }

    expect(addition(1, 1)).toBe(2);
  });
});
