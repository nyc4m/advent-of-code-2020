import { threadId } from 'worker_threads'
import { readFileAsString } from '../utils'

type Orientation = 'N' | 'E' | 'S' | 'W'
type Action = 'F' | 'L' | 'R' | Orientation

export type Move = {
  action: Action
  value: number
}

export function parseDirections(input: string): Move[] {
  return input.split('\n').map((line) => {
    const matches = /(?<direction>[FNESWLR]{1})(?<value>\d+)/.exec(line)
    if (!matches) {
      throw new Error('Incorrect input, got ' + line)
    }
    const direction = matches.groups?.direction
    const value = matches.groups?.value
    if (!direction || !value) {
      throw new Error(
        `parsed value is wrong, got {value: ${value}, direction: ${direction}}`
      )
    }
    return {
      action: direction as Action,
      value: parseInt(value, 10),
    }
  })
}

export class Compass {
  private readonly rightOrientations: Orientation[] = ['N', 'E', 'S', 'W']
  private readonly leftOrientations = this.rightOrientations.slice().reverse()
  constructor() {}

  private computeRotation(
    orientation: Orientation,
    offset: number,
    orientations: Orientation[]
  ) {
    const indexOfOrientation = orientations.lastIndexOf(orientation)

    const newIndex = (indexOfOrientation + offset) % orientations.length
    return orientations[newIndex]
  }

  rotateFrom(
    orientation: Orientation,
    rotation: { action: 'L' | 'R'; value: number }
  ) {
    const offset = rotation.value / 90
    return this.computeRotation(
      orientation,
      offset,
      rotation.action === 'L' ? this.leftOrientations : this.rightOrientations
    )
  }
}

export class Ferry {
  constructor(
    private _orientation: Orientation,
    private _x: number,
    private _y: number
  ) {}

  get orientation() {
    return this._orientation
  }
  moveForward(value: number) {
    return this.moveInDirection(this._orientation, value)
  }

  set orientation(value: Orientation) {
    this._orientation = value
  }

  moveInDirection(orientation: Orientation, value: number) {
    switch (orientation) {
      case 'E':
        return this.moveEast(value)
      case 'W':
        return this.moveWest(value)
      case 'S':
        return this.moveSouth(value)
      case 'N':
        return this.moveNorth(value)
    }
  }

  get y(): number {
    return this._y
  }

  get x(): number {
    return this._x
  }

  get distance(): number {
    return Math.abs(this._x) + Math.abs(this._y)
  }

  private moveEast(value: number) {
    this._x += value
  }

  private moveWest(value: number) {
    this._x -= value
  }

  private moveNorth(value: number) {
    this._y += value
  }

  private moveSouth(value: number) {
    this._y -= value
  }
}

export class Navigator {
  constructor(
    private moves: Move[],
    private ferry: Ferry,
    private compass: Compass
  ) {}

  navigate(): number {
    this.moves.forEach((m) => {
      if (m.action === 'L' || m.action === 'R') {
        this.ferry.orientation = this.compass.rotateFrom(
          this.ferry.orientation,
        //@ts-ignore
          m
        )
      } else if (m.action !== 'F') {
        this.ferry.moveInDirection(m.action, m.value)
      } else {
        this.ferry.moveForward(m.value)
      }
    })
    return this.ferry.distance
  }
}

class Day12 {
  constructor(private inputPath: string) {}

  async part1(){
    const navigator = new Navigator(await this.moves, new Ferry('E', 0, 0), new Compass())
    console.log(`distance: ${navigator.navigate()}`);
  }

  async part2(){
      throw new Error("TODO")
  }

  get moves(): Promise<Move[]> {
      return readFileAsString(this.inputPath).then(parseDirections)
  }
}

export const day12 = new Day12("./src/day12/input_day12")
