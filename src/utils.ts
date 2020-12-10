import { promises as fs } from 'fs'

export async function readFileAsString(path: string) {
  return (await fs.readFile(path)).toString('utf8')
}

export function parseListOfNumbers(input: string): number[] {
  return input.split('\n').map((i) => parseInt(i, 10))
}
