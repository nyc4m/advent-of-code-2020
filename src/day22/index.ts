import { readFile } from 'fs'
import { fromJS, List } from 'immutable'
import { readFileAsString } from '../utils'

function parseInidividualDeck(input: string): number[] {
  const [playerName, ...cards] = input.split('\n')
  return cards.map((i) => parseInt(i, 10))
}

export function parseDecks(input: string): List<List<number>> {
  const players = input.split('\n\n')
  const decks = players.map((player) => parseInidividualDeck(player))
  return fromJS(decks)
}

function calculateScore(player: List<number>) {
  return player.reverse().reduce((sum, card, index) => sum + card * (index + 1), 0)
}

type Winner = {
    who: number,
    score: number
}

export function executeTurns(
  player1: List<number>,
  player2: List<number>
): Winner {
  if (player1.isEmpty()) {
    return {who: 2, score: calculateScore(player2)}
  }
  if (player2.isEmpty()) {
    return {who: 1, score: calculateScore(player1)}
  }
  const [cardPlayer1, cardPlayer2] = [
    player1.first<number>(),
    player2.first<number>(),
  ]
  if (cardPlayer1 < cardPlayer2) {
    return executeTurns(
      player1.shift(),
      player2.shift().push(cardPlayer2).push(cardPlayer1)
    )
  } else {
    return executeTurns(
      player1.shift().push(cardPlayer1).push(cardPlayer2),
      player2.shift()
    )
  }
}

export async function part1() {
    const game = readFileAsString('./src/day22/input_day22')
    const players = parseDecks(await game)
    const score = executeTurns(players.get(0)!, players.get(1)!)
    console.log(`Winner's score : ${score}`);
}
export async function part2() {
  throw new Error('TODO')
}

export const day22 = {
  part1,
  part2,
}
