import { searchStoresServices } from '../../services/masterdata'

export const queries = {
    stores: (_: void, args: any, ctx: Context) => {
        return searchStoresServices({ ctx, args })
    }
}