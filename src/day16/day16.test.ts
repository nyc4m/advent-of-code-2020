import { List } from 'immutable'
import * as Day16 from './'
const validParsedInput = [
  List([
    { name: 'class', firstRange: [1, 3], secondRange: [5, 7] },
    {
      name: 'row',
      firstRange: [6, 11],
      secondRange: [33, 44],
    },
    {
      name: 'seat',
      firstRange: [13, 40],
      secondRange: [45, 50],
    },
  ]),
  List([7, 1, 14]),
  List([
    List([7, 3, 47]),
    List([40, 4, 50]),
    List([55, 2, 20]),
    List([38, 6, 12]),
  ]),
] as [Day16.Rules, Day16.Ticket, Day16.NearbyTickets]
describe('day 16', () => {
  it('Should parse', () => {
    const input = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`
    const parsedInput = Day16.parseInput(input)
    expect(parsedInput.length).toBe(3)
    expect(parsedInput).toEqual(validParsedInput)
  })

  it('should invalidate tickets', () => {
    const [rules, _, nearbyTickets] = validParsedInput
    expect(Day16.computeErrorRate(nearbyTickets, rules)).toBe(71)
  })
})
