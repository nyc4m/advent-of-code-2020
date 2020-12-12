import * as Day12 from './'
describe('day12', () => {
  it('should parse input', () => {
    const input = `F10
        R90
        L90
        W145
        N89
        E1
        S1`
    expect(Day12.parseDirections(input)).toEqual([
      { action: 'F', value: 10 },
      { action: 'R', value: 90 },
      { action: 'L', value: 90 },
      { action: 'W', value: 145 },
      { action: 'N', value: 89 },
      { action: 'E', value: 1 },
      { action: 'S', value: 1 },
    ])
  })
  it('should find manhattan distance', () => {
    const distance = Day12.navigate(
      { orientation: 'E', x: 0, y: 0 },
      [
        { action: 'F', value: 10 },
        { action: 'N', value: 3 },
        { action: 'F', value: 7 },
        { action: 'R', value: 90 },
        { action: 'F', value: 11 },
      ],
      new Day12.Compass()
    )
    expect(distance).toBe(25)
  })
  describe('compass', () => {
    const compass = new Day12.Compass()
    it.each`
      fromDirection | rotation                       | expected
      ${'N'}        | ${{ action: 'L', value: 90 }}  | ${'W'}
      ${'N'}        | ${{ action: 'R', value: 90 }}  | ${'E'}
      ${'N'}        | ${{ action: 'R', value: 180 }} | ${'S'}
      ${'S'}        | ${{ action: 'R', value: 180 }} | ${'N'}
      ${'S'}        | ${{ action: 'L', value: 180 }} | ${'N'}
      ${'E'}        | ${{ action: 'R', value: 90 }}  | ${'S'}
    `(
      'should rotate from $fromDirection to $expected with $rotation',
      ({ fromDirection, rotation, expected }) => {
        expect(
          compass.rotateFrom(fromDirection, rotation.action, rotation.value)
        ).toBe(expected)
      }
    )
  })
})
