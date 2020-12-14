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
    const match = instruction.match(/= (?<mask>\d*)/)
    if (!match?.groups?.mask) throw new Error('No value for mask')
    console.log(`mask: ${match.groups.mask}`);
    
    return executeInstructions(
      instructions.slice(1),
      match?.groups.mask,
      memory
    )
  }
  if (/mem/.test(instruction)) {
    const match = instruction.match(/mem\[(?<address>\d*)\]=(?<value>\d*)/)
    const { address, value } = match?.groups || {}
    console.log(`${address} : ${value}`);
    
  }

  return memory
}

async function part1() {
    const instructions = (await readFileAsString('./src/day14/input_day14')).split('\n')
    const memory = executeInstructions(List(instructions), "", Map())
}

async function part2() {
  throw new Error('TODO')
}

export const day14 = {
  part1,
  part2,
}
