import { day1 } from './day1'
import { day2 } from './day2'
import { day3 } from './day3'
import { day4 } from './day4'
import { day5 } from './day5'
import { day6 } from './day6'
import { day7 } from './day7'
import { day8 } from './day8'
import { day9 } from './day9'
import { day10 } from './day10'
import { day11 } from './day11'
import { day12 } from './day12'
import { day13 } from './day13'
import { day14 } from './day14'
import { day15 } from './day15'
import { day16 } from './day16'
import { day22 } from './day22'

const [ts_node, main, day, part] = process.argv

interface Day {
  part1: () => Promise<void>
  part2: () => Promise<void>
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
  day10,
  day11,
  day12,
  day13,
  day14,
  day15,
  day16,
  day22,
}

const dayToExecute = days[day]
if (!dayToExecute) {
  console.error(`${day} does not exist`)
  process.exit(1)
}

let pending
switch (part) {
  case '1':
    pending = [dayToExecute.part1()]
    break
  case '2':
    pending = [dayToExecute.part2()]
    break
  default:
    pending = [dayToExecute.part1(), dayToExecute.part2()]
}
Promise.all(pending).catch((e) => {
  if (e.message === 'TODO') {
    console.error('This is not done yet 🙃')
  }
})
