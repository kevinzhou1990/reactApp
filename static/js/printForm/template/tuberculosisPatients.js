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
    var phthTraindrugTime = common.Util.formatDate(data.phthTraindrugTime, '-').split('-');
    var nextVisitDate = common.Util.formatDate(data.nextVisitDate, '-').split('-');
    var dataArr = [];

    var bodySymptomList = (function() {
      var result = [];
      _.forEach(data.bodySymptomList, function(item) {
        //咳嗽咳痰
        if (item.symName == 'sym_expectoration' && item.symType == 1) {
          result.push(1);
        }
        //低热盗汗
        if (item.symName == 'sym_night_sweats' && item.symType == 1) {
          result.push(2);
        }
        //咯血或血痰
        if (item.symName == 'sym_blood_sputum' && item.symType == 1) {
          result.push(3);
        }
        //胸痛消瘦
        if (item.symName == 'sym_chest_pain' && item.symType == 1) {
          result.push(4);
        }
        //恶心纳差
        if (item.symName == 'sym_nausea_anorexia' && item.symType == 1) {
          result.push(5);
        }
        //头痛失眠
        if (item.symName == 'sym_headache_insomnia' && item.symType == 1) {
          result.push(6);
        }
        //视物模糊
        if (item.symName == 'sym_blurred_vision' && item.symType == 1) {
          result.push(7);
        }
        //皮肤瘙痒、皮疹
        if (item.symName == 'sym_skin_itch' && item.symType == 1) {
          result.push(8);
        }
        //耳鸣、听力下降
        if (item.symName == 'sym_tinnitus' && item.symType == 1) {
          result.push(9);
        }
      });

      if (result.length == 0) {
        result.push('0');
      }
      if (result.length > 7) {
        result.length = 7;
      }
      return result;
    })();

    dataArr = [{
      key: '33000',
      name: '姓名',
      value: data.residentName
    }, {
      key: '33001',
      name: '随访日期_年',
      value: createDate[0]
    }, {
      key: '33002',
      name: '随访日期_月',
      value: createDate[1]
    }, {
      key: '33003',
      name: '随访日期_日',
      value: createDate[2]
    }, {
      key: '33004',
      name: '随访方式',
      value: data.phthVisitStyle //随访方式 1 门诊  2家庭
    }, {
      key: '33005',
      name: '患者类型',
      value: data.phthPatientType //患者类型 1处治   2复治
    }, {
      key: '33006',
      name: '痰茵情况',
      value: data.phthSputm //痰菌情况 1阳性 2阴性 3未查痰
    }, {
      key: '33007',
      name: '耐药情况',
      value: data.phthDrugResistance //耐药情况 1耐药 2非耐药 3未检测
    }, {
      key: '33008',
      name: '症状及体征_1',
      value: bodySymptomList[0]
    }, {
      key: '33009',
      name: '症状及体征_2',
      value: bodySymptomList[1]
    }, {
      key: '33010',
      name: '症状及体征_3',
      value: bodySymptomList[2]
    }, {
      key: '33011',
      name: '症状及体征_4',
      value: bodySymptomList[3]
    }, {
      key: '33012',
      name: '症状及体征_5',
      value: bodySymptomList[4]
    }, {
      key: '33013',
      name: '症状及体征_6',
      value: bodySymptomList[5]
    }, {
      key: '33014',
      name: '症状及体征_7',
      value: bodySymptomList[6]
    }, {
      key: '33015',
      name: '症状及体征_其他',
      value: function() {
        var other = _.find(data.bodySymptomList, function(item) {
          return item.symName == 'sym_other';
        });
        if (other && other.symType == 1) {
          return other.symDescribe;
        }
        return ' ';
      }
    }, {
      key: '33016',
      name: '用药_化疗方案',
      value: data.phthChemotherapy
    }, {
      key: '33017',
      name: '用药_用法',
      value: data.phthDrugUsag //用药用法 1每日 2间歇  √
    }, {
      key: '33018',
      name: '用药_药品剂型_1',
      value: function() {
        if (data.phthCompoundPreparation == 1) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '33019',
      name: '用药_药品剂型_2',
      value: function() {
        if (data.phthBulkLoading == 1) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '33020',
      name: '用药_药品剂型_3',
      value: function() {
        if (data.phthPlateCombination == 1) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '33021',
      name: '用药_药品剂型_4',
      value: function() {
        if (data.phthInjection == 1) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '33022',
      name: '督导人员选择',
      value: data.phthSupervisor //督导人员选择 1医生 2家属 3自服药 4 其他
    }, {
      key: '33023',
      name: '家庭居住环境评估_单独的居室',
      value: data.phthSingleRoom //单独的居室 1有 2无
    }, {
      key: '33024',
      name: '家庭居住环境评估_通风情况',
      value: data.phthAirRoom //通风情况 1良好 2一般  3差
    }, {
      key: '33025',
      name: '生活方式评估_吸烟_支',
      value: data.phthCurrentSmoke
    }, {
      key: '33026',
      name: '生活方式评估_吸烟_天',
      value: data.phthTargetSmoke + ''
    }, {
      key: '33027',
      name: '生活方式评估_饮酒_两',
      value: data.phthCurrentDrink
    }, {
      key: '33028',
      name: '生活方式评估_饮酒_天',
      value: data.phthTargetDrink + ''
    }, {
      key: '33029',
      name: '健康教育及培训_取药地点',
      value: data.phthTrainAddress
    }, {
      key: '33030',
      name: '健康教育及培训_取药时间_年',
      value: phthTraindrugTime[0]
    }, {
      key: '33031',
      name: '健康教育及培训_取药时间_月',
      value: phthTraindrugTime[1]
    }, {
      key: '33032',
      name: '健康教育及培训_取药时间_日',
      value: phthTraindrugTime[2]
    }, {
      key: '33033',
      name: '健康教育及培训_服药记录卡的填写',
      value: data.phthRecordWrite //服药记录卡填写 1掌握  2未掌握
    }, {
      key: '33034',
      name: '健康教育及培训_服药方法及药品存放',
      value: data.phthDrugDeposit //服药方法及药品存放 1掌握  2未掌握
    }, {
      key: '33035',
      name: '健康教育及培训_肺结核治疗疗程',
      value: data.phthTreat //肺结核治疗疗程  1掌握  2未掌握
    }, {
      key: '33036',
      name: '健康教育及培训_不规律服药危害',
      value: data.phthIrregularHarm //不规律服药危害 1掌握  2未掌握
    }, {
      key: '33037',
      name: '健康教育及培训_服药后不良反应及处理',
      value: data.pthtDrugReaction //服药后不良反应及处理 1掌握  2未掌握
    }, {
      key: '33038',
      name: '健康教育及培训_治疗期间复诊查痰',
      value: data.phthCheckSputum //治疗期间复诊查痰  1掌握  2未掌握
    }, {
      key: '33039',
      name: '健康教育及培训_外出期间如何坚持服药',
      value: data.phthTakeMedicine //外出期间如何坚持服药 1掌握  2未掌握
    }, {
      key: '33040',
      name: '健康教育及培训_生活习惯及注意事项',
      value: data.phthHabits //生活习惯及注意事项 1掌握  2未掌握
    }, {
      key: '33041',
      name: '健康教育及培训_密切接触者检查',
      value: data.phthContact //密切接触者检查 1掌握  2未掌握
    }, {
      key: '33042',
      name: '下次随访时间_ 年',
      value: nextVisitDate[0] //密切接触者检查 1掌握  2未掌握
    }, {
      key: '33043',
      name: '下次随访时间_ 月',
      value: nextVisitDate[1] //密切接触者检查 1掌握  2未掌握
    }, {
      key: '33044',
      name: '下次随访时间_ 日',
      value: nextVisitDate[2] //密切接触者检查 1掌握  2未掌握
    }, {
      key: '33045',
      name: '评估医生签名',
      value: data.phthVisitDoctor
    }];




    return dataArr;

  };
  return formTemplate;
}));
