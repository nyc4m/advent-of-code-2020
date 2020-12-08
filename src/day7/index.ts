import { readFileAsString } from '../utils'

type BagRelation = {
  count: number
  bag: Bag
}

class Bag {
  constructor(
    public readonly color: string,
    private containing: BagRelation[] = [],
    private containedBy: Bag[] = []
  ) {}
  addBag(bagRelation: BagRelation) {
    this.containing.push(bagRelation)
  }
  addParentBag(bag: Bag) {
    this.containedBy.push(bag)
  }

  get content(): BagRelation[] {
    return this.containing
  }

  get bagAncestor(): Bag[] {
    return this.containedBy
  }
}

class BagDatabase {
  readonly map = new Map<string, Bag>()
  findByColorOrCreate(color: string): Bag {
    const stored = this.map.get(color)
    if (!stored) {
      const bag = new Bag(color)
      this.map.set(color, bag)
      return bag
    }
    return stored
  }

  findByColor(color: string) {
    const foundBag = this.map.get(color)
    if (!foundBag) throw new Error(`Bag ${color} does not exist`)
    return foundBag
  }

  get count(): number {
    return this.map.size
  }

  get allColors(): Array<string> {
    return Array.from(this.map.keys())
  }
}

export function parseBags(input: string): BagDatabase {
  const bagDb = new BagDatabase()
  input
    .split('\n')
    .slice(0, -1)
    .map((line) => line.split(' bags contain '))
    .forEach(([bagToRemember, bagNotParsedYet]) => {
      const bagsToBeContained = bagNotParsedYet
        .replace(/ bags?, /g, ';')
        .replace('.', '')
        .replace(/ bags?/g, '')
        .trim()
        .split(';')
        .map((b) => {
          if (b.trim() === 'no other') {
            return 'NO_COLOR'
          }
          let matched = b.match(/\d*/)
          if (!matched) {
            throw new Error('No number for bags')
          }
          const count = parseInt(matched[0], 10)
          return { count: count, color: b.substring(1).trim() }
        })
      const bag = bagDb.findByColorOrCreate(bagToRemember)
      bagsToBeContained.forEach((b) => {
        if (b === 'NO_COLOR') return
        const child = bagDb.findByColorOrCreate(b.color)
        bag.addBag({ count: b.count, bag: child })
        child.addParentBag(bag)
      })
    })
  return bagDb
}

export function findNumberOgBags(
  bag: Bag,
  alreadySeen: Set<string> = new Set()
): Set<string> {
  if (alreadySeen.has(bag.color)) return alreadySeen
  alreadySeen.add(bag.color)

  if (bag.bagAncestor.length === 0) {
    return alreadySeen
  }
  const allSets = bag.bagAncestor.map((ancestor) =>
    findNumberOgBags(ancestor, alreadySeen)
  )
  return new Set(...allSets)
}

export function calculateNumberOfBags(bag: Bag): number {
  return bag.content.reduce((acc, relation) => {
    return acc + calculateNumberOfBags(relation.bag) * relation.count
  }, 1)
}

const getTotal = (bag: Bag) => calculateNumberOfBags(bag) - 1

async function part1() {
  const input = readFileAsString('./src/day7/input_day7')
  const db = parseBags(await input)
  console.log(`bag database now contain ${db.count}`)
  console.log(db.allColors)

  const nbOfBags = findNumberOgBags(db.findByColor('shiny gold'))
  console.log(`found ${nbOfBags} bags`)
}

async function part2() {
  const input = readFileAsString('./src/day7/input_day7')
  const db = parseBags(await input)

  const nbOfBags = calculateNumberOfBags(db.findByColor('shiny gold'))
  console.log(`You need ${getTotal(db.findByColor('shiny gold'))} bags`)
}

export const day7 = {
  part1,
  part2,
}
