import * as Day1 from '../day1'
import { readFileAsString } from '../utils'

const sortNumbers = (numbers: number[]) => numbers.sort((a, b) => a - b)
export function parseNumbers(input: string): number[] {
  return input.split('\n').map((i) => parseInt(i, 10))
}

export function scanNumbers(numbers: number[], windowSize: number): number {
  const sliceOfData = numbers.slice(0, windowSize)
  const numberToCheck = numbers[windowSize]

  const pair = Day1.findPair(sortNumbers(sliceOfData), numberToCheck)

  if (pair[0] !== pair[1]) {
    return scanNumbers(numbers.slice(1), windowSize)
  }
  return numberToCheck
}

class Day9 {
  private _numbers?: Promise<number[]>
  constructor(private input: string) {}
  async part1() {
    const numbers = await this.numbers
    const found = scanNumbers(numbers, 25)
    console.log(`found ${found}`)
  }
  async part2() {
    throw new Error('TODO')
  }
  private get numbers(): Promise<number[]> {
    if (!this._numbers) {
      this._numbers = readFileAsString(this.input).then(
        parseNumbers
      )
    }
    return this._numbers
  }
}

export const day9 = new Day9('./src/day9/input_day9')
