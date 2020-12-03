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
        if (row >= this.board.length) throw new Error('THIS IS TOO FAR')
        return this.board[row][containedIndex]
      },
    }
  }
  get length(): number {
    return this.board.length
  }
  getLine(i: number) {
    return this.board[i]
  }
}

type Position = {
  x: number
  y: number
}
export function computeNumberOfTreeInPath(
  map: Day3Map,
  direction: Direction
): number {
  const increment = (position: Position, direction: Direction): Position => ({
    x: position.x + direction.right,
    y: position.y + direction.down,
  })
  let tree = 0
  for (
    let position = { x: 0, y: 0 };
    position.y < map.length;
    position = increment(position, direction)
  ) {
    const treeOrSquare = map.getSquare(position.x).atRow(position.y)
    if (treeOrSquare === '#') {
      tree++
    }
  }
  return tree
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
