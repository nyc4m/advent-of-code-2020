import { day1 } from './day1/main';
import { day2 } from './day2';
import { day3 } from './day3';

const [ts_node, main, day, part] = process.argv;

interface Day {
  part1: () => void;
  part2: () => void;
}

const days: { [key: string]: Day } = {
  day1,
  day2,
  day3,
};

const dayToExecute = days[day];
if (!dayToExecute) {
  console.error(`${day} does not exist`);
  process.exit(1);
}

switch (part) {
  case '1':
    dayToExecute.part1();
    break;
  case '2':
    dayToExecute.part2();
    break;
  default:
    dayToExecute.part1();
    dayToExecute.part2();
}
