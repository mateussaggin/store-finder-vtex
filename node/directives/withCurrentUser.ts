import { AuthenticationError } from '@vtex/api'
import { defaultFieldResolver, GraphQLField } from 'graphql'
import { SchemaDirectiveVisitor } from 'graphql-tools'

import { getCurrentUserFromSession } from '../services/session'

function isLogged(user: CurrentUser | null) {
  return user?.email
}

export class WithCurrentUser extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async (root: any, args: any, context: any, info: any) => {
      const currentUser: CurrentUser | null = await getCurrentUserFromSession(
        context,
        this.args.userType
      )

      if (!isLogged(currentUser)) {
        throw new AuthenticationError('User not authenticated')
      }

      context.vtex.currentUser = currentUser as CurrentUser

      return resolve(root, args, context, info)
    }
  }
}
