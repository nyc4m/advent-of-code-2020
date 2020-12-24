import * as Day24 from './'
describe('day24', () => {
  it('should return directions', () => {
    const directions = Day24.getDirections('sesenwnenenewseeswwswswwnenewsewsw')
    const dir = []
    for (let direction of directions) {
      dir.push(direction)
    }
    expect(dir).toEqual([
      'se',
      'se',
      'nw',
      'ne',
      'ne',
      'ne',
      'w',
      'se',
      'e',
      'sw',
      'w',
      'sw',
      'sw',
      'w',
      'ne',
      'ne',
      'w',
      'se',
      'w',
      'sw',
    ])
  })

  it.each([
    ['esew', {x: 0.5, y:-1}],
    ['nwwswee', {x:0, y:0}]
  ])(
    'should lead to coordinate',
    (input, expectedCoordinate) => {
      const coord = Day24.followPath(Day24.getDirections(input))
      expect(coord).toEqual(expectedCoordinate)
    }
  )

  it('should find 10 tiles black', () => {
    const input = `sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`
    expect(Day24.countNumberOfBlackTiles(input)).toBe(10)
  })
})
