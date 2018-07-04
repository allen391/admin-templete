import React, { Component } from 'react';
import {Row, Col} from 'antd';
import Header from './component/Header/index';
import Footer from './component/Footer/index';
import './style/common.less';
import NavLeft from './component/Navleft/index';
import Home from './pages/home/index';

class Admin extends Component {
  render() {
    return (
      <Row className="container">
        <Col span="4" className="nav-left">
          <NavLeft />
        </Col>
        <Col span="20" className="main">
          <Header></Header>
          <Row className="content">
            {this.props.children}
          </Row>
          <Footer></Footer>
        </Col>
      </Row>
    )
  }
};

export default Admin;
