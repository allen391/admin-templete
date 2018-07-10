import React, { Component } from 'react'
import {Card, Button} from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/utils'
import ETable from '../../component/ETable/index'
import BaseForm from '../../component/BaseForm/BaseForm'

class User extends Component {
  formList = [
    {
      type: 'SELECT',
      label: 'Username',
      placeholder: 'Input username',
      width: 80
    },
    {
      
    }
  ]
  render() {
    return (
      <div>
        <Card>

        </Card>
      </div>
    )
  }
}

export default User
