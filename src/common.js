import React, { Component } from 'react';
import {Row, Col} from 'antd';
import Header from './component/Header/index';
import './style/common.less';

class Common extends Component {
  render() {
    return (
      <div>
        <Row className="simple-page">
          <Header menuType="Second"/>
        </Row>
        <Row>
          {this.props.children}
        </Row>
      </div>
    )
  }
};

export default Common;