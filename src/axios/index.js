import JsonP from 'jsonp';
import axios from 'axios';
import {Modal} from 'antd';
import Utils from '../utils/utils';

export default class Axios{
  static jsonp(options){
    return  new Promise((resolve, reject) => {
      JsonP(options.url, {
        param: 'callback'
      }, function(err,data){
        if (data.cod == 200) {
          resolve(data)
        } else{
          reject(data.message)
        }
      })
    })
  }
  static requestList(_this, url, params, isMock){
    var data = {
      params: params,
      isMock: true
    }
    this.ajax({
      url,
      data
    }).then((data) => {
      if (data && data.result) {
        let list = data.result.item_list.map((item, index) => {
          item.key = index
          return item
        })
        _this.setState({
          list,
          pagination: Utils.pagination(data, (current) => {
            _this.params.page=current
            _this.renderItemList()
          })
        })
      }
    })
  }
  static ajax(options){
    let loading
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading')
      loading.style.display = 'block'
    }
    let baseApi = ''
    if (options.isMock) {
      baseApi = 'https://easy-mock.com/mock/5b374831e0413b586fde4fd9/mockapi'
    } else{
      baseApi = 'https://easy-mock.com/mock/5b374831e0413b586fde4fd9/mockapi'
    }
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: 'get',
        baseURL: baseApi,
        timeout: 8000,
        params: (options.data && options.data.params) || ''
      }).then((response) => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading')
          loading.style.display = 'none'
        }
        if (response.status == '200') {
          let res = response.data
          if (res.code == '0') {
            resolve(res)
          }else{
            Modal.info({
              title: 'tip',
              content: res.msg
            })
          }
        }else{
          reject(response.data)
        }
      })
    })
  }
}