import * as Day1 from '../day1'
import { parseListOfNumbers, readFileAsString } from '../utils'

const sortNumbers = (numbers: number[]) => numbers.sort((a, b) => a - b)

export function scanNumbers(numbers: number[], windowSize: number): number {
  const sliceOfData = numbers.slice(0, windowSize)
  const numberToCheck = numbers[windowSize]

  const pair = Day1.findPair(sortNumbers(sliceOfData), numberToCheck)

  if (pair[0] !== pair[1]) {
    return scanNumbers(numbers.slice(1), windowSize)
  }
  return numberToCheck
}

export function findContiguousSetOfNumbers(
  numbers: number[],
  expectedSum: number
): number[] {
  const sumSequence = (n: number[]) => n.reduce((sum, i) => sum + i, 0)
  const sequenceToSum = [] as number[]
  let counter = 0
  while (
    sumSequence(sequenceToSum) !== expectedSum &&
    counter < numbers.length
  ) {
    if (sumSequence(sequenceToSum) > expectedSum) {
      sequenceToSum.shift()
      continue
    }
    sequenceToSum.push(numbers[counter])
    counter++
  }
  return sequenceToSum
}

class Day9 {
  private _numbers?: Promise<number[]>
  constructor(private input: string) {}
  async part1() {
    const { numbers } = this
    const found = scanNumbers(await numbers, 25)
    console.log(`found ${found}`)
  }
  async part2() {
    const { numbers } = this
    const found = scanNumbers(await numbers, 25)
    const foundSequence = findContiguousSetOfNumbers(await numbers, found)
    console.log(`found sequence [${foundSequence}]`)
    const max = Math.max(...foundSequence)
    const min = Math.min(...foundSequence)
    console.log(`min: ${min}\nmax: ${max}\nencryption weakness: ${max + min}`)
  }
  private get numbers(): Promise<number[]> {
    if (!this._numbers) {
      this._numbers = readFileAsString(this.input).then(parseListOfNumbers)
    }
    return this._numbers
  }
}

export const day9 = new Day9('./src/day9/input_day9')
