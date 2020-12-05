import { Type } from 'typescript'
import { readFileAsString } from '../utils'

type Area = [number, number]
type Position = [number, number]
export function binarySearch(
  row: Array<string>,
  upperToken: string,
  lowerToken: string,
  area: Area
): number {
  if (row.length === 1) {
    switch (row[0]) {
      case upperToken:
        return area[1]
      case lowerToken:
        return area[0]
    }
  }
  const [currentRow, ...rest] = row
  const [min, max] = area
  switch (currentRow) {
    case lowerToken:
      const newMax = Math.floor((max - min) / 2 + min)
      return binarySearch(rest, upperToken, lowerToken, [min, newMax])
    case upperToken:
      const newMin = Math.ceil(max - (max - min) / 2)
      return binarySearch(rest, upperToken, lowerToken, [newMin, max])
  }
  throw new Error(
    `Unexpected token ${currentRow}, expected either ${lowerToken} for lower and ${upperToken} for upper`
  )
}

export function findPosition(rawLocation: string): Position {
  const row = rawLocation.slice(0, 7).split('')
  const col = rawLocation.slice(7).split('')
  return [
    binarySearch(row, 'B', 'F', [0, 127]),
    binarySearch(col, 'R', 'L', [0, 7]),
  ]
}

async function part1() {
  const input = await readFileAsString('./src/day5/input_day5')
  const ids = input
    .split('\n')
    .slice(0, -1)
    .map((s) => findPosition(s))
    .map((position) => position[0] * 8 + position[1])
  console.log(`Max ID is ${Math.max(...ids)}`)
}

async function part2() {
  const input = await readFileAsString('./src/day5/input_day5')
  const idBeforeMissing = input
    .split('\n')
    .slice(0, -1)
    .map((s) => findPosition(s))
    .map((position) => position[0] * 8 + position[1])
    .sort((a, b) => a - b)
    .find((value, index, array) => value + 1 !== array[index + 1])
  const foundId = idBeforeMissing ? idBeforeMissing + 1 : 0
  console.log(`found ID: ${foundId}`)
}

export const day5 = {
  part1,
  part2,
}
