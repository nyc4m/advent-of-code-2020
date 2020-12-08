import { isParenthesizedTypeNode } from 'typescript'
import { readFileAsString } from '../utils'

type OpType = 'acc' | 'jmp' | 'nop'

export type Operation = {
  type: OpType
  value: number
}

export function parseOperations(input: string): Operation[] {
  return input.split('\n').map((line) => {
    const matches = line.match(/(nop|acc|jmp) ([-+]\d*)/)
    if (!matches) {
      throw new Error(`Line is not parsable ${line}`)
    }
    return { type: matches[1] as OpType, value: parseInt(matches[2], 10) }
  })
}

export class Computer {
  private readonly alreadyExecuted = new Set<number>()
  private counter = 0
  constructor(private operations: Operation[]) {}
  runFromPosition(
    start: number,
    lastOp: number = 0
  ): { res: number; loop: boolean } {
    if (this.alreadyExecuted.has(start)) {
      console.log(
        'loop detected with op: ',
        this.operations[lastOp],
        `at index: ${lastOp}`
      )
      return { loop: true, res: this.counter }
    }
    this.alreadyExecuted.add(start)
    if (this.operations.length === 0) return { res: this.counter, loop: false }
    const { type, value } = this.operations[start]
    switch (type) {
      case 'acc':
        this.counter += value
        return this.runFromPosition(start + 1, start)
      case 'jmp':
        return this.runFromPosition(start + value, start)
      case 'nop':
        return this.runFromPosition(start + 1, start)
    }
  }
}

async function part1() {
  const input = readFileAsString('./src/day8/input_day8')
  const operations = parseOperations(await input)
  const computer = new Computer(operations)
  console.log(`counter is ${computer.runFromPosition(0)}`)
}

export const day8 = {
  part1,
  part2: () => {
    throw new Error('TODO')
  },
}
