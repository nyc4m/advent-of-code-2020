import { List, Map } from 'immutable'
import * as Day15 from './'
describe('day 15', () => {
  it.each([
    [4, 0],
    [5, 3],
    [6, 3],
    [7, 1],
  ])('should find 0', (stop, expected) => {
    expect(Day15.play(List([0, 3, 6]), stop)).toBe(expected)
  })
})
