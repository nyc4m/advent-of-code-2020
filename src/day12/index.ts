import { readFileAsString } from '../utils'

type Orientation = 'N' | 'E' | 'S' | 'W'
type Action = 'F' | 'L' | 'R' | Orientation

export type Move = {
  action: Action
  value: number
}

export function parseDirections(input: string): Move[] {
  return input.split('\n').map((line) => {
    const matches = /(?<direction>[FNESWLR]{1})(?<value>\d+)/.exec(line)
    if (!matches) {
      throw new Error('Incorrect input, got ' + line)
    }
    const direction = matches.groups?.direction
    const value = matches.groups?.value
    if (!direction || !value) {
      throw new Error(
        `parsed value is wrong, got {value: ${value}, direction: ${direction}}`
      )
    }
    return {
      action: direction as Action,
      value: parseInt(value, 10),
    }
  })
}

export class Compass {
  private readonly rightOrientations: Orientation[] = ['N', 'E', 'S', 'W']
  private readonly leftOrientations = this.rightOrientations.slice().reverse()
  constructor() {}

  private computeRotation(
    orientation: Orientation,
    offset: number,
    orientations: Orientation[]
  ) {
    const indexOfOrientation = orientations.lastIndexOf(orientation)

    const newIndex = (indexOfOrientation + offset) % orientations.length
    return orientations[newIndex]
  }

  rotateFrom(start: Orientation, to: 'L' | 'R', of: number) {
    const offset = of / 90
    return this.computeRotation(
      start,
      offset,
      to === 'L' ? this.leftOrientations : this.rightOrientations
    )
  }
}

type Ferry = {
  readonly x: number
  readonly y: number
  readonly orientation: Orientation
}

export function navigate(
  ferry: Ferry,
  moves: Move[],
  compass: Compass
): number {
  if (!moves.length) {
    return Math.abs(ferry.x) + Math.abs(ferry.y)
  }
  const [nextMove, ...remainingMoves] = moves
  const { value, action } = nextMove
  const { x, y } = ferry
  switch (action) {
    case 'E':
      return navigate({ ...ferry, x: x + value }, remainingMoves, compass)
    case 'N':
      return navigate({ ...ferry, y: y + value }, remainingMoves, compass)
    case 'W':
      return navigate({ ...ferry, x: x - value }, remainingMoves, compass)
    case 'S':
      return navigate({ ...ferry, y: y - value }, remainingMoves, compass)
    case 'F':
      return navigate(
        ferry,
        [{ action: ferry.orientation, value }, ...remainingMoves],
        compass
      )
    case 'R':
    case 'L':
      return navigate(
        {
          ...ferry,
          orientation: compass.rotateFrom(ferry.orientation, action, value),
        },
        remainingMoves,
        compass
      )
  }
}

class Day12 {
  constructor(private inputPath: string) {}

  async part1() {
    const distance = navigate(
      { orientation: 'E', x: 0, y: 0 },
      await this.moves,
      new Compass()
    )
    console.log(`distance: ${distance}`)
  }

  async part2() {
    throw new Error('TODO')
  }

  get moves(): Promise<Move[]> {
    return readFileAsString(this.inputPath).then(parseDirections)
  }
}

export const day12 = new Day12('./src/day12/input_day12')
