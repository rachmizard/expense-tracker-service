import { ReqRefDefaults, Server, ServerRoute } from '@hapi/hapi'
import authRoutes from './auth.route'

const routes: ServerRoute<ReqRefDefaults>[] = [...authRoutes]

export default {
  name: 'routes',
  version: '1.0.0',
  register: async (server: Server) => {
    server.route(routes)
  },
}
