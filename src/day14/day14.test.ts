import {Map, List} from 'immutable'
import * as Day14 from './'

describe("day 14", () => {
    it("should parse input", () => {
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
        const expected = List([
            Day14.memory({
                mask: '00110X11X0000110X0000001000111010X00',
                instructions: Map([
                    ['39993', '276'],
                    ['23021', '365'],
                    ['59102', '45645'],
                    ['30606', '2523'],
                    ['38004', '4503'],
                    ['47790', '1221939'],
                    ['24194', '3417'],
                ])
            }),
            Day14.memory({
                mask: '00X10011000001X00X1010XX11X000011000',
                instructions: Map([
                    ['61385', '13441'],
                    ['44092', '46615'],
                    ['14640', '11081'],
                ])
            })
        ])
    })
    expect(Day14.parseInput(input)).toEqual(expected)
})