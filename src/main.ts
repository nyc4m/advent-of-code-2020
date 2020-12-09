import { day1 } from './day1'
import { day2 } from './day2'
import { day3 } from './day3'
import { day4 } from './day4'
import { day5 } from './day5'
import { day6 } from './day6'
import { day7 } from './day7'
import { day8 } from './day8'
import { day9 } from './day9'

const [ts_node, main, day, part] = process.argv

interface Day {
  part1: () => void
  part2: () => void
}

const days: { [key: string]: Day } = {
  day1,
  day2,
  day3,
  day4,
  day5,
  day6,
  day7,
  day8,
  day9,
}

const dayToExecute = days[day]
if (!dayToExecute) {
  console.error(`${day} does not exist`)
  process.exit(1)
}

switch (part) {
  case '1':
    dayToExecute.part1()
    break
  case '2':
    dayToExecute.part2()
    break
  default:
    dayToExecute.part1()
    dayToExecute.part2()
}
