import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    gymsRepository.create({
      title: 'Gracie Barra - Ponta Negra',
      latitude: -5.8834553,
      longitude: -35.1798397,
      description: null,
      phone: null,
    })

    gymsRepository.create({
      title: 'Gracie Barra - Coahbinal',
      latitude: -5.9219472,
      longitude: -35.2687805,
      description: null,
      phone: null,
    })

    const { gyms } = await sut.execute({
      userLatitude: -5.886636,
      userLongitude: -35.177908,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gracie Barra - Ponta Negra' }),
    ])
  })
})
