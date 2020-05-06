import { DEFAULT_ACRONYM, DEFAULT_SEARCH_SIZE } from '../constants'

export async function searchStoresServices({
    ctx,
    args
}: {
    ctx: Context
    args: any
}) {
    const {
        clients: { masterdata: MasterdataClient },
    } = ctx

    let masterdataResponse

    const pagination: PaginationArgs = { page: args.page || 1, pageSize: DEFAULT_SEARCH_SIZE }

    const data = {
        acronym: DEFAULT_ACRONYM,
        pagination,
        companyName: args.companyName || '',
        schema: args.schema || '',
        sort: args.sort || '',
        order: args.order || 'ASC',
        id: args.id || ''
    }

    if (data.id === '') {
        masterdataResponse = MasterdataClient.searchDocuments(data)
    } else {
        masterdataResponse = MasterdataClient.getDocument(data)
    }

    return masterdataResponse
}