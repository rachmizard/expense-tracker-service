import { ReqRefDefaults, ResponseToolkit, server as _server } from '@hapi/hapi'
import Jwt from '@hapi/jwt'
import validateJWTAuth from 'middlewares/validateJWTAuth'
import mongoose from 'mongoose'

import router from 'routes'
import { config, envConfig } from 'utils/config'

const server = _server({
  port: config.port,
  host: 'localhost',
})

const createServer = async () => {
  await server.register(Jwt)

  server.auth.strategy('jwt', 'jwt', {
    keys: config.jwtSecret,
    verify: config.jwtVerify,
    validate: validateJWTAuth,
  })

  await server.register(router)

  await server.start()
  console.log('Server running on %s', server.info.uri)

  mongoose.set('strictQuery', true)
  mongoose.connect(envConfig.mongoDBUrl!, {}, (err) => {
    if (err) {
      console.log('Error connecting to database: ', err)
    } else {
      console.log('Connected to database')
    }
  })
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

createServer()
