import { parseListOfNumbers, readFileAsString } from '../utils'

type JoltRepartition = {
  oneJolt: number
  threeJolt: number
}

export function computeJoltageRepartition(
  adaptorJoltages: number[]
): JoltRepartition {
  const sortedVoltage = adaptorJoltages.sort((a, b) => a - b)
  sortedVoltage.unshift(0)
  sortedVoltage.push(sortedVoltage[sortedVoltage.length - 1] + 3)
  return sortedVoltage.reduce(
    (repartition, jolt, index, joltages) => {
      const nextJoltage = joltages[index + 1]
      if (!nextJoltage) return repartition
      switch (nextJoltage - jolt) {
        case 3:
          return { ...repartition, threeJolt: repartition.threeJolt + 1 }
        case 1:
          return { ...repartition, oneJolt: repartition.oneJolt + 1 }
        default:
          return repartition
      }
    },
    { oneJolt: 0, threeJolt: 0 }
  )
}

class Day10 {
  constructor(private inputPath: string) {}
  async part1() {
    const repartition = computeJoltageRepartition(await this.numbers)
    console.table(
        {...repartition, computed: repartition.oneJolt*repartition.threeJolt}
    )
  }
  async part2() {
    throw new Error('TODO')
  }

  private get numbers(): Promise<number[]> {
    const input = readFileAsString(this.inputPath)
    const numbers = input.then(parseListOfNumbers)
    return numbers
  }
}

export const day10 = new Day10('./src/day10/input_day10')
