interface SearchArgs {
    acronym: string
    fields?: string[]
    companyName?: string
    pagination: PaginationArgs
    schema?: string
    sort?: string
    order?: string
}

interface PaginationArgs {
    page: number
    pageSize: number
}

interface GetArgs {
    acronym: string
    id: string
}