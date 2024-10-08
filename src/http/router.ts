import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { verifyJWT } from './middlewares/verify-jwt'

export const appRoutes = async (app: FastifyInstance) => {
  // ============================ unauthenticated routes
  app.post('/users', register)
  app.post('/session', authenticate)

  // ============================ authenticated routes
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
