import { expect, it, describe, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let sut: SearchGymsUseCase
let gymsRepository: InMemoryGymsRepository

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    gymsRepository.create({
      title: 'JavaScript Gym',
      latitude: -5.8851328,
      longitude: -35.1797405,
      description: null,
      phone: null,
    })

    gymsRepository.create({
      title: 'Typescript Gym',
      latitude: -5.8851328,
      longitude: -35.1797405,
      description: null,
      phone: null,
    })

    const { gyms } = await sut.execute({ query: 'JavaScript', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        latitude: -5.8851328,
        longitude: -35.1797405,
        description: null,
        phone: null,
      })
    }

    const { gyms } = await sut.execute({ query: 'JavaScript', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
