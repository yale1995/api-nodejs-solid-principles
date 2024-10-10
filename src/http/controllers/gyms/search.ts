import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export const search = async (request: FastifyRequest, reply: FastifyReply) => {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { page, q } = searchGymsQuerySchema.parse(request.query)

  const searchGymsUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymsUseCase.execute({ page, query: q })

  return reply.status(200).send({ gyms })
}
