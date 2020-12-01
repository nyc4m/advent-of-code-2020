import { fstat } from 'fs';
import { promises as fs } from 'fs';

type Pair = [number, number];

type Triple = [number, number, number];

export function findPair(sortedNumbers: number[], expected: number): Pair {
  const first = sortedNumbers[0]
  const last = sortedNumbers[sortedNumbers.length-1]
  const sum = first+last
  if(sum === expected) {
    return [first, last]
  }
  if(sum > expected) {
    return findPair(sortedNumbers.slice(0, -1), expected)
  }
  if(sum < expected) {
    return findPair(sortedNumbers.slice(1), expected)
  }
 return [0, 0]
}

export function findTriple(numbers: number[], expected: number): Triple {
  const findFoundValue = (array: number[]) => array[0] && array[1] && array[2]
  const res = numbers.map(a => [a, ...findPair(numbers, expected-a)]).find(findFoundValue) as Triple
  return res ? res : [0, 0, 0];
}

export function parseList(rawList: string): number[] {
  return rawList
    .split('\n')
    .slice(0, -1)
    .map((n) => parseInt(n, 10));
}

const ascSort = (a: number, b: number) => a-b

export function parseListAndSort(rawList: string): number[] {
  return parseList(rawList).sort(ascSort)
}

async function part1() {
  const list = (await fs.readFile('./src/day1/input_day1')).toString('utf8');
  const pair = findPair(parseListAndSort(list), 2020);
  console.log(`Pair found : ${pair[0]} ${pair[1]} : ${pair[0] * pair[1]}`);
}

async function part2() {
  const list = (await fs.readFile('./src/day1/input_day1')).toString('utf8');
  const pair = findTriple(parseListAndSort(list), 2020);
  console.log(`Triple found : ${pair[0]} ${pair[1]} ${pair[2]} : ${pair[0] *pair[1] *pair[2]}`)
}

export const day1 = {
  part1,
  part2,
};
