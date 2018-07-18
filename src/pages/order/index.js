import React, { Component } from 'react'
import {Card, Button, Table, Form, Select, Modal, message} from 'antd';
import BaseForm from '../../component/BaseForm/BaseForm';
import axios from '../../axios/index';
import Utils from '../../utils/utils';
import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';
import ETable from '../../component/ETable/index';

class Order extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pagination: '',
      orderConfirmVisible: false,
      orderInfo: {}
    };
  };
  componentDidMount(){
    this.renderItemList()
  }
  params = {
    page: 1
  }
  formList = [
    {
      type: 'SELECT',
      label: 'City',
      field: 'city',
      placeholder: 'All',
      initialValue: '0',
      width: 80,
      list: [{id: '1', name: 'Brisbane'}, {id: '2', name: 'Sydney'}]
    },
    {
      type: 'TIME'
    },
    {
      type: 'SELECT',
      label: '订单状态',
      field: 'order_status',
      placeholder: 'All',
      initialValue: '0',
      width: 80,
      list: [{id: '1', name: '进行中'}, {id: '2', name: '结束行程'}]
    }
  ]
  renderItemList = () => {
    let _this = this
    axios.requestList(_this, '/order/list', this.params, true)
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
  openOrderDetail = () => {
    let item = this.state.selectedItem
    if (!item) {
      Modal.info({
        title: 'Info',
        content: 'select one order'
      })
      return
    }
    window.open(`/#/common/order/detail/${item.id}`, '_blank')
  }
  handleFilter = (params) => {
    this.params = params
    this.renderItemList()
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
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type="primary" onClick={this.openOrderDetail}>Detail</Button>
          <Button type="primary" style={{marginLeft: 10}} onClick={this.handleClick}>Cancel</Button>
        </Card>
        <div className="content-wrap">
          <ETable 
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection="radio"
            selectedRowKeys={this.state.selectedRowKeys}
            selectedItem={this.state.selectedItem}
            selectedIds={this.state.selectedIds}
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
