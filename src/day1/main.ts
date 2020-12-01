import { fstat } from "fs";
import {promises as fs} from 'fs'

type Pair = [number, number]

type Triple = [number, number, number]

export function findTwople(numbers: number[]): Pair {
  const memory = new Map();
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      const a = numbers[i]
      const b = numbers[j]
      const alreadyComputed =
        memory.get(a) === b
        
      if (alreadyComputed) {
        console.log(`Found in ${(i+1)*(j+1)} iteration`);
        
        return [a, b];
      }
      if(a+b === 2020) {
        memory.set(b, a);
      }

    }
  }
  return [0, 0];

}

export function findThreeple(numbers: number[]): Triple {
  return [0, 0, 0]
}

export function parseList(rawList: string): number[] {
  return rawList
    .split("\n")
    .slice(0, -1)
    .map((n) => parseInt(n, 10));
}

export async function day1() {
  const list = (await fs.readFile("./src/day1/input_day1")).toString('utf8')
  const pair = findTwople(parseList(list))
  console.log(`Pair found : ${pair[0]} ${pair[1]} : ${pair[0]*pair[1]}`);
}
