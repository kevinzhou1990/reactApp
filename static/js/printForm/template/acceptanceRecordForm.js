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
    var date = common.Util.formatDate(data.acceptanceDate, '-').split('-');
    return [{
      key: '24000',
      name: '姓名',
      value: data.residentName
    }, {
      key: '24001',
      name: '编号',
      value: data.residentNo
    }, {
      key: '24002',
      name: '就诊者的主观资料',
      value: data.subjectiveData
    }, {
      key: '24003',
      name: '就诊者的客观资料',
      value: data.objectiveData
    }, {
      key: '24004',
      name: '评估',
      value: data.assessment
    }, {
      key: '24005',
      name: '处置计划',
      value: data.disposalPlan
    }, {
      key: '24006',
      name: '医生签字',
      value: data.doctorSign
    }, {
      key: '24007',
      name: '接诊日期_年',
      value: date[0]
    }, {
      key: '24008',
      name: '接诊日期_月',
      value: date[1]
    }, {
      key: '24009',
      name: '接诊日期_日',
      value: date[2]
    }];

  };
  return formTemplate;
}));