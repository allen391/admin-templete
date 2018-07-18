import React, { Component } from 'react'
import {Card} from 'antd'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
import echartTheme from '../echartTheme'

export class ECharts extends Component {
  componentWillMount(){
    echarts.registerTheme('Order', echartTheme)
  }
  getOption = () => {
    let option = {
      title: {
        text: 'rider order'
      },
      xAxis: {
        data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'order',
          type: 'bar',
          data: [1000, 2000, 1500, 2000, 2300, 3000, 5000]
        }
      ]
    }
    return option
  }
  getOption2 = () => {
      let option = {
          title: {
              text: 'Order'
          },
          tooltip : {
              trigger: 'axis'
          },
          legend:{
              data:['OFO','MoBike','Blue']
          },
          xAxis: {
              data: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday'
              ]
          },
          yAxis: {
              type: 'value'
          },
          series: [
              {
                  name: 'OFO',
                  type: 'bar',
                  data: [
                      2000,
                      3000,
                      5500,
                      7000,
                      8000,
                      12000,
                      20000
                  ]
              },
              {
                  name: '摩拜',
                  type: 'bar',
                  data: [
                      1500,
                      3000,
                      4500,
                      6000,
                      8000,
                      10000,
                      15000
                  ]
              },
              {
                  name: '小蓝',
                  type: 'bar',
                  data: [
                      1000,
                      2000,
                      2500,
                      4000,
                      6000,
                      7000,
                      8000
                  ]
              },
          ]
      }
      return option;
  }
  render() {
    return (
      <div>
        <Card title="Bar Chart 1">
          <ReactEcharts 
            option={this.getOption()}
            notMerge={true}
            lazyUpdate={true}
            theme={"Order"}
            style={{height: 500}}
          />
        </Card>  
        <Card title="Bar Chart 2"> 
          <ReactEcharts 
            option={this.getOption2()}
            notMerge={true}
            lazyUpdate={true}
            style={{height: 500}}
            theme={"Order"}
          />
        </Card>
      </div>
    )
  }
}

export default ECharts


