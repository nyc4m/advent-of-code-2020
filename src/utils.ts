import { promises as fs } from 'fs'

export async function readFileAsString(path: string) {
  return (await fs.readFile(path)).toString('utf8')
}
