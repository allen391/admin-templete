import React from 'react';
import {Select} from 'antd';

const Option = Select.Option
export default {
  formateDate(time){
    if (!time) {
      return '';
    }
    let date = new Date(time);
    return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' '  + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  },
  pagination(data, callback){
    return {
      onChange: (current) => {
        callback(current)
      },
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total,
      showTotal: () => {
        return `${data.result.total}`
      },
      showQuickJumper: true
    }
  },
  getOptionList(data){
    if (!data) {
      return []
    }
    let option = [<Option value="0" key="all_key">All</Option>]
    data.map((item, key) => {
      option.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
    })
    return option
  },
  updateSelectedItem(selectedRowKeys, SelectedItem, selectedIds){
    if (selectedIds) {
      this.setState({
        selectedRowKeys,
        SelectedItem,
        selectedIds
      })
    }else{
      this.setState({
        selectedRowKeys,
        SelectedItem
      })
    }
  }
}