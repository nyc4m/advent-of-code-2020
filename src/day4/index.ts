import { readFileAsString } from '../utils'

const REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

export interface OfficialDocument {
  byr?: string
  iyr?: string
  eyr?: string
  hgt?: string
  hcl?: string
  ecl?: string
  pid?: string
}

function parseField(fieldValue: string): { name: string; value: string } {
  const splitted = fieldValue.split(':')
  return { name: splitted[0], value: splitted[1] }
}

export function parseOfficialDocument(document: string): OfficialDocument {
  return document
    .split(/\n| /)
    .map(parseField)
    .reduce(
      (obj, field) => ({
        ...obj,
        [field.name]: field.value,
      }),
      {}
    )
}

export function getDocuments(input: string): Array<string> {
  return input.split('\n\n')
}

export function validateDocumentFields(
  documents: OfficialDocument[],
  validation: (document: OfficialDocument) => boolean,
  validPasswords: number = 0
): number {
  const [document, ...restOfDocuments] = documents
  const valid = validation(document) ? 1 : 0
  if (documents.length === 1) {
    return valid + validPasswords
  }
  return validateDocumentFields(
    restOfDocuments,
    validation,
    valid + validPasswords
  )
}

export function executeFullDocumentValidation(
  document: OfficialDocument
): boolean {
  if (!requiredAllFields(document)) {
    return false
  }
  const validations = [
    isBetweenInclusive(parseInt(document.byr!), 1920, 2002),
    isBetweenInclusive(parseInt(document.iyr!), 2010, 2020),
    isBetweenInclusive(parseInt(document.eyr!), 2010, 2030),
    isHeightOk(document.hgt!),
    isColorValid(document.hcl!),
    isEyeColorValid(document.ecl!),
    isPidValid(document.pid!),
  ]

  return !validations.includes(false)
}

export const requiredAllFields = (document: OfficialDocument): boolean =>
  !REQUIRED_FIELDS.map((requiredField) =>
    Object.keys(document).includes(requiredField)
  ).includes(false)
const isBetweenInclusive = (
  value: number,
  min: number,
  max: number
): boolean => {
  const ok = value >= min && value <= max
  return ok
}

export const isHeightOk = (value: string): boolean => {
  if (!/cm|in/.test(value)) {
    return false
  }
  const height = parseInt(value.substr(0, value.length - 2), 10)
  if (/cm/.test(value)) {
    return isBetweenInclusive(height, 150, 193)
  }
  return isBetweenInclusive(height, 59, 76)
}

export const isColorValid = (value: string): boolean => {
  return /^#([0-9]|[a-f]){6}$/.test(value)
}

export const isEyeColorValid = (value: string): boolean =>
  ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)

export const isPidValid = (value: string): boolean => {
  return /^\d{9}$/.test(value)
}

async function part1() {
  const input = readFileAsString('./src/day4/input_day4')
  const documents = getDocuments(await input).map(parseOfficialDocument)
  const validPasswords = validateDocumentFields(documents, requiredAllFields)
  console.log(`valid passports : ${validPasswords}`)
}

async function part2() {
  const input = readFileAsString('./src/day4/input_day4')
  const documents = getDocuments(await input).map(parseOfficialDocument)
  const validPasswords = validateDocumentFields(
    documents,
    executeFullDocumentValidation
  )
  console.log(`valid passports : ${validPasswords}`)
}

export const day4 = {
  part1,
  part2,
}
