import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import Stores from '../../../graphql/stores/Stores.gql'

import StoresListView from './view'

class StoresList extends Component {
  static propTypes = {
    data: PropTypes.object,
    error: PropTypes.any,
    queryState: PropTypes.object,

    onNextClick: PropTypes.func,
    onPrevClick: PropTypes.func,
    onInputSearchChange: PropTypes.func,
    onInputSearchSubmit: PropTypes.func,
    onInputSearchClear: PropTypes.func,
    onHeaderClick: PropTypes.func
  }

  render() {
    return <StoresListView {...this.props} />
  }
}

// export default graphql(Stores, {
//   options: props => ({ variables: { ...props.queryState }, ssr: false }),
// })(StoresList)

export default graphql(Stores, {
  options(props) {
    console.log('query.js props.queryState: ', props.queryState)
    return {
      variables: props.queryState,
      ssr: true
    };
  },
})(StoresList);