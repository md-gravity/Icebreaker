import {scrypt, randomBytes} from 'node:crypto'
import {promisify} from 'node:util'

const scryptAsync = promisify(scrypt)

async function createPasswordHash(password: string): Promise<string> {
  const salt = randomBytes(8).toString('hex')
  const buf = (await scryptAsync(password, salt, 64)) as Buffer
  return `${buf.toString('hex')}.${salt}`
}

async function comparePasswords(
  hashed: string,
  password: string
): Promise<boolean> {
  const [hashedPassword, salt] = hashed.split('.')
  const buf = (await scryptAsync(password, salt, 64)) as Buffer
  return buf.toString('hex') === hashedPassword
}

export {createPasswordHash, comparePasswords}
