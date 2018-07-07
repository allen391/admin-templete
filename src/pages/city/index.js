import React, { Component } from 'react';
import {Card, Button, Table, Form, Select, Modal, message} from 'antd';
import axios from '../../axios/index';
import Utils from '../../utils/utils';
import BaseForm from '../../component/BaseForm/BaseForm';

const Option = Select.Option
class City extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      isShowModal: false
    }
  }
  params = {
    page: 1
  }
  componentDidMount(){
    this.requestList()
  }
  handleClick = () => {
    this.setState({isShowModal: true})
  }
  requestList = () => {
    let _this = this
    axios.ajax({
      url: '/open_city',
      params: {
        page: this.params.page
      }
    }).then(res => {
      this.setState({
        list: res.result.item_list.map((item,index) => {
          item.key = index
          return item
        }),
        pagination: Utils.pagination(res, (current) => {
          _this.params.page = current
          _this.requestList()
        })
      })
    })
  }
  handleSubmit = () => {
    let cityInfo = this.cityForm.props.form.getFieldsValue()
    axios.ajax({
      url: '/open/city',
      data: {
        params: cityInfo
      }
    }).then(res => {
      if (res.code == '0') {
        message.success('succeed!')
        this.setState({
          isShowModal: false
        })
        this.requestList()
      }
    })
  }
  render() {
    const columns = [
      {
        'title': '城市ID',
         dataIndex: 'id'
      },
      {
        title: '城市名称',
        dataIndex: 'name'
      },
      {
        title: '用车模式',
        dataIndex: 'mode',
        render(mode){
          return mode === 1 ? '停车点':'禁停区'
        }
      },
      {
        title: '营运模式',
        dataIndex: 'op_mode',
        render(mode){
          return mode === 1 ? '自营':'加盟'
        }
      },
      {
        title: '授权加盟商',
        dataIndex: 'auth_name'
      },
      {
        title: '城市管理员',
        dataIndex: 'city_council',
        render(arr){
          return arr.map(item => {
            return item.user_name
          }).join(",")
        }
      },
      {
        title: '城市开通时间',
        dataIndex: 'open_time',
        render(time){
          return Utils.formateDate(time)
        }
      },
      {
        title: '操作人',
        dataIndex: 'sys_user_name'
      }
    ]
    return (
      <div>
        <Card>

        </Card>
        <Card style={{marginTop: 10}}>
          <Button type="primary" onClick={this.handleClick}>开通城市</Button>
        </Card>
        <div className="content-wrap">
          <Table 
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            bordered
          />
        </div>
        <Modal
          title="open city"
          visible={this.state.isShowModal}
          onCancel={() => {
            this.setState({isShowModal: false})
          }}
          onOk={this.handleSubmit}
        >
          <OpenCityForm wrappedComponentRef={(inst) => {this.cityForm = inst}}/>
        </Modal>
      </div>
    )
  }
}

class OpenCityForm extends Component{
  render(){
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    }
    return(
      <Form layout="horizontal">
        <Form.Item label="选择城市" {...formItemLayout}>
          {
            getFieldDecorator('city_id', {
              initialValue: '1'
            })(
              <Select style={{width: 100}}>
                <Option value="1">Brisbane</Option>
                <Option value="2">Sydney</Option>
                <Option value="3">Mel</Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="用车模式" {...formItemLayout}>
          {
            getFieldDecorator('use_mode', {
              initialValue: '1'
            })(
              <Select style={{width: 100}}>
                <Option value="">全部</Option>
                <Option value="1">指定停车点模式</Option>
                <Option value="2">禁停区模式</Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="运营模式" {...formItemLayout}>
          {
            getFieldDecorator('op_mode',{
              initialValue: '1'
            })(
              <Select style={{width: 100}}>
                <Option value="">全部</Option>
                <Option value="1">自营</Option>
                <Option value="2">加盟</Option>
              </Select>
            )
          }
        </Form.Item>
      </Form>
    )
  } 
}
OpenCityForm = Form.create({})(OpenCityForm)
export default City

