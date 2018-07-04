import React, { Component } from 'react';
import {Card,Table,Modal} from 'antd';
import axios from '../../axios/index';
import Utils from '../../utils/utils';

class BasicTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  };
  params = {
    page: 1
  }
  componentDidMount(){
    const dataSource = [
      {
        id: '0',
        username: 'jack',
        gender: '1',
        status: '1',
        birthday: '2019-01-01',
        address: 'beijing'
      },
      {
        id: '1',
        username: 'hi',
        gender: '1',
        status: '1',
        birthday: '2019-01-01',
        address: 'beijing'
      },
      {
        id: '2',
        username: 'jack',
        gender: '1',
        status: '1',
        birthday: '2019-01-01',
        address: 'beijing'
      }
    ]
    dataSource.map((item, index) => {
      item.key = index
    })
    this.setState({dataSource})
    this.request();
  }
  request = () => {
    let _this = this
    axios.ajax({
      url: '/table/list',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res) => {
      if (res.code == '0') {
        res.result.list.map((item, index) => {
          item.key = index
        })
        this.setState({
          dataSource2: res.result.list,
          pagination: Utils.pagination(res,(current) => {
            _this.params.page = current
            this.request()
          })
        })
      }
    })
  }
  onRowClick = (record, index) => {
    let selectKey = [index]
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
    Modal.info({
      title: 'info',
      content: `username: ${record.username} gender: ${record.gender}`
    })
  }
  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: 'username',
        dataIndex: 'username'
      },
      {
        title: 'gender',
        dataIndex: 'gender',
        render(sex){
          return sex === 1 ? 'Male' : 'Female'
        }
      },
      {
        title: 'status',
        dataIndex: 'status',
        render(status){
          let config = {
            '1': 'haha'
          }
          return config[status]
        }
      },
      {
        title: 'birthday',
        dataIndex: 'birthday'
      },
      {
        title: 'address',
        dataIndex: 'address'
      }
    ]
    const {selectedRowKeys} = this.state
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }
    return (
      <div>
        <Card title="basic table">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
          >
          </Table>
        </Card>
        <Card title="dynamic table-mock" style={{margin: '10px 0'}}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
          >
          </Table>
        </Card>
        <Card title="mock-select" style={{margin: '10px 0'}}>
          <Table
            bordered
            rowSelection={rowSelection}
            onRow={(record,index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index)
                }
              }
            }}
            columns={columns}
            dataSource={this.state.dataSource2}
          >
          </Table>
        </Card>
        <Card title="mock-pagination" style={{margin: '10px 0'}}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={this.state.pagination}
          >
          </Table>
        </Card>
      </div>
    )
  }
}

export default BasicTable
