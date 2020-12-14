import { List, Record } from 'immutable'
import { readFileAsString } from '../utils'

export function findOkTimeStamp(
  departure: number,
  busIds: List<number>
): { id: number; schedule: number } | null {
  const numberOfJourneys = busIds
    .valueSeq()
    .map((id) => departure / id)
    .map((busJourney) => Math.ceil(busJourney))

  const busDefault = Record({ id: 0, schedule: 0 })

  const availableBuses = numberOfJourneys
    .map((journey, index) =>
      busDefault({
        id: busIds.get(index)!,
        schedule: journey * busIds.get(index)!,
      })
    )
    .filter((bus) => bus.schedule * bus.id >= departure)

  const minimumDelta = availableBuses
    .map((journey) => journey.schedule - departure)
    .min()

  const bus = availableBuses.find(
    (journey) => journey.schedule! - minimumDelta! === departure
  )
  if (!bus) {
    return null
  }

  const timestamp = availableBuses.find((b) => b.id === bus.id)
  if (!timestamp) {
    return null
  }
  const schedule = { id: bus.id, schedule: timestamp.schedule }
  return schedule
}

type BusSearch = {
  departure: number
  buses: List<number>
}

export function parseBuses(input: string): BusSearch {
  const lines = input.split('\n')
  const [departure, rest] = lines

  const buses = rest
    .split(',')
    .filter((id) => id !== 'x')
    .map((id) => parseInt(id, 10))
  return { departure: parseInt(departure, 10), buses: List(buses) }
}

class Day13 {
  constructor(private inputPath: string) {}
  async part1() {
    const search = await this.input
    const bus = findOkTimeStamp(search.departure, search.buses)
    const delta = (bus?.schedule || 0) - search.departure

    console.log(`Ok bus: ${delta * (bus?.id || 0)}`)
  }
  async part2() {
    throw new Error('TODO')
  }

  get input(): Promise<BusSearch> {
    return readFileAsString(this.inputPath).then(parseBuses)
  }
}

export const day13 = new Day13('./src/day13/input_day13')
