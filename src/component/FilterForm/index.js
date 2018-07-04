import React, {Component} from 'react';
import {Card, Button, Form, Select} from 'antd';

const Option = Select.Option
class FilterForm extends Component{
  render(){
    const {getFieldDecorator} = this.props.form
    return(
      <Form layout="inline">
        <Form.Item label="City">
          {
            getFieldDecorator('city_id')(
              <Select
                style={{width: 80}}
                placeholder="Select your city"
              >
                <Option value="1">Brisbane</Option>
                <Option value="2">Sydney</Option>
                <Option value="3">Mel</Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="Mode">
          {
            getFieldDecorator('mode')(
              <Select
                style={{width: 60}}
                placeholder="全部"
              >
                <Option value="">全部</Option>
                <Option value="2">指定停车点模式</Option>
                <Option value="3">禁停曲模式</Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="Operation">
          {
            getFieldDecorator('op_mode')(
              <Select
                style={{width: 60}}
                placeholder="全部"
              >
                <Option value="">全部</Option>
                <Option value="2">自营</Option>
                <Option value="3">加盟</Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="Authority">
          {
            getFieldDecorator('authority')(
              <Select
                style={{width: 60}}
                placeholder="auth_status"
              >
                <Option value="">全部</Option>
                <Option value="2">已授权</Option>
                <Option value="3">未授权</Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item>
          <Button type="primary" style={{margin: '0 5px'}}>Search</Button>
          <Button>Reset</Button>
        </Form.Item>
      </Form>
    )
  }
}
FilterForm = Form.create({})(FilterForm)

export default FilterForm