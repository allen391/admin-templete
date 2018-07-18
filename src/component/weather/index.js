import React, { Component } from 'react'
import axios from '../../axios/index'
import './index.less'
import {Select, Form} from 'antd'

const Option = Select.Option
class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: "Sydney"
    }
  }
  componentWillMount(){

  }
  getWeatherAPIData(){
    let appid = this.props.weatherConfig.appid
    let city = this.state.city
    axios.jsonp({
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`
    }).then((res) => {
      if (res.cod == 200) {
        let data = res.weather[0]
        let city = res.name
        this.setState({
          weather: data.description,
          city
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  handleSelect = (value) => {
    this.setState({
      city: value.label
    }, () => {
      this.getWeatherAPIData()
    })
  }
  render() {
    return (
      <div className="weather-wrapper">
        <div className="weather-img">
        <Select defaultValue={{key: 'sydney'}} labelInValue onChange={this.handleSelect}>
          <Option value="sydney">Sydney</Option>
          <Option value="brisbane">Brisbane</Option>
          <Option value="melbourne">Melbourne</Option>
        </Select>
        </div>
        <span className="weather-detail">
          {this.state.weather}
        </span>
      </div>
    )
  }
}

export default Weather
