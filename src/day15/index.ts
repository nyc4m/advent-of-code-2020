import { List, Map } from 'immutable'

async function part1() {
  throw new Error('TODO')
}
async function part2() {
  throw new Error('TODO')
}

export function play(
    initSequence: List<number>,
    lastNumbers: List<number>,
  alreadySaidNumbers: Map<number, List<number>>,
  turn: number,
  stopTurn: number
): number {
    if(turn < initSequence.size) {
        return play(initSequence, lastNumbers.push(initSequence.get(turn)!), alreadySaidNumbers.set(initSequence.get(turn)!, List.of(turn)), turn+1, stopTurn)
    }
  if (turn === stopTurn) {
    return lastNumbers.last()
  }
  const lastNumber = lastNumbers.last(0)
  if (!alreadySaidNumbers.has(lastNumber)) {
    const zeroOccurences = alreadySaidNumbers.get(0, List())
    return play(
        initSequence,
      lastNumbers.push(0),
      alreadySaidNumbers.set(0, zeroOccurences.push(turn)),
      turn + 1,
      stopTurn
    )
  }
  const turnsWhereSaid = alreadySaidNumbers.get(lastNumber, List<number>())
  const lastTurn = turnsWhereSaid.last(-1)
  
  const newNumber = turn - lastTurn
  return play(
      initSequence,
    lastNumbers.push(newNumber),
    alreadySaidNumbers.set(newNumber, List()),
    turn + 1,
    stopTurn
  )
}

export const day15 = {
  part1,
  part2,
}
