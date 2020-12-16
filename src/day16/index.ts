import { ifError } from 'assert'
import { List, Map, Set } from 'immutable'
import { readFileAsString } from '../utils'

type Rule = {
  name: string
  firstRange: [number, number]
  secondRange: [number, number]
}

export type Rules = List<Rule>

export type Ticket = List<number>

export type NearbyTickets = List<List<number>>

export function parseInput(input: string): [Rules, Ticket, NearbyTickets] {
  const [rules, ticket, others] = input.split('\n\n')
  const parsedRules = rules.split('\n').map((line) => {
    const matched = line.match(
      /(?<name>.*): (?<firstRange>\d*-\d*) or (?<secondRange>\d*-\d*)/
    )
    const firstRange = matched?.groups?.firstRange
      .split('-')
      .map((i) => parseInt(i, 10)) || [0, 0]
    const secondRange = matched?.groups?.secondRange
      .split('-')
      .map((i) => parseInt(i, 10)) || [0, 0]
    return { name: matched?.groups?.name || '', firstRange, secondRange }
  })

  const parsedTicket = ticket
    .split('\n')[1]
    .split(',')
    .map((n) => parseInt(n, 10))
  const parsedNearbyTickets = others
    .split('\n')
    .slice(1)
    .map((line) => List(line.split(',').map((n) => parseInt(n, 10))))
  return [
    List(parsedRules) as Rules,
    List(parsedTicket) as Ticket,
    List(parsedNearbyTickets) as NearbyTickets,
  ]
}

export function computeErrorRate(
  tickets: NearbyTickets,
  rules: Rules
): { errorRate: number; validTickets: List<List<number>> } {
  let validTickets = List<List<number>>()
  const badNumbers = tickets
    .map((ticket) => {
      const badNumber = ticket.find((v) => {
        const ruleToDiscard = rules.findIndex((r) => {
          return validateValue(v, r)
        })
        return ruleToDiscard === -1
      })
      if (badNumber) return badNumber
      validTickets = validTickets.push(ticket)
    })
    .filter((v) => v !== undefined)

  return { errorRate: badNumbers.reduce((sum, i) => sum + i!, 0), validTickets }
}

function validateValue(v: number, r: Rule) {
  const firstRangeOk = v >= r.firstRange[0] && v <= r.firstRange[1]
  const secondRangeOk = v >= r.secondRange[0] && v <= r.secondRange[1]
  return secondRangeOk || firstRangeOk
}

export function guessFieldsName(
  tickets: NearbyTickets,
  rules: Rules
): List<string> {
  let currentIndex = 0
  let ruleNames = List<string>()
  while (rules.size > 1) {
    const numbers = tickets.map((ticket) => ticket.get(currentIndex)!)

    const foundIndex = rules.findIndex((r) =>
      numbers.every((n) => validateValue(n, r))
    )

    ruleNames = ruleNames.push(rules.get(foundIndex)!.name)
    rules = rules.delete(foundIndex)
    currentIndex++
  }

  return ruleNames.push(rules.last<Rule>().name)
}

async function part1() {
  const input = readFileAsString('src/day16/input_day16')
  const [rules, _, nearbyTickets] = parseInput(await input)
  console.log(`error rate: ${computeErrorRate(nearbyTickets, rules)}`)
}

async function part2() {
  const input = readFileAsString('src/day16/input_day16')
  const [rules, ticket, nearbyTickets] = parseInput(await input)
  const { validTickets } = computeErrorRate(nearbyTickets, rules)
  const fields = guessFieldsName(validTickets, rules)
  
  const fieldsId = fields
    .map((name, i) => (/departure/.test(name) ? i : null))
    .filter((v) => v !== null)
    
  const prod = fieldsId.reduce((product, v) => {
    const value = ticket.get(v!)!

    return value * product
  }, 1)
  console.log(`product is ${prod}`)
}

export const day16 = {
  part1,
  part2,
}
