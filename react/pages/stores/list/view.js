import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import {
  Button,
  ButtonGroup,
  Layout,
  PageBlock,
  PageHeader,
  Table,
} from 'vtex.styleguide'
import {
  STORES_DEFAULT_QUERY,
  ACCOUNT_TYPE,
  NAVLINKS
} from '../../../constants'
import '../../../global.css'
import { storesSchema } from '../../../schemas/stores'

class StoresListView extends Component {

  static propTypes = {
    intl: intlShape.isRequired,

    data: PropTypes.object,
    queryState: PropTypes.object,

    onPrevClick: PropTypes.func,
    onNextClick: PropTypes.func,
    onInputSearchChange: PropTypes.func,
    onInputSearchSubmit: PropTypes.func,
    onInputSearchClear: PropTypes.func,
    onHeaderClick: PropTypes.func,
    onStateChange: PropTypes.func.isRequired,
  }

  handleRowClick = (rowData, e) => {
    if (e.target.getAttribute('preventrowclick')) {
      return e.stopPropagation()
    }

    const { id } = rowData
    const params = { storeId: id }

    this.context.navigate({ page: NAVLINKS.STORE, params })
  }

  handleFilters = status => {
    this.props.onStateChange(status)
  }

  handleSort = ({ sortedBy }) => {
    this.props.onHeaderClick(sortedBy)
  }

  render() {
    const {
      intl,
      data,
      queryState: {
        from,
        to,
        searchValue,
        sort,
        order,
        status
      },
      onNextClick,
      onPrevClick,
      onInputSearchChange,
      onInputSearchSubmit,
      onInputSearchClear,
    } = this.props

    const storesData = data && data.stores

    const stores = storesData && storesData.items
    const totalItems = storesData && storesData.summary.count

    return (
      <Layout
        fullWidth
        pageHeader={
          <PageHeader
            title={intl.formatMessage({ id: 'stores.list.title' })}
          />
        }
      >
        <PageBlock variation="full">
          {/* FILTERS */}
          <div className="mb4">
            <ButtonGroup
              buttons={[
                <Button
                  isActiveOfGroup={status === ACCOUNT_TYPE.ALL}
                  size="small"
                  onClick={() => this.handleFilters(ACCOUNT_TYPE.ALL)}
                >
                  {intl.formatMessage({ id: 'store.form.filter.all' })}
                </Button>,
                <Button
                  isActiveOfGroup={status === ACCOUNT_TYPE.MARKETPLACES}
                  size="small"
                  onClick={() => this.handleFilters(ACCOUNT_TYPE.MARKETPLACES)}
                >
                  {intl.formatMessage({ id: 'store.form.filter.marketplaces' })}
                </Button>,
                <Button
                  isActiveOfGroup={status === ACCOUNT_TYPE.SELLERS}
                  size="small"
                  onClick={() => this.handleFilters(ACCOUNT_TYPE.SELLERS)}
                >
                  {intl.formatMessage({ id: 'store.form.filter.sellers' })}
                </Button>
              ]}
            />
          </div>

          {/* STORES TABLE */}
          <Table
            fullWidth
            loading={data.loading}
            emptyStateLabel={intl.formatMessage({ id: 'stores.empty' })}
            schema={storesSchema({ intl })}
            items={stores || []}
            dynamicRowHeight={true}
            toolbar={{
              inputSearch: {
                value: searchValue,
                placeholder: intl.formatMessage({
                  id: 'store.form.search.placeholder',
                }),
                onChange: onInputSearchChange,
                onClear: onInputSearchClear,
                onSubmit: onInputSearchSubmit,
              }
            }}
            pagination={{
              onNextClick: onNextClick,
              onPrevClick: onPrevClick,
              currentItemFrom: from + 1,
              currentItemTo:
                totalItems < STORES_DEFAULT_QUERY.rowsLength
                  ? totalItems
                  : to + 1,
              textShowRows: intl.formatMessage({ id: 'showRows' }),
              textOf: intl.formatMessage({ id: 'of' }),
              totalItems: totalItems || 0,
            }}
            onRowClick={({ rowData, event }) =>
              this.handleRowClick(rowData, event)
            }
            onSort={this.handleSort}
            sort={{
              sortedBy: sort,
              sortOrder: order.toUpperCase(),
            }}
          />
        </PageBlock>
      </Layout>
    )
  }
}

export default injectIntl(StoresListView)
