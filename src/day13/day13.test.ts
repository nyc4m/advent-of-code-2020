import { List } from 'immutable'
import * as Day13 from './'
describe('day 13', () => {
  it('should parse input', () => {
    const input = `939
7,13,x,x,59,x,31,19`
    expect(Day13.parseBuses(input)).toEqual({
      departure: 939,
      buses: List([7, 13, 59, 31, 19]),
    })
  })
  it('should find correct bus id', () => {
    expect(Day13.findOkTimeStamp(939, List([7, 13, 59, 31, 19]))?.id).toBe(59)
  })
})
