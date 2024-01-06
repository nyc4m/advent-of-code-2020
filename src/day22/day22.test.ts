import { List } from 'immutable'
import * as Day22 from './'
describe('Day 22', () => {
  it('parse file', () => {
    const input = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`
    expect(Day22.parseDecks(input)).toEqual(
      List([List([9, 2, 6, 3, 1]), List([5, 8, 4, 7, 10])])
    )
  })
  it('should execute turns until player 2 wins', () => {
    expect(
      Day22.executeTurns(List([9, 2, 6, 3, 1]), List([5, 8, 4, 7, 10]))
    ).toEqual({
      who: 2,
      score: 306,
    })
  })
})
