import { parseListOfNumbers, readFileAsString } from '../utils'
import { promises as fs } from 'fs'

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

export function computeNumberOfAdaptorsArrangement(
  joltages: number[],
  memoizedComputation: Map<number, number>
): number {
  if (joltages.length === 1) {
    return 1
  }
  const [first, ...restOfJoltages] = joltages
  if (memoizedComputation.has(first)) {
    return memoizedComputation.get(first)!
  }
  const compatibleAdaptors = restOfJoltages.filter((j) => j - first <= 3)
  compatibleAdaptors.forEach((adaptor) => {
    const joltagesSlice = restOfJoltages.slice(restOfJoltages.indexOf(adaptor))
    return memoizedComputation.set(adaptor, computeNumberOfAdaptorsArrangement(joltagesSlice, memoizedComputation))
  })
  const computedValue =  compatibleAdaptors.reduce((sum, val )=> sum+memoizedComputation.get(val)!!, 0)
  memoizedComputation.set(first, computedValue)
  
  return computedValue
}

class Day10 {
  constructor(private inputPath: string) {}
  async part1() {
    const repartition = computeJoltageRepartition(await this.numbers)
    console.table({
      ...repartition,
      computed: repartition.oneJolt * repartition.threeJolt,
    })
  }
  async part2() {
    const numbers = await this.numbers
    const max = Math.max(...numbers)+3
    const joltages = [0, ...numbers, max].sort(
      (a, b) => a - b
    )
    const numberOfArrangement = computeNumberOfAdaptorsArrangement(
      joltages,
      new Map()
    )
    console.log(`number of arrangement: ${numberOfArrangement}`)
  }

  private get numbers(): Promise<number[]> {
    const input = readFileAsString(this.inputPath)
    const numbers = input.then(parseListOfNumbers)
    return numbers
  }
}

export const day10 = new Day10('./src/day10/input_day10')
