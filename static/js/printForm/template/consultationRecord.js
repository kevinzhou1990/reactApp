(function(root, factory) {
  if (typeof define == 'function' && define.amd) {
    // AMD
    define(['lodash'], factory);
  } else if (typeof exports == 'object') {
    // Node, CommonJS之类的
    module.exports = factory('lodash');
  } else {
    // 浏览器全局变量(root 即 window)
    root.Util = factory(root._);
  }
}(this, function(_) {
  var formTemplate = {};

  formTemplate.getFormData = function(data) {
    var date = common.Util.formatDate(data.conDate, '-').split('-');
    var dataArr = [];
    var arr = [{
      key: '25004',
      name: '会诊医生及其所在医疗卫生机构：医疗卫生机构名称1',
      value: ' '
    }, {
      key: '25005',
      name: '会诊医生签字(第1行)1',
      value: ' '
    }, {
      key: '25006',
      name: '会诊医生签字(第1行)2',
      value: ' '
    }, {
      key: '25007',
      name: '会诊医生签字(第1行)3',
      value: ' '
    }, {
      key: '25008',
      name: '会诊医生及其所在医疗卫生机构：医疗卫生机构名称2',
      value: ' '
    }, {
      key: '25009',
      name: '会诊医生签字(第2行)1',
      value: ' '
    }, {
      key: '25010',
      name: '会诊医生签字(第2行)2',
      value: ' '
    }, {
      key: '25011',
      name: '会诊医生签字(第2行)3',
      value: ' '
    }, {
      key: '25012',
      name: '会诊医生及其所在医疗卫生机构：医疗卫生机构名称3',
      value: ' '
    }, {
      key: '25013',
      name: '会诊医生签字(第3行)1',
      value: ' '
    }, {
      key: '25014',
      name: '会诊医生签字(第3行)2',
      value: ' '
    }, {
      key: '25015',
      name: '会诊医生签字(第3行)3',
      value: ' '
    }, {
      key: '25016',
      name: '会诊医生及其所在医疗卫生机构：医疗卫生机构名称4',
      value: ' '
    }, {
      key: '25017',
      name: '会诊医生签字(第4行)1',
      value: ' '
    }, {
      key: '25018',
      name: '会诊医生签字(第4行)2',
      value: ' '
    }, {
      key: '25019',
      name: '会诊医生签字(第4行)3',
      value: ' '
    }, {
      key: '25020',
      name: '会诊医生及其所在医疗卫生机构：医疗卫生机构名称5',
      value: ' '
    }, {
      key: '25021',
      name: '会诊医生签字(第5行)1',
      value: ' '
    }, {
      key: '25022',
      name: '会诊医生签字(第5行)2',
      value: ' '
    }, {
      key: '25023',
      name: '会诊医生签字(第5行)3',
      value: ' '
    }];



    dataArr = [{
      key: '25000',
      name: '姓名',
      value: data.residentName
    }, {
      key: '25001',
      name: '编号',
      value: data.residentNo
    }, {
      key: '25002',
      name: '会诊原因',
      value: data.reason
    }, {
      key: '25003',
      name: '会诊意见',
      value: data.opinion
    }, {
      key: '25024',
      name: '责任医生',
      value: data.doctorSign
    }, {
      key: '25025',
      name: '会诊日期_年',
      value: date[0]
    }, {
      key: '25026',
      name: '会诊日期_月',
      value: date[1]
    }, {
      key: '25027',
      name: '会诊日期_日',
      value: date[2]
    }];
    var temp = {};
    _.forEach(data.consulationHospitalList, function(item) {
      temp = arr.shift();
      temp.value = item.hospitalName;
      dataArr.push(temp);

      temp = arr.shift();
      temp.value = item.doctorSign1;
      dataArr.push(temp);

      temp = arr.shift();
      temp.value = item.doctorSign2;
      dataArr.push(temp);

      temp = arr.shift();
      temp.value = item.doctorSign3;
      dataArr.push(temp);

    });

    _.forEach(arr, function(item) {
      dataArr.push(item);
    });



    return dataArr;

  };
  return formTemplate;
}));