import { readFileAsString } from '../utils'

export type Cup = {
  value: number
  next: Cup
}

const input = [5, 6, 2, 8, 9, 3, 1, 4, 7]

export function createCups(numbers: number[]): Cup {
  const cups = numbers.map((value) => ({ value })) as Partial<Cup>[]
  return cups.map((c, index, array) => {
    c.next = array[(index + 1) % array.length] as Cup
    return c
  })[0]! as Cup
}

export function* play(selectedCup: Cup): IterableIterator<Cup> {
  yield selectedCup
  let current = selectedCup
  while (true) {
    const toDiscard = current.next
    current.next = current.next.next.next.next
    const findMax = (cup: Cup, max: Cup): Cup =>
      cup === current
        ? max
        : findMax(cup.next, cup.value > max.value ? cup : max)
    const searchValue = (
      cup: Cup,
      expectedValue: number = current.value
    ): Cup => {
      if (expectedValue === 0) return findMax(current.next, current)
      if (cup === current) return searchValue(cup.next, expectedValue - 1)
      if (cup.value === expectedValue) return cup
      return searchValue(cup.next, expectedValue)
    }
    const destination = searchValue(current.next)
    toDiscard.next.next.next = destination.next
    destination.next = toDiscard
    current = current.next
    yield current
  }
}

function search(startingCup: Cup, value: number): Cup | null {
  let alreadySawFirst = false
  const searchValue = (cup: Cup): Cup | null => {
    if (cup === startingCup && alreadySawFirst) return null
    if (cup.value === value) return cup
    if (alreadySawFirst) alreadySawFirst = true
    return searchValue(cup.next)
  }
  return searchValue(startingCup)
}

function buildString(firstCup: Cup): string {
  let alreadySaw = false
  const stringify = (cup: Cup): string => {
    if (cup === firstCup && alreadySaw) return ''
    if (!alreadySaw) alreadySaw = true
    return cup.value + '' + stringify(cup.next)
  }
  return stringify(firstCup)
}

export async function part1() {
  const firstSelectedCup = createCups(input)
  const cupIterator = play(firstSelectedCup)
  for (let i = 0; i < 100; i++) {
    cupIterator.next()
  }
  const lastSelectedCup = cupIterator.next().value
  const cupWith1 = search(lastSelectedCup, 1)
  if (!cupWith1) throw new Error('NO CUP FOUND')
  const log = (cup: Cup): string =>
    cup === cupWith1 ? '' : `${cup.value}` + log(cup.next)
  console.log(`final string: ${buildString(cupWith1).substr(1)}`)
}

async function part2() {
  const max = Math.max(...input)
  for (let i = max; i < 1000000; i++) {
    input.push(i)
  }
  const cups = createCups(input)
  const it = play(cups)
  for (let i = 0; i < 10000000; i++) {
    it.next()
  }
  console.log(it.next().value)
}

export const day23 = {
  part1,
  part2,
}
