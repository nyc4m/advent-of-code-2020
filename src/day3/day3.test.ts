import { Day3Map, Direction, computeNumberOfTreeInPath } from './'

const sampleInput =
  '..##.......\n#...#...#..\n.#....#..#.\n..#.#...#.#\n.#...##..#.\n..#.##.....\n.#.#.#....#\n.#........#\n#.##...#...\n#...##....#\n.#..#...#.#\n'

describe('day 3', () => {
  describe('Day3Map', () => {
    const map = Day3Map.fromInput(sampleInput)
    it('should have a length of ', () => {
      expect(map.boardWidth).toBe(11)
    })
    it.each([[[2, 0]], [[3, 0]], [[0, 1]], [[4, 1]], [[8, 1]]])(
      'should contain tree at %o',
      ([col, row]) => {
        const maybeATree = map.getSquare(col).atRow(row)
        expect(maybeATree).toBe('#')
      }
    )
    it('should should repeat the map', () => {
      const square = map.getSquare(12).atRow(0)
      const tree = map.getSquare(13).atRow(0)
      expect(square).toBe('.')
      expect(tree).toBe('#')
    })
  })

  it('should find 7 trees', () => {
    const map = Day3Map.fromInput(sampleInput)
    const directions: Direction = {
      down: 1,
      right: 3,
    }
    const numberOfTrees = computeNumberOfTreeInPath(map, directions)
    expect(numberOfTrees).toBe(7)
  })
})
