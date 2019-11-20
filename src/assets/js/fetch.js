import axios from "axios";

// 创建axios实例
let base_url = `http://47.103.192.82:9850`;

let service = axios.create({
  baseURL: base_url, //
  timeout: 10000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    return config;
  },
  error => {
    // Do something with request error
    // MessageBox.alert(error, "系统提示");
    return Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    return Promise.resolve(response.data);
    // return response.data
  },
  error => {
    //请求被取消
    return Promise.reject(error);
  }
);

export default service;
