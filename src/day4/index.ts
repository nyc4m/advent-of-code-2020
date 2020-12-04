import { readFileAsString } from '../utils'

const REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

export function getPassports(input: string): Array<string> {
  return input.split('\n\n')
}

export function validatePassports(
  passports: Array<string>,
  validPasswords: number = 0
): number {
  const [passport, ...restOfPassports] = passports
  const valid = REQUIRED_FIELDS.map((required) =>
    passport.includes(required)
  ).includes(false)
    ? 0
    : 1
  if (passports.length === 1) {
    return valid + validPasswords
  }
  return validatePassports(restOfPassports, valid + validPasswords)
}

async function part1() {
  const input = readFileAsString('./src/day4/input_day4')
  const passports = getPassports(await input)
  const validPasswords = validatePassports(passports)
  console.log(`valid passports : ${validPasswords}`)
}

export const day4 = {
  part1,
  part2: () => {
    throw new Error('TODO')
  },
}
