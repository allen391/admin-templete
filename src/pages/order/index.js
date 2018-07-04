import React, { Component } from 'react'
import {Card, Button, Table, Form, Select, Modal, message} from 'antd';
import FilterForm from '../../component/FilterForm/index';
import axios from '../../axios/index';
import Utils from '../../utils/utils';
import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';

class Order extends Component {
  constructor(props) {
    super(props)
    this.state = {
       list: [],
       pagination: '',
       orderConfirmVisble: false,
       orderInfo: {}
    };
  };
  componentDidMount(){
    this.renderItemList()
  }
  params = {
    page: 1
  }
  renderItemList = () => {
    let _this = this
    axios.ajax({
      url: '/order/list',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res) => {
      let list = res.result.item_list.map((item, index) => {
        item.key = index
        return item
      })
      this.setState({
        list,
        pagination: Utils.pagination(res, (current) => {
          _this.params.page = current
          _this.renderItemList()
        })
      })
    })
  }
  handleClick = () => {
    axios.ajax({
      url:'/order/ebike_info',
      data:{
          params:{
              page: 1
          }
      }
    }).then((res)=>{
        if(res.code ==0 ){
            this.setState({
                orderInfo:res.result,
                orderConfirmVisble: true
            })
        }
    })
  }

  handleFinishOrder = () =>{
    //todo
    axios.ajax({
      url: '/order/finish_order',
      data: {
        params: 1
      }
    }).then((res) => {
      if (res.code == 0) {
        message.success('success!')
        this.setState({
          orderConfirmVisble: false
        })
        this.renderItemList()
      }
    })
  }
  render() {
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'order_sn'
      },
      {
        title: '车辆编号',
        dataIndex: 'bike_sn'
      },
      {
        title: '用户名',
        dataIndex: 'user_name'
      },
      {
        title: '手机号',
        dataIndex: 'mobile'
      },
      {
        title: '里程',
        dataIndex: 'distance'
      },
      {
        title: '行驶时长',
        dataIndex: 'total_time'
      },
      {
        title: '状态',
        dataIndex: 'status'
      },
      {
        title: '开始时间',
        dataIndex: 'start_time'
      },
      {
        title: '结束时间',
        dataIndex: 'end_time'
      },
      {
        title: '订单金额',
        dataIndex: 'total_fee'
      },
      {
        title: '实付金额',
        dataIndex: 'user_pay'
      }
    ]
    const formItemLayout = {
      labelCol: {span:5},
      wrapperCol: {span:19}
    }
    return (
      <div>
        <Card>
          <FilterForm />
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type="primary">Detail</Button>
          <Button type="primary" style={{marginLeft: 10}} onClick={this.handleClick}>Cancel</Button>
        </Card>
        <div className="content-wrap">
          <Table 
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
        <Modal
          title="结束订单"
          visible={this.state.orderConfirmVisble}
          onCancel={()=>{
              this.setState({
                  orderConfirmVisble:false
              })
          }}
          onOk={this.handleFinishOrder}
          width={600}
        >
          <Form layout="horizontal">
            <Form.Item label="车辆编号" {...formItemLayout}>
              {this.state.orderInfo.bike_sn}
            </Form.Item>
            <Form.Item label="剩余电量" {...formItemLayout}>
              {this.state.orderInfo.battery + '%'}
            </Form.Item>
            <Form.Item label="行程开始时间" {...formItemLayout}>
              {this.state.orderInfo.start_time}
            </Form.Item>
            <Form.Item label="当前位置" {...formItemLayout}>
              {this.state.orderInfo.location}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Order
