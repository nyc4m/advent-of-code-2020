import { readFileAsString } from '../utils'

export type PositionType = 'L' | '#' | '.' | 'W'
export type Coordinate = { y: number; x: number }

export function parsePositions(input: string): Array<Array<PositionType>> {
  const lines = input.split('\n')
  return lines.map((line) =>
    line.split('').map((pos) => {
      switch (pos) {
        case 'L':
        case '.':
        case '#':
          return pos
        default:
          throw new Error(`Unknown position type ${pos}`)
      }
    })
  )
}

export class WaitingArea {
  constructor(
    private readonly seats: Array<Array<PositionType>>,
    public readonly sameAsLastRender: boolean = false,
    private maxAuthorizedPeople: number = 4
  ) {}

  get snapshot(): readonly PositionType[][] {
    return this.seats
  }

  private coordAreOk({ x, y }: Coordinate) {
    const xOk = x >= 0 && x < this.width
    const yOk = y >= 0 && y < this.height
    return xOk && yOk
  }

  getSeat(coord: Coordinate): PositionType {
    if (this.coordAreOk(coord)) {
      return this.seats[coord.y][coord.x]
    }
    return 'W'
  }

  get height(): number {
    return this.seats.length
  }

  get width(): number {
    return this.seats[0].length
  }

  getAdjacentSeatsFrom({ x, y }: Coordinate) {
    const up = this.getSeat({ y: y - 1, x })
    const down = this.getSeat({ y: y + 1, x })
    const right = this.getSeat({ y, x: x + 1 })
    const left = this.getSeat({ y, x: x - 1 })
    const upLeft = this.getSeat({ y: y - 1, x: x - 1 })
    const upRight = this.getSeat({ y: y - 1, x: x + 1 })
    const downLeft = this.getSeat({ y: y + 1, x: x - 1 })
    const downRight = this.getSeat({ y: y + 1, x: x + 1 })

    return [up, down, right, left, downLeft, downRight, upRight, upLeft]
  }

  get nextState(): WaitingArea {
    if (this.sameAsLastRender) {
      return this
    }
    const newArea = this.snapshot.map((rows, y) => {
      return rows.map((oldSeat, x) => {
        if (oldSeat === '.') {
          return '.'
        }
        const adjacentPositions = this.getAdjacentSeatsFrom({ y, x })

        const occupiedSeats = adjacentPositions.filter((p) => p === '#')

        switch (oldSeat) {
          case '#':
            return occupiedSeats.length >= this.maxAuthorizedPeople ? 'L' : '#'
          case 'L':
            return occupiedSeats.length === 0 ? '#' : oldSeat
          default:
            return oldSeat
        }
      })
    })

    let equal = true
    for (var row = 0; row < this.height; row++) {
      for (var seat = 0; seat < this.width; seat++) {
        if (newArea[row][seat] !== this.snapshot[row][seat]) {
          equal = false
        }
      }
    }

    return new WaitingArea(newArea, equal)
  }

  get occupiedSeats(): number {
    return this.seats.reduce(
      (sum, rows) => rows.filter((p) => p === '#').length + sum,
      0
    )
  }
}

export function runUntilNobodyMoveFromTheirDamnSeats(
  waitingArea: WaitingArea
): WaitingArea {
  const renders = [waitingArea, waitingArea.nextState]
  while (!renders[renders.length - 1].sameAsLastRender) {
    const newState = renders[renders.length - 1].nextState
    renders.push(newState)
  }
  return renders[renders.length - 1]
}

class Day11 {
  constructor(private inputPath: string) {}

  async part1() {
    const waitingArea = new WaitingArea(await this.positions)
    const lastRender = runUntilNobodyMoveFromTheirDamnSeats(waitingArea)
    console.log(`seats: ${lastRender.occupiedSeats}`)
  }

  async part2() {
    throw new Error('TODO')
  }

  get positions(): Promise<PositionType[][]> {
    return readFileAsString(this.inputPath).then(parsePositions)
  }
}

export const day11 = new Day11('./src/day11/input_day11')
