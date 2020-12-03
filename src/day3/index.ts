import { readFileAsString } from '../utils';

export interface Direction {
  down: number;
  right: number;
}
export class Day3Map {
  get boardWidth(): number {
    return this.board[0].length;
  }
  constructor(private board: Array<string>) {}
  static fromInput(input: string): Day3Map {
    return new Day3Map(input.split('\n').slice(0, -1));
  }

  getSquare(col: number) {
    const containedIndex = col % this.boardWidth;
    return {
      atRow: (row: number) => {
        if (row >= this.board.length) throw new Error('THIS IS TOO FAR');
        return this.board[row][containedIndex];
      },
    };
  }
  get length(): number {
    return this.board.length;
  }
}

export function computeNumberOfTreeInPath(
  map: Day3Map,
  direction: Direction
): number {
  const position = { y: 0, x: 0 };
  let tree = 0;
  for (position.y = 1; position.y < map.length; position.y += direction.down) {
    position.x += direction.right;

    const treeOrSquare = map.getSquare(position.x).atRow(position.y);
    if (treeOrSquare === '#') {
      console.log(`saw tree at ${position.y} col ${position.x}`);
      tree++;
    }
  }
  return tree;
}

async function part1() {
  const input = readFileAsString('./src/day3/input_day3');
  const map = Day3Map.fromInput(await input);
  const trees = computeNumberOfTreeInPath(map, { right: 3, down: 1 });
  console.log(`Saw ${trees} trees`);
}

export const day3 = {
  part1,
  part2: () => {
    throw new Error('TODO');
  },
};
