import { cleanError, ResolverError } from '@vtex/api'
import { path } from 'ramda'

export function getCurrentUserFromSession(
  context: Context,
  type: 'CUSTOMER' | 'ADMIN'
): Promise<CurrentUser | null> {
  const {
    clients: { session },
  } = context

  return session
    .getSession(context.vtex.sessionToken as string, ['*'])
    .then(currentSession => {
      const thisSession = currentSession.sessionData as Session

      if (!thisSession || !thisSession.namespaces) {
        throw new ResolverError('Error fetching session data')
      }

      let idPath: string[]
      let emailPath: string[]

      if (type === 'ADMIN') {
        idPath = ['namespaces', 'authentication', 'adminUserId', 'value']
        emailPath = ['namespaces', 'authentication', 'adminUserEmail', 'value']
      } else {
        idPath = ['namespaces', 'profile', 'id', 'value']
        emailPath = ['namespaces', 'profile', 'email', 'value']
      }

      return {
        email: path(emailPath, thisSession) as string,
        userId: path(idPath, thisSession) as string,
      }
    })
    .catch((e: unknown) => {
      console.error(cleanError(e))
      return null
    })
}
