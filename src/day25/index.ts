const DOOR_PUBLIC_KEY = 14082811
const CARD_PUBLIC_KEY = 5249543

function* loopPossibleValues(subject: number) {
  let loopSize = 0
  let value = 1
  while (true) {
    value = subject * value
    value = value % 20201227
    loopSize++
    yield { loopSize, value }
  }
}

function findLoopSize(
  possibleValues: IterableIterator<Record<'loopSize' | 'value', number>>,
  publicKey: number
) {
  for (let it of possibleValues) {
    if (it.value === publicKey) {
        return it.loopSize
    }
  }
}

async function part1() {
    const door = findLoopSize(loopPossibleValues(7), DOOR_PUBLIC_KEY)!
    let value = 1;
    let subject = CARD_PUBLIC_KEY;
    let loop = 0;
    while(loop < door) {
        value *= subject
        value%=20201227
        loop++
    }
    console.log({value});
    
}

async function part2() {
  throw new Error('TODO')
}

export const day25 = {
  part1,
  part2,
}
