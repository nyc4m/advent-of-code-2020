import { readFileAsString } from '../utils'
import { List, Set } from 'immutable'

export type PositionType = 'L' | '#' | '.' | 'W'
export type Coordinate = { y: number; x: number }

export type Square = { type: PositionType } & Coordinate

export function parsePositions(input: string): Set<Square> {
  const lines = input.split('\n')
  const squares = lines.map((line, lineIndex) =>
    line.split('').map((pos, posIndex) => {
      return { type: pos, x: posIndex, y: lineIndex }
    })
  )
  return Set().withMutations((s) => {
    squares.forEach((line) => line.forEach((seat) => s.add(seat)))
  })
}

export function findNeighbors(
  { x, y }: Coordinate,
  state: Set<Square>
): List<Square> {
  return state
    .filter(
      (s) =>
        (s.x === x - 1 && s.y === y) ||
        (s.x === x + 1 && s.y === y) ||
        (s.y === y + 1 && s.x === x) ||
        (s.y === y - 1 && s.x === x) ||
        (s.y === y - 1 && s.x === x - 1) ||
        (s.y === y - 1 && s.x === x + 1) ||
        (s.y === y + 1 && s.x === x - 1) ||
        (s.y === y + 1 && s.x === x + 1)
    )
    .toList()
}

export function renderNewState(state: Set<Square>): Set<Square> {
  return state.map((s) => {
    const { x, y, type } = s
    const neighbours = findNeighbors({ x, y }, state)
    const occupied = neighbours.filter((s) => s.type !== '#')
    switch (type) {
      case '#':
        return occupied.size >= 4 ? { ...s, type: 'L' } : { ...s, type: '#' }
      case 'L':
        return occupied.size > 1 ? { ...s } : { ...s, type: '#' }
      default:
        return s
    }
  })
}

export function runUntilNobodyMoveFromTheirDamnSeats(
  state: Set<Square>
): Set<Square> {
  let oldState = state
  let nextState = renderNewState(state)
  while (!nextState.equals(oldState)) {
    oldState = nextState
    nextState = renderNewState(oldState)
  }
  return nextState
}

class Day11 {
  constructor(private inputPath: string) {}

  async part1() {
    const lastRender = runUntilNobodyMoveFromTheirDamnSeats(
      await this.positions
    )
    console.log(`seats: ${lastRender.filter((s) => s.type === '#').size}`)
  }

  async part2() {
    throw new Error('TODO')
  }

  get positions(): Promise<Set<Square>> {
    return readFileAsString(this.inputPath).then(parsePositions)
  }
}

export const day11 = new Day11('./src/day11/input_day11')
