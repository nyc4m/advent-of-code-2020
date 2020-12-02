import { promises as fs } from 'fs';
type PasswordDescription = {
  min: number;
  max: number;
  letter: string;
  password: string;
};
async function part1() {
  const input = (await fs.readFile('./src/day2/input_day2')).toString('utf8');
  const parsed = parseInput(input);
  console.log(parsed);

  const wrongPasswords = findValidPasswords(parsed);
  console.log(`Wrong passwords : ${wrongPasswords}`);
}

export function parseInput(input: string): PasswordDescription[] {
  const parseQuantifier = (
    quantifiers: string
  ): { min: number; max: number } => {
    const splittedString = quantifiers.split('-');
    return { min: +splittedString[0], max: +splittedString[1] };
  };
  return input
    .split('\n')
    .map((line) => line.split(' '))
    .slice(0, -1)
    .map((splittedLine) => ({
      ...parseQuantifier(splittedLine[0]),
      letter: splittedLine[1].charAt(0),
      password: splittedLine[2],
    }));
}

export function findValidPasswords(
  passwordToBeValidated: PasswordDescription[]
): number {
  return passwordToBeValidated.filter((validation) => {
    const countedLetter = validation.password
      .split('')
      .reduce((letterCount, letter) => {
        if (letter === validation.letter) {
          return ++letterCount;
        }
        return letterCount;
      }, 0);
    const maxOk = countedLetter <= validation.max;
    const minOk = countedLetter >= validation.min;

    return minOk && maxOk;
  }).length;
}

function part2() {
  throw new Error('TODO');
}
export const day2 = {
  part1,
  part2,
};
