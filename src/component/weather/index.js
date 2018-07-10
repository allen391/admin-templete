import React, { Component } from 'react'
import axios from '../../axios/index'
import './index.less'

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount(){
    this.getWeatherAPIData()
  }
  getWeatherAPIData(){
    let city = this.props.weatherConfig.city
    let appid = this.props.weatherConfig.appid
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
  
  render() {
    return (
      <div className="weather-wrapper">
        <span className="weather-img">
          {this.state.city}:
        </span>
        <span className="weather-detail">
          {this.state.weather}
        </span>
      </div>
    )
  }
}

export default Weather
