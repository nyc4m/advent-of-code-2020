import { readFileAsString } from '../utils'

export function findUniqueAnswers(answers: string): number {
  const letters = answers.split('').filter((letter) => /[a-z]/.test(letter))
  return new Set(letters).size
}

export function calculateAnswerSum(
  groupedAnwers: Array<string>,
  mapper: (answer: string) => number
): number {
  return groupedAnwers.map(mapper).reduce((sum, i) => sum + i, 0)
}

export function computeNumberOfAnswerWhereEveryoneSaidYes(answers: string): number {
  const peopleAnswers = new Map<string, number>()
  const people = answers.split('\n')
  const groupSize = people.length
  people.map((p) =>
    p.split('').forEach((letter) => {
      const count = peopleAnswers.get(letter)
      peopleAnswers.set(letter, count ? count + 1 : 1)
      return peopleAnswers
    })
  )
  let answersCount = 0
  for (const [_, count] of peopleAnswers.entries()) {
    if (count === groupSize) {
      answersCount++
    }
  }
  return answersCount
}

async function part1() {
  const input = readFileAsString('./src/day6/input_day6')
  const uniqYes = calculateAnswerSum(
    (await input).split('\n\n'),
    findUniqueAnswers
  )
  console.log(`Found ${uniqYes} yes`)
}

async function part2() {
  const input = readFileAsString('./src/day6/input_day6')
  const uniqYes = calculateAnswerSum(
    (await input).split('\n\n'),
    computeNumberOfAnswerWhereEveryoneSaidYes
  )
  console.log(`Found ${uniqYes} yes`)
}

export const day6 = {
  part1,
  part2,
}
