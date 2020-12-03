import { readFileAsString } from '../utils'

type PasswordPolicy = {
  min: number
  max: number
  letter: string
  password: string
}

async function part1() {
  const input = await readFileAsString('./src/day2/input_day2')
  const parsed = parseInput(input)

  const validPasswords = findValidPasswords(parsed)
  console.log(`Valid passwords : ${validPasswords}`)
}

export function parseInput(input: string): PasswordPolicy[] {
  const parseQuantifier = (
    quantifiers: string
  ): { min: number; max: number } => {
    const splittedString = quantifiers.split('-')
    return { min: +splittedString[0], max: +splittedString[1] }
  }
  return input
    .split('\n')
    .map((line) => line.split(' '))
    .slice(0, -1)
    .map((splittedLine) => ({
      ...parseQuantifier(splittedLine[0]),
      letter: splittedLine[1].charAt(0),
      password: splittedLine[2],
    }))
}

export function findValidPasswords(
  passwordToBeValidated: PasswordPolicy[]
): number {
  return passwordToBeValidated.filter((validation) => {
    const countedLetter = validation.password
      .split('')
      .reduce((letterCount, letter) => {
        if (letter === validation.letter) {
          return ++letterCount
        }
        return letterCount
      }, 0)
    const maxOk = countedLetter <= validation.max
    const minOk = countedLetter >= validation.min

    return minOk && maxOk
  }).length
}

export function findValidPasswordWithPositions(
  passwordsValidation: PasswordPolicy[]
): number {
  return passwordsValidation.filter((validation) => {
    const { letter, password } = validation
    //Elves start indexing at 1, not at 0
    const firstPos = validation.min - 1
    const secondPos = validation.max - 1
    const firstPositionOk = password.charAt(firstPos) === letter
    const secondPositionOk = password.charAt(secondPos) === letter
    return firstPositionOk !== secondPositionOk
  }).length
}

async function part2() {
  const input = await readFileAsString('./src/day2/input_day2')
  const passwordsValidation = parseInput(input)
  const validPasswords = findValidPasswordWithPositions(passwordsValidation)
  console.log(`Valid passwords: ${validPasswords}`)
}
export const day2 = {
  part1,
  part2,
}
