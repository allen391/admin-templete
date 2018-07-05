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
      orderConfirmVisible: false,
      orderInfo: {},
      selectedRowKeys: []
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
    let item = this.state.selectedItem
    if (!item) {
      Modal.info({
        title: 'Info',
        content: 'Select your Order'
      })
      return
    }
    axios.ajax({
      url:'/order/ebike_info',
      data:{
          params:{
              orderId: item.id
          }
      }
    }).then((res)=>{
        if(res.code ==0 ){
            this.setState({
                orderInfo:res.result,
                orderConfirmVisible: true
            })
        }
    })
  }
  handleFinishOrder = () =>{
    let item = this.state.selectedItem
    axios.ajax({
      url: '/order/finish_order',
      data: {
        params: {
          orderId: item.id
        }
      }
    }).then((res) => {
      if (res.code == 0) {
        message.success('success!')
        this.setState({
          orderConfirmVisible: false
        })
        this.renderItemList()
      }
    })
  }
  onRowClick = (record, index) => {
    let selectedKey = [index]
    this.setState({
      selectedRowKeys: selectedKey,
      selectedItem: record
    })
  }
  openOrderDetail = () => {
    let item = this.state.selectedItem
    if (!item) {
      Modal.info({
        title: 'Info',
        content: 'select one order'
      })
      return
    }
    window.open(`#/common/order/detail/${item.id}`, '_blank')
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
        dataIndex: 'distance',
        render(distance){
          return distance/1000 + 'Km'
        }
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
    const selectedRowKeys = this.state.selectedRowKeys
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }
    return (
      <div>
        <Card>
          <FilterForm />
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type="primary" onClick={this.openOrderDetail}>Detail</Button>
          <Button type="primary" style={{marginLeft: 10}} onClick={this.handleClick}>Cancel</Button>
        </Card>
        <div className="content-wrap">
          <Table 
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index)
                }
              }
            }}
          />
        </div>
        <Modal
          title="结束订单"
          visible={this.state.orderConfirmVisible}
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
