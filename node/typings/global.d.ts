import { ServiceContext } from '@vtex/api'
import { Clients } from '../clients'

declare global {
    type Context = ServiceContext<Clients, State>

    interface State {
        body: any
    }

    interface CustomIOContext extends IOContext {
        currentUser?: CurrentUser
    }

    interface CurrentUser {
        email: string
        userId: string
    }
}
