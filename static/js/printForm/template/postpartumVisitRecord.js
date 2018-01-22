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
      if (healthGuideObject.guidNutrition == 1) {
        result.push(3);
      }
      if (healthGuideObject.guidBreastMilk == 1) {
        result.push(4);
      }
      if (healthGuideObject.guidNeonatalCare == 1) {
        result.push(5);
      }
      if (healthGuideObject.guidOtherSelect == 1) {
        result.push(6);
      }
      if (result.length > 5) {
        result.length = 5;
      }
      return result;
    })();
    return [{
      key: '37000',
      name: '姓名',
      value: data.residentName
    }, {
      key: '37001',
      name: '随访日期_年',
      value: createDate[0]
    }, {
      key: '37002',
      name: '随访日期_月',
      value: createDate[1]
    }, {
      key: '37003',
      name: '随访日期_日',
      value: createDate[2]
    }, {
      key: '37004',
      name: '分娩日期_年',
      value: interChildbirthDate[0]
    }, {
      key: '37005',
      name: '分娩日期_月',
      value: interChildbirthDate[1]
    }, {
      key: '37006',
      name: '分娩日期_日',
      value: interChildbirthDate[2]
    }, {
      key: '37007',
      name: '出院日期_年',
      value: interLeaveDate[0]
    }, {
      key: '37008',
      name: '出院日期_月',
      value: interLeaveDate[1]
    }, {
      key: '37009',
      name: '出院日期_日',
      value: interLeaveDate[2]
    }, {
      key: '37010',
      name: '体温（℃）',
      value: data.interTemperature
    }, {
      key: '37011',
      name: '一般健康情况',
      value: data.interHealthStaus
    }, {
      key: '37012',
      name: '一般心理状况',
      value: data.interPsychologicalStatus
    }, {
      key: '37013',
      name: '血压_左',
      value: data.bloodPressureLow
    }, {
      key: '37014',
      name: '血压_右',
      value: data.bloodPressureHigh
    }, {
      key: '37015',
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
      key: '37016',
      name: '乳房_异常',
      value: function() {
        if (data.interBreast == 1) {
          return data.interBreastExce;
        }
        return ' ';
      }
    }, {
      key: '37017',
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
      key: '37018',
      name: '恶露_异常',
      value: function() {
        if (data.interLochia == 1) {
          return data.interLochiaExce;
        }
        return ' ';
      }
    }, {
      key: '37019',
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
      key: '37020',
      name: '子宫_异常',
      value: function() {
        if (data.interUterus == 1) {
          return data.interUterusExce;
        }
        return ' ';
      }
    }, {
      key: '37021',
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
      key: '37022',
      name: '伤口_异常',
      value: function() {
        if (data.interWound == 1) {
          return data.interWoundExce;
        }
        return ' ';
      }
    }, {
      key: '37023',
      name: '其他',
      value: data.interOther
    }, {
      key: '37024',
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
      key: '37025',
      name: '分类_异常',
      value: function() {
        if (data.interClassification == 1) {
          return data.interClassificationExce;
        }
        return ' ';
      }
    }, {
      key: '37026',
      name: '指导_1',
      value: healthGuide[0]
    }, {
      key: '37027',
      name: '指导_1',
      value: healthGuide[1]
    }, {
      key: '37028',
      name: '指导_1',
      value: healthGuide[2]
    }, {
      key: '37029',
      name: '指导_1',
      value: healthGuide[3]
    }, {
      key: '37030',
      name: '指导_1',
      value: healthGuide[4]
    }, {
      key: '37031',
      name: '指导_1',
      value: function() {
        if (data.healthGuide && data.healthGuide.guidOtherSelect == 1) {
          return data.healthGuide.guidOther;
        }
        return ' ';
      }
    }, {
      key: '37032',
      name: '转诊_有无',
      value: function() {
        if (data.interReferral == 1) {
          return 2;
        }
        return 1;
      }
    }, {
      key: '37033',
      name: '转诊_原因',
      value: data.interReferralReason
    }, {
      key: '37034',
      name: '转诊_机构及科室',
      value: data.interReferralOrg
    }, {
      key: '37035',
      name: '下次随访日期',
      value: common.Util.formatDate(data.nextVisitDate)
    }, {
      key: '37036',
      name: '随访医生签名',
      value: data.visitDoctor
    }];

  };
  return formTemplate;
}));
