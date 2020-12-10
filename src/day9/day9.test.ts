import * as Day9 from './'

const numbers = [
  35,
  20,
  15,
  25,
  47,
  40,
  62,
  55,
  65,
  95,
  102,
  117,
  150,
  182,
  127,
  219,
  299,
  277,
  309,
  576,
]

describe('day 9', () => {
  it('should find 127', () => {
    expect(Day9.scanNumbers(numbers, 5)).toBe(127)
  })
  it('should find a contiguous sequence that sum to 127', () => {
    expect(Day9.findContiguousSetOfNumbers(numbers, 127)).toEqual([
      15,
      25,
      47,
      40,
    ])
  })
})
