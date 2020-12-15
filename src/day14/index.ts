import { List, Record, Map } from 'immutable'
import { readFileAsString } from '../utils'

export function executeInstructions(
  instructions: List<string>,
  mask: string,
  memory: Map<string, number>
): Map<string, number> {
  const instruction = instructions.get(0)
  if (!instruction) {
    return memory
  }
  if (/mask/.test(instruction)) {
    const match = instruction.match(/= (?<mask>[01X]*)/)
    const { mask: foundMask } = match?.groups || {}

    return executeInstructions(instructions.slice(1), foundMask, memory)
  }
  if (/mem/.test(instruction)) {
    const match = instruction.match(/mem\[(?<address>\d*)\] = (?<value>\d*)/)
    const { address, value } = match?.groups || {}
    const maskedValue = applyMask(
      mask,
      leftPad(parseInt(value).toString(2), mask.length)
    )
    return executeInstructions(
      instructions.slice(1),
      mask,
      memory.set(address, parseInt(maskedValue, 2))
    )
  }

  return memory
}

function leftPad(value: string, length: number): string {
  if (value.length === length) {
    return value
  }
  return leftPad(`0${value}`, length)
}

function applyMask(mask: string, value: string): string {
  if (!(mask.length || value.length)) {
    return ''
  }
  const masked = mask[0] === 'X' ? value[0] : mask[0] === '1' ? 1 : 0
  return masked + applyMask(mask.slice(1), value.slice(1))
}

async function part1() {
  const instructions = (
    await readFileAsString('./src/day14/input_day14')
  ).split('\n')
  const memory = executeInstructions(List(instructions), '', Map())
  console.log(memory.reduce((acc, v) => v + acc, 0))
}

async function part2() {
  throw new Error('TODO')
}

export const day14 = {
  part1,
  part2,
}
