import * as Day9 from './'

const input = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`

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
  it('should parse the int list', () => {
    expect(Day9.parseNumbers(input)).toEqual(numbers)
  })
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
