import { day7 } from '../day7'
import * as Day8 from './'
const input = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`

const operations: Day8.Operation[] = [
  { type: 'nop', value: 0 },
  { type: 'acc', value: +1 },
  { type: 'jmp', value: +4 },
  { type: 'acc', value: +3 },
  { type: 'jmp', value: -3 },
  { type: 'acc', value: -99 },
  { type: 'acc', value: +1 },
  { type: 'jmp', value: -4 },
  { type: 'acc', value: +6 },
]
describe('day8', () => {
  it('should parse the operation list', () => {
    expect(Day8.parseOperations(input)).toEqual(operations)
  })
  it('should exit infinite loop and return 5', () => {
    const computer = new Day8.Computer(operations)
    expect(computer.runFromPosition(0).res).toBe(5)
  })
})
