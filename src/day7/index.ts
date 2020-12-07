import { readFileAsString } from '../utils'

class Bag {
  constructor(
    public readonly color: string,
    private containing: Bag[] = [],
    private containedBy: Bag[] = []
  ) {}
  addBags(bag: Bag) {
    this.containing.push(bag)
  }
  addParentBag(bag: Bag) {
    this.containedBy.push(bag)
  }

  get content(): Bag[] {
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
          return b.substring(1).trim()
        })
      const bag = bagDb.findByColorOrCreate(bagToRemember)
      bagsToBeContained.forEach((b) => {
        if (b === 'NO_COLOR') return
        const child = bagDb.findByColorOrCreate(b)
        bag.addBags(child)
        child.addParentBag(bag)
      })
    })
  return bagDb
}

export function findNumberOgBags(
  db: BagDatabase,
  color: string,
  alreadySeen: Set<string> = new Set(),
  alreadyFound: number = 0
): number {
  if (alreadySeen.has(color)) return alreadyFound
  alreadySeen.add(color)
  const bagsStored = db.findByColor(color)

  if (bagsStored.bagAncestor.length === 0) {
    return alreadyFound
  }
  bagsStored.bagAncestor.forEach((bag) =>
    findNumberOgBags(db, bag.color, alreadySeen, alreadyFound + 1)
  )
  // -1 -> the first bag we visit doesn't count
  return alreadySeen.size -1
}

async function part1() {
  const input = readFileAsString('./src/day7/input_day7')
  const db = parseBags(await input)
  console.log(`bag database now contain ${db.count}`);
  console.log(db.allColors)
  
  const nbOfBags = findNumberOgBags(db, 'shiny gold')
  console.log(`found ${nbOfBags} bags`)
}

export const day7 = {
  part1,
  part2: () => {
    throw new Error('TODO')
  },
}
