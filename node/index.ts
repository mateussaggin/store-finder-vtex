// Enable this is production
// import { ClientsConfig, LRUCache, Service } from '@vtex/api'

// Remove this is production
import { ClientsConfig, Service } from '@vtex/api'

import { Clients } from './clients'
import { validate } from './middlewares/common'
import { searchStores } from './middlewares/stores'
import { resolvers } from './resolvers'
import { schemaDirectives } from './directives'

const TIMEOUT_MS = 800

// Enable this is production
//const memoryCache = new LRUCache<string, any>({ max: 1 })
//metrics.trackCache('stores', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 3,
      timeout: TIMEOUT_MS,
    },
    // Enable this is production
    // status: {
    //   memoryCache,
    // },
  },
}

// @ts-ignore
export default new Service<Clients, State>({
  clients,
  routes: {
    'stores': [
      validate,
      searchStores
    ]
  },
  graphql: {
    resolvers,
    schemaDirectives
  }
})
