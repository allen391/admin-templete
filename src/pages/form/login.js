import React, {Component}from 'react';
import {Card, Form, Button, Input, message, Icon, Checkbox} from 'antd';

class FormLogin extends Component{
  handleClick = () => {
    let user = this.props.form.getFieldsValue();
    this.props.form.validateFields((err,values) => {
      if (!err) {
        message.success(`${user.username} success`)
      }
    })
  }
  render(){
    const {getFieldDecorator} = this.props.form;
    return(
      <div>
        <Card title="inline form">
          <Form layout="inline">
            <Form.Item>
              <Input placeholder="username" />
            </Form.Item>
            <Form.Item>
              <Input placeholder="password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary">Login</Button>
            </Form.Item>
          </Form>
        </Card>
        <Card title="horizontal form" style={{marginTop: 10}}>
          <Form style={{width: 300}}>
            <Form.Item>
              {
                getFieldDecorator('username', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: 'username can not be empty!'
                    }
                  ]
                })(
                  <Input prefix={<Icon type="user"/>}placeholder="username" />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: 'password cannot be empty!'
                    }
                  ]
                })(
                  <Input prefix={<Icon type="lock"/>} placeholder="password" />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={this.handleClick}>Login</Button>
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('checkbox', {
                  initialValue: false,
                  valuePropName: 'checked'
                })(
                  <Checkbox>Remember</Checkbox>
                )
              }
              <a href="#" style={{float:'right'}}>Forgot</a>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(FormLogin)