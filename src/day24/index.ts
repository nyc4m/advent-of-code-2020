import { readFileAsString } from '../utils'

export type Direction = 'e' | 'w' | 'se' | 'sw' | 'nw' | 'ne'
type Color = 'Black' | 'White'
export function* getDirections(input: string): IterableIterator<Direction> {
  let p = 0
  while (p < input.length) {
    const char1 = input.charAt(p)
    const char2 = input.charAt(p + 1)
    if (['e', 'w'].includes(char1)) {
      yield char1 as Direction
      p++
      continue
    }
    yield (char1 + char2) as Direction
    p += 2
  }
}

export function followPath(
  directions: IterableIterator<Direction>
): Record<'x' | 'y', number> {
  let x = 0
  let y = 0
  for (let direction of directions) {
    switch (direction) {
      case 'e':
        x++
        continue
      case 'w':
        x--
        continue
      case 'ne':
        x += 0.5
        y++
        continue
      case 'se':
        x += 0.5
        y--
        continue
      case 'sw':
        x -= 0.5
        y--
        continue
      case 'nw':
        x -= 0.5
        y++
        continue
    }
  }
  return { x, y }
}

export function countBlackAndWhite(
  memory: Map<string, Color>
): { white: number; black: number } {
  let black = 0
  let white = 0
  for (let [_, value] of memory) {
    if (value === 'Black') {
      black++
      continue
    }
    white++
  }
  return { black, white }
}

export function countNumberOfBlackTiles(input: string): number {
  const memory = new Map<string, Color>()
  for (let line of input.split('\n')) {
    const coord = followPath(getDirections(line))
    const key = `${coord.x};${coord.y}`
    const setColor = memory.get(key) || 'White'
    memory.set(key, setColor === 'White' ? 'Black' : 'White')
  }
  const count = countBlackAndWhite(memory)
  return count.black
}

export async function part1() {
  const input = await readFileAsString('./src/day24/input_day24')
  console.log(`black tiles: ${countNumberOfBlackTiles(input)}`)
}
export async function part2() {
  throw new Error('TODO')
}

export const day24 = {
  part1,
  part2,
}
