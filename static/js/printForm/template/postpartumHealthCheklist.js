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
    var createDate = common.Util.formatDate(data.createDate, '-').split('-');
    var interChildbirthDate = common.Util.formatDate(data.interChildbirthDate, '-').split('-');
    var interLeaveDate = common.Util.formatDate(data.interLeaveDate, '-').split('-');

    var healthGuide = (function() {
      var result = [];
      var healthGuideObject = data.healthGuide || {};
      if (healthGuideObject.guidLifeStyle == 1) {
        result.push(1);
      }
      if (healthGuideObject.guidPsychology == 1) {
        result.push(2);
      }
      if (healthGuideObject.guidNeonatalCare == 1) {
        result.push(3);
      }
      if (healthGuideObject.guidOtherSelect == 1) {
        result.push(4);
      }
      return result;
    })();
    return [{
      key: '38000',
      name: '姓名',
      value: data.residentName
    }, {
      key: '38001',
      name: '随访日期_年',
      value: createDate[0]
    }, {
      key: '38002',
      name: '随访日期_月',
      value: createDate[1]
    }, {
      key: '38003',
      name: '随访日期_日',
      value: createDate[2]
    }, {
      key: '38004',
      name: '分娩日期_年',
      value: interChildbirthDate[0]
    }, {
      key: '38005',
      name: '分娩日期_月',
      value: interChildbirthDate[1]
    }, {
      key: '38006',
      name: '分娩日期_日',
      value: interChildbirthDate[2]
    }, {
      key: '38007',
      name: '出院日期_年',
      value: interLeaveDate[0]
    }, {
      key: '38008',
      name: '出院日期_月',
      value: interLeaveDate[1]
    }, {
      key: '38009',
      name: '出院日期_日',
      value: interLeaveDate[2]
    }, {
      key: '38010',
      name: '一般健康情况',
      value: data.interHealthStaus
    }, {
      key: '38011',
      name: '一般心理状况',
      value: data.interPsychologicalStatus
    }, {
      key: '38012',
      name: '血压_左',
      value: data.bloodPressureLow
    }, {
      key: '38013',
      name: '血压_右',
      value: data.bloodPressureHigh
    }, {
      key: '38014',
      name: '乳房',
      value: function() {
        if (data.interBreast == 1) {
          return 2;
        }
        if (data.interBreast == 2) {
          return 1;
        }
        return ' ';
      }
    }, {
      key: '38015',
      name: '乳房_异常',
      value: function() {
        if (data.interBreast == 1) {
          return data.interBreastExce;
        }
        return ' ';
      }
    }, {
      key: '38016',
      name: '恶露',
      value: function() {
        if (data.interLochia == 1) {
          return 2;
        }
        if (data.interLochia == 2) {
          return 1;
        }
        return ' ';
      }
    }, {
      key: '38017',
      name: '恶露_异常',
      value: function() {
        if (data.interLochia == 1) {
          return data.interLochiaExce;
        }
        return ' ';
      }
    }, {
      key: '38018',
      name: '子宫',
      value: function() {
        if (data.interUterus == 1) {
          return 2;
        }
        if (data.interUterus == 2) {
          return 1;
        }
        return ' ';
      }
    }, {
      key: '38019',
      name: '子宫_异常',
      value: function() {
        if (data.interUterus == 1) {
          return data.interUterusExce;
        }
        return ' ';
      }
    }, {
      key: '38020',
      name: '伤口',
      value: function() {
        if (data.interWound == 1) {
          return 2;
        }
        if (data.interWound == 2) {
          return 1;
        }
        return ' ';
      }
    }, {
      key: '38021',
      name: '伤口_异常',
      value: function() {
        if (data.interWound == 1) {
          return data.interWoundExce;
        }
        return ' ';
      }
    }, {
      key: '38022',
      name: '其他',
      value: data.interOther
    }, {
      key: '38023',
      name: '分类',
      value: function() {
        if (data.interClassification == 1) {
          return 2;
        }
        if (data.interClassification == 2) {
          return 1;
        }
        return ' ';
      }
    }, {
      key: '38024',
      name: '分类_未恢复',
      value: function() {
        if (data.interClassification == 1) {
          return data.interClassificationExce;
        }
        return ' ';
      }
    }, {
      key: '38025',
      name: '指导_1',
      value: healthGuide[0]
    }, {
      key: '38026',
      name: '指导_1',
      value: healthGuide[1]
    }, {
      key: '38027',
      name: '指导_1',
      value: healthGuide[2]
    }, {
      key: '38028',
      name: '指导_1',
      value: healthGuide[3]
    }, {
      key: '38029',
      name: '指导_1',
      value: ' '
    }, {
      key: '38030',
      name: '指导_其他',
      value: function() {
        if (data.healthGuide && data.healthGuide.guidOtherSelect == 1) {
          return data.healthGuide.guidOther;
        }
        return ' ';
      }
    }, {
      key: '38031',
      name: '处理',
      value: function() {
        if (data.interReferral == 1) {
          return 2;
        }
        return 1;
      }
    }, {
      key: '38032',
      name: '转诊_原因',
      value: data.interReferralReason
    }, {
      key: '38033',
      name: '转诊_机构及科室',
      value: data.interReferralOrg
    }, {
      key: '38034',
      name: '随访医生签名',
      value: data.visitDoctor
    }];

  };
  return formTemplate;
}));
