import dotenv from 'dotenv'

dotenv.config()

const config = {
  port: process.env.PORT || 3000,
  isDev: process.env.NODE_ENV !== 'production',
  isProd: process.env.NODE_ENV === 'production',
  jwtSecret: process.env.JWT_SECRET,
  jwtVerify: {
    aud: 'urn:audience:test',
    iss: 'urn:issuer:test',
    sub: false,
    nbf: true,
    exp: true,
    maxAgeSec: 14400, // 4 hours
    timeSkewSec: 15,
  },
  env: {
    development: {
      mongoDBUrl: process.env.MONGO_DB_URL,
    },
    production: {
      mongoDBUrl: process.env.MONGO_DB_URL,
    },
  },
}

const envConfig =
  config.env[
    (process.env.NODE_ENV as 'production' | 'development') || 'development'
  ]

export { config, envConfig }
