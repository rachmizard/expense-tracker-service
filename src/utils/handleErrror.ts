import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi'

const handleValidationError = function (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit,
  err: Error | any
) {
  if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
    const invalidItem = err.details[0]
    return h
      .response({
        message: invalidItem.message,
        path: invalidItem.path,
        errors: err.details,
      })
      .code(400)
      .takeover()
  }

  return h.response(err).takeover()
}

export default handleValidationError
