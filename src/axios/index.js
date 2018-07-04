import JsonP from 'jsonp';
import axios from 'axios';
import {Modal} from 'antd';

export default class Axios{
  static jsonp(options){
    new Promise((resolve, reject) => {
      JsonP(options.url, {
        param: 'callback'
      }, function(err,response){
        //todo
      })
    })
  }
  static ajax(options){
    let baseApi = 'https://easy-mock.com/mock/5b374831e0413b586fde4fd9/mockapi'
    let loading
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading')
      loading.style.display = 'block'
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