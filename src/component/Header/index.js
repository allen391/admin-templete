import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './index.less';
import Util from '../../utils/utils';
// import axios from '../../axios/index';

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  };
  
  componentWillMount(){
    setInterval(() => {
      let sysTime = Util.formateDate(new Date().getTime())
      this.setState({sysTime})
    }, 1000)
    // this.getWeatherAPIData();
  }
  // getWeatherAPIData(){
  //   axios.jsonp({
  //     url: ''
  //   }).then((res) => {
  //     if (res.status === 'success') {
  //       let data = res.results[0].weather_data[0]
  //       this.setState({
  //         dayPictureUrl: data.dayPictureUrl,
  //         weather: data.weather
  //       })
  //     }
  //   })
  // }
  render() {
    const menuType = this.props.menuType
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
            <span>Welcome, xxx</span>
            <a href="#">Logout</a>
          </Col>
        </Row>
        {
          menuType? '':
          <Row className="breadcrumb">
            <Col span="4" className="breadcrumb-title">
              HomePage
            </Col>
            <Col span="20" className="weather">
              <span className="date">{this.state.sysTime}</span>
              <span className="weather-img">
                <img src="{this.state.dayPictureUrl}" alt=""/>
              </span>
              <span className="weather-detail">
                qing
              </span>
            </Col>
          </Row>
        }
      </div>
    )
  }
};

export default Header;
