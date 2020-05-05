
import {
  InstanceOptions,
  IOContext,
  ExternalClient,
  RequestConfig,
  UserInputError,
  IOResponse,
} from '@vtex/api'

import { statusToError } from '../utils'
import { MASTERDATA_ACCOUNTNAME, API_CREDENTIALS } from '../constants/index'

function paginationArgsToHeaders({ page, pageSize }: PaginationArgs) {
  if (page < 1) {
    throw new UserInputError('Smallest page value is 1')
  }

  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize

  return {
    'REST-Range': `resources=${startIndex}-${endIndex}`,
  }
}

function generateFieldsArg(fields: any) {
  return fields ? fields.join(',') : '_all'
}

function getTotalCountFromPaginationHeader(contentRange: string) {
  const paginationRegex = /\/(\d+)$/
  const result = contentRange ? paginationRegex.exec(contentRange) : null

  return result ? parseInt(result[1], 10) : 0
}

export class MasterdataClient extends ExternalClient {
  public constructor(ctx: IOContext, options?: InstanceOptions) {
    super(`http://api.vtex.com/${MASTERDATA_ACCOUNTNAME}/dataentities`, ctx, {
      ...options,
      headers: {
        ...(options && options.headers),
        Accept: 'application/vnd.vtex.ds.v10+json',
        ...{
          'X-VTEX-API-AppKey': API_CREDENTIALS.appKey,
          'X-VTEX-API-AppToken': API_CREDENTIALS.appToken
        },
      },
    })
  }

  public searchDocuments = <T>({
    acronym,
    pagination,
    fields,
    companyName,
    schema,
    sort,
    order
  }: SearchArgs) =>
    this.getRaw<T[]>(this.routes.search(acronym), {
      headers: paginationArgsToHeaders(pagination),
      metric: 'masterdata--searchDocuments',
      params: {
        _fields: generateFieldsArg(fields),
        ...(companyName && { _where: `companyName=*${companyName}*` }),
        ...(schema && { _schema: schema }),
        ...(sort && order && { _sort: `${sort} ${order}` }),
      },
    }).then(result => {
      const items = result.data
      const summary = {
        count: getTotalCountFromPaginationHeader(result.headers['rest-content-range'])
      }

      return { items, summary }
    })

  public getDocument = <T>({
    acronym,
    id
  }: GetArgs) =>
    this.getRaw<T[]>(this.routes.get(acronym, id), {
      metric: 'masterdata--getDocument',
    }).then(result => {
      const items = result.data
      const summary = { count: 1 }

      return { items, summary }
    })

  protected get = <T>(url: string, config?: RequestConfig) => {
    return this.http.get<T>(url, config).catch(statusToError)
  }

  protected getRaw = <T>(url: string, config?: RequestConfig) =>
    this.http.getRaw<T>(url, config).catch(statusToError) as Promise<
      IOResponse<T>
    >

  private get routes() {
    return {
      search: (acronym: string) => `${acronym}/search`,
      get: (acronym: string, id: string) => `${acronym}/documents/${id}`
    }
  }
}


