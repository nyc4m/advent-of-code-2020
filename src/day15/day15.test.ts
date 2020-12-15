import { List, Map } from 'immutable'
import * as Day15 from './'
describe('day 15', () => {
  it.each`
    startingNumbers    | expected
    ${List([1, 3, 2])} | ${1}
    ${List([2, 1, 3])} | ${10}
  `('should execute 2020 turns', ({ startingNumbers, expected }) => {
    expect(Day15.play(startingNumbers, List(), Map(), 1, 2020)).toBe(expected)
  })
})
