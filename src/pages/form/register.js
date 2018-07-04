import React, { Component } from 'react';
import { Card, Form, Button, Input, Radio, Select, Switch, DatePicker, TimePicker, InputNumber, Upload, Checkbox } from 'antd';
import moment from 'moment';
import { getFileItem } from 'antd/lib/upload/utils';

class FormRegister extends Component {
  handleClick = () => {
    let userinfo = this.props.form.getFieldsValue();
    console.log(userinfo)
  }
  render() {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 12
      }
    }
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4
        }
      }
    }
    const Option = Select.Option
    const TextArea = Input.TextArea
    return (
      <div>
        <Card>
          <Form layout="horizontal">
            <Form.Item label="username" {...formItemLayout}>
              {
                getFieldDecorator('username', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: 'username cannot be empty!'
                    }
                  ]
                })(<Input type="text" placeholder="input your username"/>)
              }
            </Form.Item>
            <Form.Item label="password" {...formItemLayout}>
              {
                getFieldDecorator('password', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: 'password cannot be empty!'
                    }
                  ]
                })((<Input type="password" placeholder="input your password"/>))
              }
            </Form.Item>
            <Form.Item label="gender" {...formItemLayout}>
              {
                getFieldDecorator('gender', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">female</Radio>
                    <Radio value="2">male</Radio>
                  </Radio.Group>
                )
              }
            </Form.Item>
            <Form.Item label="age" {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  initialValue: '18',
                })((<InputNumber />))
              }
            </Form.Item>
            <Form.Item label="status" {...formItemLayout}>
              {
                getFieldDecorator('status', {
                  initialValue: ['1','2'],
                })(
                  <Select mode="multiple">
                    <Option value='1'>q</Option>
                    <Option value='2'>w</Option>
                    <Option value='3'>e</Option>
                    <Option value='3'>r</Option>
                  </Select>
                )
              }
            </Form.Item>
            <Form.Item label="Marriage" {...formItemLayout}>
              {
                getFieldDecorator('isMarriage', {
                  valuePropName: 'checked',
                  initialValue: 'true',
                })((<Switch />))
              }
            </Form.Item>
            <Form.Item label="DatePicker" {...formItemLayout}>
              {
                getFieldDecorator('DatePicker', {
                  initialValue: moment('2018-08-12'),
                })((<DatePicker 
                      showTime
                      format="YYYY-MM-DD"
                    />))
              }
            </Form.Item>
            <Form.Item label="Address" {...formItemLayout}>
              {
                getFieldDecorator('Address', {
                  initialValue: 'beijing'
                })(
                  <TextArea 
                    autosize={
                      {minRows: 4, maxRows: 6}
                    }
                  />
                )
              }
            </Form.Item>
            <Form.Item {...offsetLayout}>
              {
                getFieldDecorator('read')(
                  <Checkbox>I have read<a href="#"> Agreement</a></Checkbox>
                )
              }
            </Form.Item>
            <Form.Item {...offsetLayout}>
              <Button type="primary" onClick={this.handleClick}>Register</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
};

export default Form.create()(FormRegister)
