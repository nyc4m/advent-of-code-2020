import { match } from 'assert'
import { List } from 'immutable'
import { validateDocumentFields } from '../day4'
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

export function computeErrorRate(tickets: NearbyTickets, rules: Rules): number {
  const badNumbers = tickets.map((ticket) => {
    return ticket.find((v) => {
      const ruleToDiscard = rules.findIndex((r) => {
        const firstRangeOk = v >= r.firstRange[0] && v <= r.firstRange[1]
        const secondRangeOk = v >= r.secondRange[0] && v <= r.secondRange[1]
        return secondRangeOk || firstRangeOk
      })
      return ruleToDiscard === -1
    })
  }).filter(v => v !== undefined)

  return badNumbers.reduce((sum, i) => sum + i!, 0)
}

async function part1() {
  const input = readFileAsString('src/day16/input_day16')
  const [rules, _, nearbyTickets] = parseInput(await input)
  console.log(`error rate: ${computeErrorRate(nearbyTickets, rules)}`)
}

async function part2() {
  throw new Error('TODO')
}

export const day16 = {
  part1,
  part2,
}
