import * as Day10 from './'
describe('day 10', () => {
  const joltages1 = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4]
  const joltages2 = [
    28,
    33,
    18,
    42,
    31,
    14,
    46,
    20,
    48,
    47,
    24,
    23,
    49,
    45,
    19,
    38,
    39,
    11,
    1,
    32,
    25,
    35,
    8,
    17,
    7,
    9,
    4,
    2,
    34,
    10,
    3,
  ]
  it.each`
    joltages     | expected
    ${joltages1} | ${{ oneJolt: 7, threeJolt: 5 }}
    ${joltages2} | ${{ oneJolt: 22, threeJolt: 10 }}
  `(
    'should find a difference of 7 1-jolt and 5 3-jolt',
    ({ joltages, expected }) => {
      const repartition = Day10.computeJoltageRepartition([...joltages])
      expect(repartition.oneJolt).toBe(expected.oneJolt)
      expect(repartition.threeJolt).toBe(expected.threeJolt)
    }
  )
  it.each`
    joltages     | expected
    ${joltages1} | ${8}
    ${joltages2} | ${19208}
  `('should find $expected arrangements', ({ joltages, expected }) => {
     const max = Math.max(...joltages)+3
    const arrangements = Day10.computeNumberOfAdaptorsArrangement(
      [0, ...joltages, max].sort((a, b) => a - b),
      new Map()
    )
    expect(arrangements).toBe(expected)
  })
})
