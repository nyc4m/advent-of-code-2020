import { findTriple, findPair, parseList } from '.'

const example = '1721\n979\n366\n299\n675\n1456\n'

const intList = [1721, 979, 366, 299, 675, 1456]

const sortedList = [...intList].sort((a, b) => a - b)

describe('day1', () => {
  it('should parse a list of int', () => {
    expect(parseList(example)).toEqual(intList)
  })

  it('should match example result', () => {
    const tuple = findPair(sortedList, 2020)
    expect(tuple[0] * tuple[1]).toEqual(514579)
  })

  it("should find a 'threeple' i guess", () => {
    const [one, two, three] = findTriple(sortedList, 2020)
    expect(one * two * three).toBe(241861950)
  })
})
