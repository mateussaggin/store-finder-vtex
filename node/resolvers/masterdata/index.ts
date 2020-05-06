import { searchStoresServices } from '../../services/masterdata'

export const queries = {
    stores: (_: any, args: any, ctx: Context) => {
        return searchStoresServices({ ctx, args })
    }
}