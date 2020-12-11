import { day10 } from '../day10'
import * as Day11 from './'
describe('day 11', () => {
  it('should parse positions', () => {
    const input = 'L.#\n...\n###'
    expect(Day11.parsePositions(input)).toEqual([
      ['L', '.', '#'],
      ['.', '.', '.'],
      ['#', '#', '#'],
    ])
  })
  it('should find 8 adjacent positions', () => {
    const waitingArea = new Day11.WaitingArea([
      ['L', '.', '#'],
      ['#', '#', '.'],
      ['L', '#', '.'],
    ])
    expect(waitingArea.getAdjacentSeatsFrom({ x: 0, y: 0 }).sort()).toEqual(
      ['#', '#', '.', 'W', 'W', 'W', 'W', 'W'].sort()
    )
    expect(waitingArea.getAdjacentSeatsFrom({ x: 1, y: 1 }).sort()).toEqual(
      ['L', '#', '.', '#', '.', 'L', '.', '#'].sort()
    )
  })

  describe('renders', () => {
    it.each([
      [
        `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`,
        `#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##`,
      ],
      [
        `#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##`,
        `#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##`,
      ],
      [
        `#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##`,
        `#.##.L#.##
#L###LL.L#
L.#.#..#..
#L##.##.L#
#.##.LL.LL
#.###L#.##
..#.#.....
#L######L#
#.LL###L.L
#.#L###.##`,
      ],
      [
        `#.#L.L#.##
#LLL#LL.L#
L.L.L..#..
#LLL.##.L#
#.LL.LL.LL
#.LL#L#.##
..L.L.....
#L#LLLL#L#
#.LLLLLL.L
#.#L#L#.##`,
        `#.#L.L#.##
#LLL#LL.L#
L.#.L..#..
#L##.##.L#
#.#L.LL.LL
#.#L#L#.##
..L.L.....
#L#L##L#L#
#.LLLLLL.L
#.#L#L#.##`,
      ],
    ])('should correspond to next render', (input, expected) => {
      const waitingArea = new Day11.WaitingArea(Day11.parsePositions(input))
      expect(waitingArea.nextState.snapshot).toEqual(
        Day11.parsePositions(expected)
      )
    })
  })

  it('should as the same render', () => {
    const positions = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ] as Day11.PositionType[][]
    const waitingArea = new Day11.WaitingArea(positions)
    expect(waitingArea.nextState.sameAsLastRender).toBeTruthy()
  })
  it('should return the number of occupied seats', () => {
    const positions = [
      ['#', '.', '.'],
      ['.', '#', 'L'],
      ['L', '.', '#'],
    ] as Day11.PositionType[][]
    const waitingArea = new Day11.WaitingArea(positions)
    expect(waitingArea.occupiedSeats).toBe(3)
  })

  it('should find 37 after every render', () => {
    const input = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`
    const positions = Day11.parsePositions(input)
    const waitingArea = new Day11.WaitingArea(positions)
    expect(
      Day11.runUntilNobodyMoveFromTheirDamnSeats(waitingArea).snapshot
    ).toEqual(
      Day11.parsePositions(`#.#L.L#.##
#LLL#LL.L#
L.#.L..#..
#L##.##.L#
#.#L.LL.LL
#.#L#L#.##
..L.L.....
#L#L##L#L#
#.LLLLLL.L
#.#L#L#.##`)
    )
  })
})
