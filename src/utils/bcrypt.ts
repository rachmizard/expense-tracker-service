import bcrypt from 'bcrypt'

class BcryptConfig {
  static hash = (password: string): string => {
    return bcrypt.hashSync(password, 10)
  }

  static compare = (password: string, hash: string): boolean => {
    return bcrypt.compareSync(password, hash)
  }
}

export default BcryptConfig
