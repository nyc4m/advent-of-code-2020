import {List, Record, Map} from 'immutable'

export const memory = Record({mask: "", instructions: Map<string, string>()})
export type Memory = typeof memory



export function parseInput(input: string):List<Memory> {
    
}

async function part1() {
    throw new Error("TODO")
}

async function part2() {
    throw new Error("TODO")
}

export const day14 = {
    part1, 
    part2,
}