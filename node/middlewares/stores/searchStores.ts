import { DEFAULT_ACRONYM, DEFAULT_SEARCH_SIZE } from '../../constants'

export async function searchStores(ctx: Context, next: () => Promise<any>) {
    const { clients: { masterdata: MasterdataClient } } = ctx
    const pagination: PaginationArgs = { page: ctx.query.page || 1, pageSize: DEFAULT_SEARCH_SIZE }
    const id = ctx.query.id || ''
    let masterdataResponse

    if (id === '') {
        masterdataResponse = MasterdataClient.searchDocuments({ acronym: DEFAULT_ACRONYM, pagination })
    }
    else {
        masterdataResponse = MasterdataClient.getDocument({ acronym: DEFAULT_ACRONYM, id })
    }


    ctx.body = await masterdataResponse

    await next()
}
