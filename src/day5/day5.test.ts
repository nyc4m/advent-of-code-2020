import { binarySearch, findPosition } from './'

describe('day5', () => {
  it('should find 44', () => {
    const row = 'FBFBBFF'
    expect(binarySearch(row.split(''), 'B', 'F', [0, 127])).toBe(44)
  })
  it('should find 5', () => {
    const col = 'RLR'
    expect(binarySearch(col.split(''), 'R', 'L', [0, 7])).toBe(5)
  })
  it('Should find position of [44, 5]', () => {
    const location = 'FBFBBFFRLR'
    expect(findPosition(location)).toEqual([44, 5])
  })
})
