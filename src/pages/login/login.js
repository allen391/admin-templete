import React, { Component } from 'react'
import {Form, Input, Button} from 'antd';
import Footer from '../../component/Footer/index';
import './index.less';
const FormItem = Form.Item

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  checkUsername = (rule, value, callback) => {
    var reg = /^\w+$/
    if (!value) {
      callback('Input Username')
    }else if(!reg.test(value)){
      callback('Invalid Username')
    }else{
      callback()
    }
  }
  checkUsername = (rule, value, callback) => {
    if (!value) {
      callback('Input Password')
    }else{
      callback()
    }
  }
  loginSubmit = (e) => {
   
  }
  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <div className="login-page">
        <div className="login-header">
            <div className="logo">
                <img src="/assets/logo-ant.svg" alt="慕课后台管理系统"/>
                React Admin System
            </div>
        </div>
        <div className="login-content-wrap">
          <div className="login-content">
            <div className="word">共享出行 <br />引领城市新经济</div>
              <div className="login-box">
                <div className="error-msg-wrap">
                  <div className={this.state.errorMsg?"show":""}>
                    {this.state.errorMsg}
                  </div>
                </div>
                <div className="title">Welcome</div>
                <Form className="login-form">
                  <FormItem>
                    {
                      getFieldDecorator('username', {
                        initialValue: '',
                        rules: [{validator: this.checkUsername}]
                      })(
                        <Input placeholder="Username"/>
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator('password', {
                        initialValue: '',
                        rules: [{validator: this.checkPassword}]
                      })(
                        <Input type="password" placeholder="password"/>
                      )
                    }
                  </FormItem>
                  <FormItem>
                    <Button type="primary" onClick={this.loginSubmit} className="login-form-button">
                      Login
                    </Button>
                  </FormItem>
                </Form>
              </div>
            </div>
          </div>
        <Footer/>
      </div>
    )
  }
}

Login = Form.create({})(Login)
export default Login