import React, { Component } from 'react'
import PropTypes from 'prop-types'

import StoresRoot from './pages/stores/list'
//import StoreDetails from './pages/stores/details'

import { NAVLINKS } from './constants'

class FinderRoot extends Component {
  static contextTypes = {
    page: PropTypes.any,
  }

  render() {
    const { page } = this.context

    switch (page) {
      case NAVLINKS.STORES:
        return <StoresRoot />
      // case NAVLINKS.STORE:
      //   return <StoreDetails />
      default:
        return <div>404</div>
    }
  }
}

export default FinderRoot
