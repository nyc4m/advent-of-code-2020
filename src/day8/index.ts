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
  private alreadyExecuted = new Set<number>()
  private counter = 0
  constructor(private operations: Operation[]) {}
  reset() {
    this.counter = 0
    this.alreadyExecuted = new Set<number>()
  }
  runFromPosition(
    start: number,
    lastOp: number = 0
  ): { res: number; loop: boolean } {
    if (this.alreadyExecuted.has(start)) {
      return { loop: true, res: this.counter }
    }
    this.alreadyExecuted.add(start)
    if (this.operations.length === 0) return { res: this.counter, loop: false }
    if (!this.operations[start]) return { res: this.counter, loop: false }
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
  get suspectLines(): Operation[] {
    return this.operations.filter(
      (op) => op.type === 'jmp' || op.type === 'nop'
    )
  }
}

function fixError(
  computer: Computer,
  suspectedLines: Operation[]
): { res: number; loop: boolean } {
  const [line] = suspectedLines
  const switchLineType = (line: string) => (line === 'nop' ? 'jmp' : 'nop')
  line.type = switchLineType(line.type)
  const execution = computer.runFromPosition(0)
  if (execution.loop) {
    computer.reset()
    line.type = switchLineType(line.type)
    return fixError(computer, suspectedLines.slice(1))
  }
  return execution
}

async function part1() {
  const input = readFileAsString('./src/day8/input_day8')
  const operations = parseOperations(await input)
  const computer = new Computer(operations)
  console.log(`counter is ${computer.runFromPosition(0)}`)
}

async function part2() {
  const input = readFileAsString('./src/day8/input_day8')
  const operations = parseOperations(await input)
  const computer = new Computer(operations)
  fixError(computer, computer.suspectLines)
  console.log(`counter is ${computer.runFromPosition(0).res}`)
}

export const day8 = {
  part1,
  part2,
}
