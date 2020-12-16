import { List } from 'immutable'
import { resourceLimits } from 'worker_threads'
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

  it('should compute errorRate tickets and return valid tickets', () => {
    const [rules, _, nearbyTickets] = validParsedInput
    expect(Day16.computeErrorRate(nearbyTickets, rules).errorRate).toBe(71)
    expect(Day16.computeErrorRate(nearbyTickets, rules).validTickets).toEqual(
      List([List([7, 3, 47])])
    )
  })

  it('should return fields name in order', () => {
    const validSample = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`
    const [validRules, _, nearby] = Day16.parseInput(validSample)
    expect(Day16.guessFieldsName(nearby, validRules)).toEqual(
      List(['row', 'class', 'seat'])
    )
  })
})
