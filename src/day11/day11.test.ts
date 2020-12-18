import { day10 } from '../day10'
import { List, Set } from 'immutable'
import * as Day11 from './'
describe('day 11', () => {
  it('should parse positions', () => {
    const input = 'L.#\n...\n###'
    expect(Day11.parsePositions(input)).toEqual(
      Set([
        { type: 'L', x: 0, y: 0 },
        { type: '.', x: 1, y: 0 },
        { type: '#', x: 2, y: 0 },
        { type: '.', x: 0, y: 1 },
        { type: '.', x: 1, y: 1 },
        { type: '.', x: 2, y: 1 },
        { type: '#', x: 0, y: 2 },
        { type: '#', x: 1, y: 2 },
        { type: '#', x: 2, y: 2 },
      ])
    )
  })
  it('should find 8 adjacent positions', () => {
    const board = Set([
      { type: 'L', x: 0, y: 0 },
      { type: '.', x: 1, y: 0 },
      { type: '#', x: 2, y: 0 },
      { type: '.', x: 0, y: 1 },
      { type: '.', x: 1, y: 1 },
      { type: '.', x: 2, y: 1 },
      { type: '#', x: 0, y: 2 },
      { type: '#', x: 1, y: 2 },
      { type: '#', x: 2, y: 2 },
    ]) as Set<Day11.Square>
    const neighbours = Day11.findNeighbors({ x: 1, y: 1 }, board)
    expect(neighbours.size).toBe(8)
    expect(neighbours.sort()).toEqual(
      List([
        { type: '#', x: 2, y: 2 },
        { type: 'L', x: 0, y: 0 },
        { type: '.', x: 1, y: 0 },
        { type: '#', x: 2, y: 0 },
        { type: '.', x: 0, y: 1 },
        { type: '.', x: 2, y: 1 },
        { type: '#', x: 0, y: 2 },
        { type: '#', x: 1, y: 2 },
      ]).sort()
    )
  })

  xdescribe('renders', () => {
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
      const parsed = Day11.parsePositions(input)
      expect(Day11.renderNewState(parsed)).toEqual(
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
  })
  it('should return the number of occupied seats', () => {
    const positions = [
      ['#', '.', '.'],
      ['.', '#', 'L'],
      ['L', '.', '#'],
    ] as Day11.PositionType[][]
  })
})
