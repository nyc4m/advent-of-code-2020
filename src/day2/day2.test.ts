import { parseInput, findValidPasswords } from '.';

const sample = '1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc\n';

const parsedPasswords = [
  {
    min: 1,
    max: 3,
    letter: 'a',
    password: 'abcde',
  },
  {
    min: 1,
    max: 3,
    letter: 'b',
    password: 'cdefg',
  },
  {
    min: 2,
    max: 9,
    letter: 'c',
    password: 'ccccccccc',
  },
];
describe('day 2', () => {
  it('should parse the lines', () => {
    const parsedLine = parseInput(sample);
    expect(parsedLine).toEqual(parsedPasswords);
  });
  it('should find one wrong line', () => {
    expect(findValidPasswords(parsedPasswords)).toBe(2);
  });
});
