import { Map, List } from 'immutable'
import * as Day14 from './'

describe('day 14', () => {
  it('should parse input', () => {
    const input = `mask = 00110X11X0000110X0000001000111010X00
mem[39993] = 276
mem[23021] = 365
mem[59102] = 45645
mem[30606] = 2523
mem[38004] = 4503
mem[47790] = 1221939
mem[24194] = 3417
mask = 00X10011000001X00X1010XX11X000011000
mem[61385] = 13441
mem[44092] = 46615
mem[14640] = 11081`
    const expected = Map({
      '44092': 5104647704,
      '24194': 13696504272,
      '47790': 13696504272,
      '39993': 13696504276,
      '23021': 13696504276,
      '14640': 5104643608,
      '59102': 13696504276,
      '38004': 13696504276,
      '61385': 5104647192,
      '30606': 13696504272,
    })
    expect(
      Day14.executeInstructions(List(input.split('\n')), '', Map())
    ).toEqual(expected)
  })
})
