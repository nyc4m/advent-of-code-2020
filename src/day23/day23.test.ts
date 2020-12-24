import * as Day23 from './'
function convertCupToArray(cup: Day23.Cup, size: number): number[] {
  const fillArray = (
    c: Day23.Cup,
    array: number[],
    i: number = 0
  ): number[] => {
    return i >= size ? array : fillArray(c.next, [...array, c.value], i + 1)
  }
  return fillArray(cup, [], 0)
}
describe('day 23', () => {
  it('should render the next step', () => {
    const gameIterator = Day23.play(
      Day23.createCups([3, 8, 9, 1, 2, 5, 4, 6, 7])
    )
    gameIterator.next()
    expect(convertCupToArray(gameIterator.next().value, 9)).toEqual([
      2,
      8,
      9,
      1,
      5,
      4,
      6,
      7,
      3,
    ])
    expect(convertCupToArray(gameIterator.next().value, 9)).toEqual([
      5,
      4,
      6,
      7,
      8,
      9,
      1,
      3,
      2,
    ])
    expect(convertCupToArray(gameIterator.next().value, 9)).toEqual([
      8,
      9,
      1,
      3,
      4,
      6,
      7,
      2,
      5,
    ])
  })
  it('should parse', () => {
    const cups = Day23.createCups([5, 4, 6, 7, 8, 9, 1, 3, 2])
    expect(convertCupToArray(cups, 9)).toEqual([5, 4, 6, 7, 8, 9, 1, 3, 2])
  })
})
