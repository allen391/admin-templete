import React, { Component } from 'react'

class BMap extends Component {
  const positionInfo = this.props.positionInfo
  render() {
    return (
      <div id="orderDetailMap" className="order-map"></div>
    )
  }
}

export default BMap
