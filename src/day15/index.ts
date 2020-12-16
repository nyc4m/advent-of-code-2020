import { List, Map } from 'immutable'

const input = List([0, 12, 6, 13, 20, 1, 17])

async function part1() {
  const number = play(input, 2020)
  console.log({ number })
}

async function part2() {
  const number = play(input, 30000000)
  console.log({ number })
}

export function play(numbers: List<number>, stopTurn: number): number {
  let memory = Map<number, List<number>>().withMutations((map) => {
    numbers.forEach((v, k) => map.set(v, List([k])))
  })
  let last = numbers.last<number>()
  for (let turn = numbers.size; turn < stopTurn; turn++) {
    const lastSeenTurns = memory.get(last, List<number>([]))
    if (lastSeenTurns.size < 2) {
      last = 0
      memory = memory.set(0, memory.get(0, List()).push(turn))
    } else {
      const first = lastSeenTurns.get(-1)
      const second = lastSeenTurns.get(-2)
      last = first! - second!
      memory = memory.set(last, memory.get(last, List()).push(turn))
    }
  }
  return last
}

export const day15 = {
  part1,
  part2,
}
