import React, { Component } from 'react'

import StoresList from './query'

import { stopLoading } from '../../../utils'
import { STORES_DEFAULT_QUERY } from '../../../constants'

const rowsLength = STORES_DEFAULT_QUERY.rowsLength

class StoresRoot extends Component {
  state = {
    ...STORES_DEFAULT_QUERY
  }

  static contextTypes = {
    route: PropTypes.object,
  }

  componentDidMount() {
    stopLoading()
  }

  handlePrev = () => {
    const from = this.state.from - rowsLength
    const to = this.state.to - rowsLength
    const page = this.state.page > 1 ? this.state.page-- : this.state.page

    this.setState({ from, to, page })
  }

  handleNext = () => {
    const from = this.state.from + rowsLength
    const to = this.state.to + rowsLength
    const page = this.state.page++

    this.setState({ from, to, page })
  }

  handleInputSearchChange = e => {
    const searchValue = e.target.value
    this.setState({ searchValue })
  }

  handleInputSearchSubmit = e => {
    e.preventDefault()
    const { searchValue } = this.state
    const from = STORES_DEFAULT_QUERY.from
    const to = STORES_DEFAULT_QUERY.to
    const sort = STORES_DEFAULT_QUERY.sort
    const order = STORES_DEFAULT_QUERY.order
    const companyName = searchValue

    this.setState({
      from,
      to,
      sort,
      order,
      companyName
    })
  }

  handleInputSearchClear = () => {
    this.setState({ ...STORES_DEFAULT_QUERY })
  }

  handleHeaderClick = sort => {
    const order = this.state.order.toLowerCase() === 'asc' ? 'desc' : 'asc'
    const from = STORES_DEFAULT_QUERY.from
    const to = STORES_DEFAULT_QUERY.to

    this.setState({ sort, order, from, to })
  }

  handleStateChange = status => {
    this.setState({ status })
  }

  render() {
    return (
      <StoresList
        queryState={{ ...this.state }}
        onNextClick={this.handleNext}
        onPrevClick={this.handlePrev}
        onInputSearchChange={this.handleInputSearchChange}
        onInputSearchSubmit={this.handleInputSearchSubmit}
        onInputSearchClear={this.handleInputSearchClear}
        onHeaderClick={this.handleHeaderClick}
        onStateChange={this.handleStateChange}
      />
    )
  }
}

export default StoresRoot
