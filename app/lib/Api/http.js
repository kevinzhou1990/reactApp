require('es6-promise').polyfill();
import axios from 'axios';
import objectAssign from 'object-assign';
import _ from 'lodash';
import ApiMap from './ApiMap';
import {logger} from '../logger';
import {confirm,getAuthStr} from '../Util';
import '../../../static/assets/jquery.mloading-master/src/jquery.mloading.js';
import '../../../static/assets/jquery.mloading-master/src/jquery.mloading.css';

let baseURL = "";
let $ = window.$;

let demo = false;
if (process.env.NODE_ENV === 'production') {
  baseURL = "/";
} else {
  baseURL = "http://localhost:8081";
    // baseURL = "http://192.168.1.33:8081";
}

axios.interceptors.request.use(config => {
  logger('===============请求接口开始===============\n');
  logger('请求接口：' + config.url + '\n');
  let data = {
    ...config.data,
    auth_str:getAuthStr()
  };
  if(!config.data.auth_str){
    config.data = data;
  }
  logger('参数：' + JSON.stringify(config.data) + '\n');
  $(document.body).mLoading({mask: false}); //显示loading组件
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  if(response.data&&response.data.ret_code === 2001){
    axios.post('/logout').then(response => {
        confirm('您的账号在其他地方登录，请重新登录',function(){
            window.location.href = location.origin+'/login';
        });
    }).catch(
        err => {
          logger(err);
        }
    );
    return false;
  }
  logger("响应数据：" + JSON.stringify(response) + "\n");
  logger("===============请求接口结束===============\n");
  $(document.body).mLoading("hide"); //隐藏loading组件
  return response;
}, error => {
  logger("响应失败：" + error + "\n");
  logger("===============请求接口结束===============\n");
  $(document.body).mLoading("hide"); //隐藏loading组件
  return Promise.resolve(error.response);
});

let settings = {
  baseURL: baseURL,
  timeout: 10000,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  responseType: 'json'
};

const httpServer = function() {
  let url,
    config;
  switch (arguments.length) {
    case 1:
      url = arguments[0].url;
      config = _.omit(arguments[0], 'url');
      break;
    case 2:
      url = arguments[0];
      config = arguments[1];
      break;
  }
  if (demo) {
    let key = _.findKey(ApiMap, {'url': url});
    return axios('./app/rss/' + key + '.json');
  }
  if (url.indexOf("?") > 0) {
    url += ('&_=' + (+new Date()));
  } else {
    url += ('?_=' + (+new Date()));
  }
  config = objectAssign({}, settings, config);
  // 去除值为空的参数
  // let data = config.data;
  // if (typeof data === 'string') {
  //   data = JSON.parse(data);
  // }
  // data = _.pickBy(data, function(item) {
  //   return item;
  // });
  // config.data = data;
  return axios(url, config);
};
export {baseURL};
export default httpServer;
