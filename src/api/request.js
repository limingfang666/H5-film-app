import axios from "axios"
import { Toast } from 'vant';

const instance = axios.create({
  baseURL: 'https://m.maizuo.com',
  // timeout: 2000,
  headers: {
    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1596502176387264316178433","bc":"310100"}'
  }
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.loading({
    message: '加载中...',
    duration: 2000,
    forbidClick: true,
  });
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  //响应时消除轻提示
  Toast.clear();
  // console.log(response.data);
  
  return response.data;
}, function (error) {
  console.log(error);
  if(error.code==="ECONNABORTED"){
    Toast.fail("超时请重试！");
  }else if(error.code==="ERR_NETWORK"){
    Toast.fail("网络异常！");
    console.log("网络异常！");
  }
  
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  else if (error.response) {
    // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // 请求已经成功发起，但没有收到响应
    // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
    // 而在node.js中是 http.ClientRequest 的实例
    console.log(error.request);
  } else {
    // 发送请求时出了点问题
    console.log('Error', error.message);
  }
  return Promise.reject(error);
});

export default instance;