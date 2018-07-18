import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './index.less';
import Util from '../../utils/utils';
import Weather from '../weather/index';
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: 'Allencth'
    };
  };
  componentWillMount(){
    setInterval(() => {
      let sysTime = Util.formateDate(new Date().getTime())
      this.setState({sysTime})
    }, 1000)
  }
  render() {
    const menuType = this.props.menuType
    const weatherConfig = {
      appid: '1d8b0e3ad58a9f70188f4abaa1c8336a'
    }
    return (
      <div className="header">
        <Row className="header-top">
          {
            menuType?
              <Col span="6" className="logo">
                <img src="/assets/logo-ant.svg" alt=""/>
                <span>Admin System</span>
              </Col>:null
          }
          <Col span={menuType? 18:24}>
            <span>Welcome, {this.state.userName}</span>
            <a href="#">Logout</a>
          </Col>
        </Row>
        {
          menuType? '':
          <Row className="breadcrumb">
            <Col span="4" className="breadcrumb-title">
              {/*make it dynamic later*/}
              HomePage
            </Col>
            <Col span="20" className="weather">
              <span className="date">{this.state.sysTime}</span>
              <Weather weatherConfig={weatherConfig}/>
            </Col>
          </Row>
        }
      </div>
    )
  }
};

export default Header;
