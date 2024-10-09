import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  setup: async () => {
    return {
      teardown() {},
    }
  },
}
