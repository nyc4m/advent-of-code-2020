import { fstat } from 'fs';
import { promises as fs } from 'fs';

type Pair = [number, number];

type Triple = [number, number, number];

export function findPair(numbers: number[], expected: number): Pair {
  const memory = new Map();
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      const a = numbers[i];
      const b = numbers[j];
      const alreadyComputed = memory.get(a) === b;

      if (alreadyComputed) {
        console.log(`Found in ${(i + 1) * (j + 1)} iteration`);

        return [a, b];
      }
      if (a + b === expected) {
        memory.set(b, a);
      }
    }
  }
  return [0, 0];
}

export function findTriple(numbers: number[], expected: number): Triple {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 1; j < numbers.length - 1; j++) {
      for (let k = 2; k < numbers.length - 2; k++) {
        const a = numbers[i];
        const b = numbers[j];
        const c = numbers[k];
        if (a + b + c === expected) {
          return [a, b, c];
        }
      }
    }
  }
  return [0, 0, 0];
}

export function parseList(rawList: string): number[] {
  return rawList
    .split('\n')
    .slice(0, -1)
    .map((n) => parseInt(n, 10));
}

async function part1() {
  const list = (await fs.readFile('./src/day1/input_day1')).toString('utf8');
  const pair = findPair(parseList(list), 2020);
  console.log(`Pair found : ${pair[0]} ${pair[1]} : ${pair[0] * pair[1]}`);
}

async function part2() {
  const list = (await fs.readFile('./src/day1/input_day1')).toString('utf8');
  const pair = findTriple(parseList(list), 2020);
  console.log(`Triple found : ${pair[0]} ${pair[1]} ${pair[2]} : ${pair[0] *pair[1] *pair[2]}`)
}

export const day1 = {
  part1,
  part2,
};
