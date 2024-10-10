import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gracie Barra - Ponta Negra',
        latitude: -5.8834553,
        longitude: -35.1798397,
        description: null,
        phone: null,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gracie Barra - Coahbinal',
        latitude: -5.9219472,
        longitude: -35.2687805,
        description: null,
        phone: null,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({ latitude: -5.886636, longitude: -35.177908 })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
