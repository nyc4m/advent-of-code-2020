import * as Day7 from './'
const sampleInput = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
`

/**
 * white -> light red, dark orange, shiny gold, muted yellow
 * muted yellow -> light red, dark orange, fadded blue,
 * shiny gold -> bright white, muted yellow
 * faded blue -> muted yellow, dark olive, vibrant plum
 * vibrant plum -> shiny gold,
 * dark olive -> shiny gold
 * dotted black -> dark olive, vibrant plum
 * faded blue -> []
 * dotted black -> []
 */

describe('day7', () => {
  const bagDb = Day7.parseBags(sampleInput)

  it('should have 9 bags', () => {
    expect(bagDb.count).toBe(9)
  })

  it('light red bag should contain bright white bag and muted yellow bag', () => {
    const lightRed = bagDb.findByColor('light red')
    expect(lightRed.content).toHaveLength(2)
    const [white, yellow] = lightRed.content
    expect(white.bag.color).toBe('bright white')
    expect(white.count).toBe(1)
    expect(yellow.bag.color).toBe('muted yellow')
    expect(yellow.count).toBe(2)
  })

  it('should contain shiny gold', () => {
    const shiny = bagDb.findByColor('shiny gold')
    expect(shiny.bagAncestor).toHaveLength(2)
    const [white, yellow] = shiny.bagAncestor
    expect(yellow.color).toBe('muted yellow')
    expect(white.color).toBe('bright white')
  })

  it('should contain no bags', () => {
    const shiny = bagDb.findByColor('faded blue')
    expect(shiny.content).toHaveLength(0)
  })

  it('should be 4', () => {
    const setOfBags = Day7.findNumberOgBags(bagDb.findByColor('shiny gold'))

    expect(setOfBags.size).toBe(4)
  })

  it('should compute 32 bags', () => {
    const numberOfBags = Day7.calculateNumberOfBags(
      bagDb.findByColor('shiny gold')
    )
    expect(numberOfBags-1).toBe(32)
  })
})
