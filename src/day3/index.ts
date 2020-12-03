import { readFileAsString } from '../utils'

export interface Direction {
  down: number
  right: number
}
export class Day3Map {
  get boardWidth(): number {
    return this.board[0].length
  }
  constructor(private board: Array<string>) {}
  static fromInput(input: string): Day3Map {
    return new Day3Map(input.split('\n').slice(0, -1))
  }

  getSquare(col: number) {
    const containedIndex = col % this.boardWidth
    return {
      atRow: (row: number) => {
        return this.board[row][containedIndex]
      },
    }
  }
  get length(): number {
    return this.board.length
  }
}

type Position = {
  x: number
  y: number
}
export function computeNumberOfTreeInPath(
  map: Day3Map,
  direction: Direction,
  position: Position = { x: 0, y: 0 },
  trees = 0
): number {
  if (position.y >= map.length) {
    return trees
  }
  const foundTree = map.getSquare(position.x).atRow(position.y) === '#'
  return computeNumberOfTreeInPath(
    map,
    direction,
    { x: position.x + direction.right, y: position.y + direction.down },
    foundTree ? trees + 1 : trees
  )
}

async function part1() {
  const input = readFileAsString('./src/day3/input_day3')
  const map = Day3Map.fromInput(await input)
  const trees = computeNumberOfTreeInPath(map, { right: 3, down: 1 })
  console.log(`Saw ${trees} trees`)
}

async function part2() {
  const directions: Direction[] = [
    {
      right: 1,
      down: 1,
    },
    {
      right: 3,
      down: 1,
    },
    {
      right: 5,
      down: 1,
    },
    {
      right: 7,
      down: 1,
    },
    {
      right: 1,
      down: 2,
    },
  ]
  const input = readFileAsString('./src/day3/input_day3')
  const map = Day3Map.fromInput(await input)
  const trees = directions
    .map((direction) => computeNumberOfTreeInPath(map, direction))
    .reduce((acc, trees) => acc * trees, 1)
  console.log(`Saw ${trees} trees`)
}

export const day3 = {
  part1,
  part2,
}
