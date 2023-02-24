import User from 'models/user.model'

type ArtifactPayload = {
  aud: string
  iss: string
  sub: string
  maxAgeSec: number
  timeSkewSec: number
  iat: number
}

type Artifacts<P = {}> = {
  token: string
  decoded: {
    header: { alg: 'HS256'; typ: 'JWT' }
    payload: P
    signature: string
  }
  raw: any
  keys: any
}

export default async function validateJWTAuth(
  artifacts?: Artifacts<ArtifactPayload>
) {
  const { sub } = artifacts?.decoded.payload || {}
  const user = await User.findById(sub).exec()

  if (!user) {
    return { isValid: false }
  }

  return {
    isValid: true,
    credentials: { user: user },
  }
}
