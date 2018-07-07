import React, { Component } from 'react'
import {Input, Select, Form, Button, Checkbox, Radio, DatePicker} from 'antd';
import Utils from '../../utils/utils'

const FormItem =  Form.Item
const Option = Select.Option

class BaseForm extends Component {
  handleFilterSubmit = () => {
    let fieldsValue = this.props.form.getFieldsValue()
    this.props.filterSubmit(fieldsValue)
  }
  handleReset = () => {
    this.props.form.resetFields()
  }
  initFormList = () => {
    const formItemList = []
    const {getFieldDecorator} = this.props.form
    const formList = this.props.formList
    if (formList && formList.length > 0) {
      formList.forEach((item, index) => {
        let label = item.label
        let field = item.field
        let initialValue = item.initialValue || ''
        let placeholder = item.placeholder
        let width = item.width
        if (item.type == 'SELECT') {
          const SELECT = <FormItem label={label} key={field}>
            {
              getFieldDecorator([field],{
                initialValue: initialValue 
              })(
                <Select
                  style={{width: width}}
                  placeholder={placeholder}
                >
                  {Utils.getOptionList(item.list)}
                </Select>
              )
            }
          </FormItem>
          formItemList.push(SELECT)
        } else if(item.type == 'INPUT'){
          const INPUT = <FormItem label={label} key={field}>
            {
              getFieldDecorator([field], {
                initialValue: initialValue
              })(
                <Input type="text" placeholder={placeholder} />
              )
            }
          </FormItem>
          formItemList.push(INPUT)
        } else if(item.type == 'CHECKBOX'){
          const CHECKBOX = <FormItem>
            {
              getFieldDecorator([field], {
                valuePropName: 'checked',
                initialValue: initialValue
              })(
                <Checkbox>
                  {label}
                </Checkbox>
              )
            }
          </FormItem>
          formItemList.push(CHECKBOX)
        } else if(item.type == 'TIME'){
          const begin_time = <FormItem label="Order Time" key={field}>
            {
              getFieldDecorator('begin_time')(
                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD" />
              )
            }
          </FormItem>
          formItemList.push(begin_time)
          const end_time = <FormItem label="~" colon={false} key={field}>
            <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD"/>
          </FormItem>
          formItemList.push(end_time)
        }
      })
    }
    return formItemList
  }
  render() {
    return (
      <Form layout="inline">
        {this.initFormList()}
        <FormItem>
          <Button type="primary" style={{margin: '0 20px'}} onClick={this.handleFilterSubmit}>Search</Button>
          <Button onClick={this.handleReset}>Reset</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create({})(BaseForm)
