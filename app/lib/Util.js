import React from 'react';
import ReactDOM from 'react-dom';
import {Modal, Button} from 'react-bootstrap';
import forge from 'node-forge';
import FileSaver from 'file-saver';
import Security from './security';
import http from './Api/http';
import {all, polyphone} from './dictor';
import {logger} from './logger';
const common = window.common;
const Util = common.Util;

export {common, Util};
class Alert extends React.Component {

  constructor(props) {
    super(props);
    this.doEnter = this.doEnter.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.state = {
      show: true
    };
  }

  handleHide() {
    document.body.removeChild(this.props.container);
  }

  doEnter() {

    this.setState({show: false});
    this.props.handleEnter();
  }

  render() {
    return (
      <Modal bsSize="small" onExiting={this.handleHide} dialogClassName='react-dialog' aria-labelledby="contained-modal-title-sm" show={this.state.show}>
        <Modal.Header>
          <Modal.Title>操作提示</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.txt}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.doEnter}>确认</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class Confirm extends React.Component {

  constructor(props) {
    super(props);
    this.doEnter = this.doEnter.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.doCancel = this.doCancel.bind(this);
    this.state = {
      show: true
    };
  }

  handleHide() {
    document.body.removeChild(this.props.container);
  }

  doCancel() {
    this.setState({show: false});
  }

  doEnter() {
    this.setState({show: false});
    this.props.handleEnter();
  }

  render() {
    return (
      <Modal bsSize="small" onExiting={this.handleHide} dialogClassName='react-dialog' aria-labelledby="contained-modal-title-sm" show={this.state.show}>
        <Modal.Header>
          <Modal.Title>操作提示</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.txt}
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-primary' onClick={this.doEnter}>确认</Button>
          <Button className='btn btn-default' onClick={this.doCancel}>取消</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

/*
 * 确认弹窗
 * opts: {
 *    content： 内容
 *    success： 确认回调
 * }
 * */
export function confirm(content, success) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  ReactDOM.render(
    <Confirm txt={content} container={container} handleEnter={() => {
    if (typeof success === 'function')
      success();
    }}/>, container);
}

/*
 * 确认弹窗
 * content 内容
 * */
export function alert(content, callback) {

  const container = document.createElement('div');
  document.body.appendChild(container);

  ReactDOM.render(
    <Alert txt={content} container={container} handleEnter={() => {
    if (typeof callback === 'function')
      callback();
    }}/>, container);

}

/**
* 设置默认日期
*/
export function setInitDate() {
  let nowDate = new Date();
  let y = nowDate.getFullYear();
  let m = nowDate.getMonth();
  let d = nowDate.getDate();
  return {
    startTime: y + '-' + m + '-' + d,
    endTime: y + '-' + (m + 1) + '-' + d
  };
}

export function addDate(date, days) {
  if (days === undefined || days === '') {
    days = 1;
  }
  date = new Date(date);
  date.setDate(date.getDate() + days);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return date.getFullYear() + '/' + month + '/' + day;
}

/**
* 获取时间戳
*/
export function getTimestamp() {
  if (arguments.length) {
    const dateArr = arguments[0].split('-');
    return new Date(dateArr[0], dateArr[1] - 1, dateArr[2]).getTime();
  } else {
    let nowDate = new Date();
    let y = nowDate.getFullYear();
    let m = nowDate.getMonth();
    let d = nowDate.getDate();
    return {
      startTime: new Date(y, m - 1, d).getTime(),
      endTime: new Date(y, m, d).getTime()
    };
  }
}

/**
* 订单状态转换
* @param num 状态值
*/
export function orderStatus(num) {
  let status = '';
  switch (num) {
    case 1:
      status = '待付款';
      break;
    case 2:
      status = '待发货';
      break;
    case 3:
      status = '待收货';
      break;
    case 4:
      status = '已收货';
      break;
    case 5:
      status = '已取消';
      break;
    default:
      status = '已取消';
  }
  return status;
}

let payTypeMap = {
  1: '微信',
  2: '支付宝',
  3: '健管端支付'
};

/**
* 支付方式转换
* @param num 状态值
*/
export function payType(num) {
  let type = '';
  switch (num) {
    case 1:
      type = payTypeMap[1];
      break;
    case 2:
      type = payTypeMap[2];
      break;
    case 3:
      type = payTypeMap[3];
      break;
    default:
      type = '未支付';
  }
  return type;
}

export {payTypeMap};

/**
* 导出excel
* @param blobData 请求返回的二进制文件
* @param name 文件名
*/
export function downloadExcel(blobData, name) {
  const blob = new Blob([blobData]);
  FileSaver.saveAs(blob, name + '.xlsx');
}

/**
* 时间戳转日期
* @param timeStamp 时间戳
* @param isHMS 是否需要时分秒，默认：true
*/
export function formatDateTime(timeStamp, isHMS = true) {
  if (!timeStamp) {
    return;
  } else {
    var date = new Date();
    date.setTime(timeStamp);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10
      ? ('0' + m)
      : m;
    var d = date.getDate();
    d = d < 10
      ? ('0' + d)
      : d;
    var h = date.getHours();
    h = h < 10
      ? ('0' + h)
      : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10
      ? ('0' + minute)
      : minute;
    second = second < 10
      ? ('0' + second)
      : second;
    return isHMS
            ? y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
            : y + '-' + m + '-' + d;
  }
}

// 创建tab
/**
 *  opts: {
 *    uri: 页面地址
 *    key: tab唯一标示
 *    data: {
 *      name: tab名字
 *    }
 *  }
 *
 *
  example:
  var opts = {
    uri: 'seminarList',
    data: {name: '新增研讨会'},
    key: 'seminarList',
    callback: function(){} 回调函数
  }
  common.createTab(opts)
 */
export function createTab(args) {
  let url = args.uri;
  if (process.env.NODE_ENV !== 'production') {
    url = url.replace(/\/dist\//, '/dev/');
  }
  args = {
    ...args,
    url
  };
  common.createTab(args);
}
//关闭tab页签
/*
 * ID: 编号
 * callback： 回调函数
 * defaultOpen： 是否打开新的标签（false：不打开； true：打开）; 默认打开；
 * */
export function closeTab(id, callback, defaultOpen) {
  common.tab.close(id, callback, defaultOpen);
}

export function pkgUnit(unit) {
  let type = '';
  switch (unit) {
    case 1:
      type = '盒';
      break;
    case 2:
      type = '袋';
      break;
    case 3:
      type = '瓶';
      break;
    case 4:
      type = '罐';
      break;
    case 5:
      type = '听';
      break;

  }
  return type;
}

//获取汉字拼音首字母
export function getFirstLetter(str) {
  let pinyin_dict_firstletter = {};
  pinyin_dict_firstletter.all = all;
  pinyin_dict_firstletter.polyphone = polyphone;
  if (!str || /^ +$/g.test(str))
    return '';
  let result = [];
  for (let i = 0; i < str.length; i++) {
    let unicode = str.charCodeAt(i);
    let ch = str.charAt(i);
    if (unicode >= 19968 && unicode <= 40869) {
      ch = pinyin_dict_firstletter.all.charAt(unicode - 19968);
      ch = pinyin_dict_firstletter.polyphone[unicode] || ch;
    }
    result.push(ch);
  }
  return result.join('');
}

//图片地址转换
export function converson(imgaddress) {
  let initAddress = forge.util.encode64(imgaddress);
  let encodeAddress = encodeURI(initAddress);
  let ads = '/hca/web/admin/getfile/' + encodeAddress;
  return ads;
}

//获取认证子串
export function getAuthStr() {
  let user_name = localStorage.getItem('__username__'),
    server_tick = localStorage.getItem('__transportKey__');
  return Security.base64.encode(Security.aes.encode({
    target: user_name + Security.now(),
    key: server_tick
  }));
}

//字符串首尾空格去除
export function trim(str) {
  return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
}

// 通过自定义属性获取元素
export function getElementByAttr(tag, attr, value) {
  const aElements = document.getElementsByTagName(tag);
  const aEle = [];
  for (let i = 0; i < aElements.length; i++) {
    if (aElements[i].getAttribute(attr) === value) {
      aEle.push(aElements[i]);
    }
  }
  return aEle;
}

// 到处请求模板
export const exportTemplate = (apiData) => (args) => {
  return new Promise((resolve, reject) => {
    http({
      ...apiData,
      data: {
        ...apiData.data,
        ...args
      }
    }).then(result => {
      logger(result);
      if (result.status === 200) {
        const data = result.data;
        if (data) {
          resolve(data);
        } else {
          reject('导出失败');
        }
      } else {
        reject('导出失败');
        logger(result.statusText);
      }
    }).catch(err => {
      reject('导出失败');
      logger(err);
    });
  });
};

// 请求模板
export const fetchTemplate = apiData => args => {
  return new Promise((resolve, reject) => {
    http({
      ...apiData,
      data: {
        ...apiData.data,
        ...args
      }
    }).then(result => {
      if (result.status === 200) {
        const data = result.data;
        if (data.ret_code === 1) {
          resolve(data.ret_data);
        } else {
          reject(data.ret_msg);
        }
      } else {
        reject('操作失败');
        logger(result.statusText);
      }
    }).catch(err => {
      reject('操作失败');
      logger(err);
    });
  });
};

export function amount_format(amount,showZero) {
  if (typeof amount === 'number') {
    return amount.toFixed(2);
  }
  return '';
  // return (amount || 0).toFixed(2);
}

/**
 * 千分位化处理
 *
 * @param num 要处理的值(Number或者String)
 * @param len 保留小数位数(Number)
 * @return 金额格式的字符串,如'1,234,567.45'
 */
export function toThousands(num, len) {
  len = len > 0 && len <= 20
    ? len
    : 2;
  num = num || 0;
  num = parseFloat((num + "").replace(/[^\d\.-]/g, "")).toFixed(len) + "";
  let l = num.split(".")[0].split("").reverse(),
    r = num.split(".")[1];
  let t = "";
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length
      ? ","
      : "");
  }
  return t.split("").reverse().join("") + "." + r;
}

export const sexTypeMap = {
  1: '男',
  2: '女'
};
export const policyTypeMap = {
  1: '首保',
  2: '续保'
};

export const ownerInsuredRelMap = {
  1: '本人',
  2: '夫妻',
  3: '父母',
  4: '子女',
  5: '雇佣',
  6: '其他具有抚养或赡养关系的家庭成员或近亲属'
};

export const insuredCredTypeMap = {
  1: '居民身份证',
  2: '居民户口薄',
  3: '驾驶证',
  4: '军官证',
  5: '士兵证',
  6: '军官离退休证',
  7: '异常身份证',
  8: '港澳台胞证',
  9: '回乡证',
  10: '组织机构代码证',
  11: '税务登记证',
  12: '营业执照',
  13: '护照',
  14: '外国护照',
  15: '旅行证',
  16: '居留证件',
  17: '出生证明',
  18: '其他证件',
  19: '外国人永久居留证'
};


