import {
  getDocuments,
  validateDocumentFields,
  parseOfficialDocument,
  requiredAllFields,
  executeFullDocumentValidation,
  isHeightOk,
  isColorValid,
  isEyeColorValid,
  isPidValid,
} from '.'

const input = `
ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in
`

const validPassport = `
pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719
`

const invalidPasswords = `
eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007
`

describe('day4', () => {
  describe('only require fields', () => {
    it('should contain 4 passports', () => {
      expect(getDocuments(input)).toHaveLength(4)
    })
    it('should contain 2 valid password', () => {
      const validPasswords = validateDocumentFields(
        getDocuments(input).map(parseOfficialDocument),
        requiredAllFields
      )
      expect(validPasswords).toBe(2)
    })
  })
  describe('validate fields', () => {
    it('should execute validations and find valid passwords', () => {
      const passports = getDocuments(validPassport).map(parseOfficialDocument)
      expect(
        validateDocumentFields(passports, executeFullDocumentValidation)
      ).toBe(4)
    })
    it('should all be invalid', () => {
      const passports = getDocuments(invalidPasswords).map(
        parseOfficialDocument
      )
      expect(
        validateDocumentFields(passports, executeFullDocumentValidation)
      ).toBe(0)
    })
  })
  describe('isHeightOk', () => {
    it.each(['167cm', '193cm', '150cm', '59in', '76in'])(
      'should validate %s',
      (value) => {
        expect(isHeightOk(value)).toBeTruthy()
      }
    )
    it.each(['194cm', '149cm', '58in', '77in', '0in', '0cm'])(
      'should not validate %s',
      (value) => {
        expect(isHeightOk(value)).toBeFalsy()
      }
    )
  })
  describe('isColorValid', () => {
    it.each(['#623a2f', '#a97842', '#b6652a'])(
      'should validate %s',
      (value) => {
        expect(isColorValid(value)).toBeTruthy()
      }
    )
    it.each(['#6234a2f', '#A97842', '#b62a'])('should validate %s', (value) => {
      expect(isColorValid(value)).toBeFalsy()
    })
  })
  describe('isEyeColorOk', () => {
    it.each(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'])(
      'should validate %s',
      (value) => {
        expect(isEyeColorValid(value)).toBeTruthy()
      }
    )
    it('should not validate rougeSaMère', () => {
      expect(isEyeColorValid('rougeSaMère')).toBeFalsy()
    })
  })
  describe('isPidOk', () => {
    it.each(['087499704', '896056539', '545766238', '093154719'])(
      'should validate %s',
      (value) => {
        expect(isPidValid(value)).toBeTruthy()
      }
    )

    it.each(['08749970', '8960565399', '545AAA238', 'abcdefgha'])(
      'should not validate %s',
      (value) => {
        expect(isPidValid(value)).toBeFalsy()
      }
    )
  })
})
