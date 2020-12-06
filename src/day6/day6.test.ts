import {
  computeNumberOfAnswerWhereEveryoneSaidYes,
  findUniqueAnswers,
  calculateAnswerSum,
} from './'
const input = [
  'abc',
  `a
      b
      c`,
  `ab
      bc`,
  `a
      a
      a
      a`,
  `b`,
]
describe('day6', () => {
  describe('part 1', () => {
    it('should return 3 when abc', () => {
      expect(findUniqueAnswers('abc')).toBe(3)
    })
    it('should find 11 distinct answers', () => {
      expect(calculateAnswerSum(input, findUniqueAnswers)).toBe(11)
    })
  })
  describe('part 2 : everyone should answer yes', () => {
    it.each`
      input             | expected
      ${'ab\nbc'}       | ${1}
      ${'a\na\na\na'} | ${1}
    `('should return $expected when $input', ({ input, expected }) => {
      expect(computeNumberOfAnswerWhereEveryoneSaidYes(input)).toBe(expected)
    })
    it("should compite 6", () => {
      expect(calculateAnswerSum(input, computeNumberOfAnswerWhereEveryoneSaidYes)).toBe(6)
    })
  })
})
