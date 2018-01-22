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
    var dataArr = [];
    var date = common.Util.formatDate(data.acceptanceDate, '-').split('-');
    var diabOtherDate = common.Util.formatDate(data.diabOtherDate, '-').split('-');

    var bodySymptomList = (function() {
      var result = [];
      _.forEach(data.bodySymptomList, function(item) {
        // 多饮
        if (item.symName == 'sym_drink_more' && item.symType == 1) {
          result.push(2);
        }
        // 多食
        if (item.symName == 'sym_eat_more' && item.symType == 1) {
          result.push(3);
        }
        // 多饮
        if (item.symName == 'sym_polyuria' && item.symType == 1) {
          result.push(4);
        }
        // 视力模糊
        if (item.symName == 'sym_blurred_vision' && item.symType == 1) {
          result.push(5);
        }
        // 感染
        if (item.symName == 'sym_infected' && item.symType == 1) {
          result.push(6);
        }
        // 手脚麻木
        if (item.symName == 'sym_numbness_limbs2' && item.symType == 1) {
          result.push(7);
        }
        // 下肢浮肿
        if (item.symName == 'sym_lower_extremity2' && item.symType == 1) {
          result.push(8);
        }
        // 体重明显下降
        if (item.symName == 'sym_weight_loss' && item.symType == 1) {
          result.push(9);
        }
      });
      if (result.length < 1) {
        result.push(1);
      }
      return result;
    })();
    dataArr = [{
      key: '31000',
      name: '姓名',
      value: data.residentName
    }, {
      key: '31001',
      name: '随访方式_1',
      value: data.diabVisitType //随访方式  1：门诊 2：家庭 3：电话
    }, {
      key: '31002',
      name: '随访方式_2',
      value: ' '
    }, {
      key: '31003',
      name: '随访方式_3',
      value: ' '
    }, {
      key: '31004',
      name: '随访方式_4',
      value: ' '
    }, {
      key: '31005',
      name: '症状1_1(多选)',
      value: bodySymptomList[0]
    }, {
      key: '31006',
      name: '症状1_2(多选)',
      value: bodySymptomList[1]
    }, {
      key: '31007',
      name: '症状1_3(多选)',
      value: bodySymptomList[2]
    }, {
      key: '31008',
      name: '症状1_4(多选)',
      value: bodySymptomList[3]
    }, {
      key: '31009',
      name: '症状1_5(多选)',
      value: bodySymptomList[4]
    }, {
      key: '31010',
      name: '症状1_6(多选)',
      value: bodySymptomList[5]
    }, {
      key: '31011',
      name: '症状1_7(多选)',
      value: bodySymptomList[6]
    }, {
      key: '31012',
      name: '症状1_8(多选)',
      value: bodySymptomList[7]
    }, {
      key: '31013',
      name: '症状1_1(多选)',
      value: ' '
    }, {
      key: '31014',
      name: '症状1_2(多选)',
      value: ' '
    }, {
      key: '31015',
      name: '症状1_3(多选)',
      value: ' '
    }, {
      key: '31016',
      name: '症状1_4(多选)',
      value: ' '
    }, {
      key: '31017',
      name: '症状1_5(多选)',
      value: ' '
    }, {
      key: '31018',
      name: '症状1_6(多选)',
      value: ' '
    }, {
      key: '31019',
      name: '症状1_7(多选)',
      value: ' '
    }, {
      key: '31020',
      name: '症状1_7(多选)',
      value: ' '
    }, {
      key: '31021',
      name: '症状1_8(多选)',
      value: ' '
    }, {
      key: '31022',
      name: '症状1_1(多选)',
      value: ' '
    }, {
      key: '31023',
      name: '症状1_2(多选)',
      value: ' '
    }, {
      key: '31024',
      name: '症状1_3(多选)',
      value: ' '
    }, {
      key: '31025',
      name: '症状1_4(多选)',
      value: ' '
    }, {
      key: '31026',
      name: '症状1_5(多选)',
      value: ' '
    }, {
      key: '31027',
      name: '症状1_6(多选)',
      value: ' '
    }, {
      key: '31028',
      name: '症状1_7(多选)',
      value: ' '
    }, {
      key: '31029',
      name: '症状1_8(多选)',
      value: ' '
    }, {
      key: '31030',
      name: '症状1_1(多选)',
      value: ' '
    }, {
      key: '31031',
      name: '症状1_2(多选)',
      value: ' '
    }, {
      key: '31032',
      name: '症状1_3(多选)',
      value: ' '
    }, {
      key: '31033',
      name: '症状1_4(多选)',
      value: ' '
    }, {
      key: '31034',
      name: '症状1_5(多选)',
      value: ' '
    }, {
      key: '31035',
      name: '症状1_6(多选)',
      value: ' '
    }, {
      key: '31036',
      name: '症状1_7(多选)',
      value: ' '
    }, {
      key: '31037',
      name: '症状_其他_1',
      value: function() {
        var symptom = _.find(data.bodySymptomList, function(item) {
          return item.symName == 'sym_other';
        });
        if (symptom && symptom.symType == 1) {
          return symptom.symDescribe;
        }
        return ' ';
      }
    }, {
      key: '31038',
      name: '症状_其他_2',
      value: ' '
    }, {
      key: '31039',
      name: '症状_其他_3',
      value: ' '
    }, {
      key: '31040',
      name: '症状_其他_4',
      value: ' '
    }, {
      key: '31041',
      name: '体征_血压_1',
      value: data.diabBloodpreLow + '/' + data.diabBloodpreHigh
    }, {
      key: '31042',
      name: '体征_血压_2',
      value: ' '
    }, {
      key: '31043',
      name: '体征_血压_3',
      value: ' '
    }, {
      key: '31044',
      name: '体征_血压_4',
      value: ' '
    }, {
      key: '31045',
      name: '体征_体重_左_1',
      value: data.diabCurrentWeight
    }, {
      key: '31046',
      name: '体征_体重_右_1',
      value: data.diabTargetWeight
    }, {
      key: '31047',
      name: '体征_体重_左_1',
      value: ' '
    }, {
      key: '31048',
      name: '体征_体重_右_1',
      value: ' '
    }, {
      key: '31049',
      name: '体征_体重_左_1',
      value: ' '
    }, {
      key: '31050',
      name: '体征_体重_右_1',
      value: ' '
    }, {
      key: '31051',
      name: '体征_体重_左_1',
      value: ' '
    }, {
      key: '31052',
      name: '体征_体重_右_1',
      value: ' '
    }, {
      key: '31053',
      name: '体征_体质指数_左_1',
      value: data.diabCurrentBodyspi
    }, {
      key: '31054',
      name: '体征_体质指数_右_1',
      value: data.diabTargetBodyspi
    }, {
      key: '31055',
      name: '体征_体重_左_1',
      value: ' '
    }, {
      key: '31056',
      name: '体征_体重_右_1',
      value: ' '
    }, {
      key: '31057',
      name: '体征_体重_左_1',
      value: ' '
    }, {
      key: '31058',
      name: '体征_体重_右_1',
      value: ' '
    }, {
      key: '31059',
      name: '体征_体重_左_1',
      value: ' '
    }, {
      key: '31060',
      name: '体征_体重_右_1',
      value: ' '
    }, {
      key: '31061',
      name: '体征_足背动脉搏_1',
      value: function() {
        if (data.diabDorsalisPedis == 1) {
          return 2;
        }
        if (data.diabDorsalisPedis == 2) {
          return 1;
        }
        return ' ';
      } // 足背动脉搏动 1:触及 2：未触及'
    }, {
      key: '31062',
      name: '体征_足背动脉搏_2',
      value: ' '
    }, {
      key: '31063',
      name: '体征_足背动脉搏_3',
      value: ' '
    }, {
      key: '31064',
      name: '体征_足背动脉搏_4',
      value: ' '
    }, {
      key: '31065',
      name: '体征_其他_1',
      value: data.diabBodyOther
    }, {
      key: '31066',
      name: '体征_其他_2',
      value: ' '
    }, {
      key: '31067',
      name: '体征_其他_3',
      value: ' '
    }, {
      key: '31068',
      name: '体征_其他_4',
      value: ' '
    }, {
      key: '31069',
      name: '生活方式指导_日吸烟量(支)_左_1',
      value: data.diabCurrentSmoking
    }, {
      key: '31070',
      name: '生活方式指导_日吸烟量(支)_右_1',
      value: data.diabTargetSmoking + ''
    }, {
      key: '31071',
      name: '生活方式指导_日吸烟量(支)_左_1',
      value: ' '
    }, {
      key: '31072',
      name: '生活方式指导_日吸烟量(支)_右_1',
      value: ' '
    }, {
      key: '31073',
      name: '生活方式指导_日吸烟量(支)_左_1',
      value: ' '
    }, {
      key: '31074',
      name: '生活方式指导_日吸烟量(支)_右_1',
      value: ' '
    }, {
      key: '31075',
      name: '生活方式指导_日吸烟量(支)_左_1',
      value: ' '
    }, {
      key: '31076',
      name: '生活方式指导_日吸烟量(支)_右_1',
      value: ' '
    }, {
      key: '31077',
      name: '生活方式指导_日饮酒量(两)_左_1',
      value: data.diabCurrentDrink
    }, {
      key: '31078',
      name: '生活方式指导_日饮酒量(两)_右_1',
      value: data.diabTargetDrink + ''
    }, {
      key: '31079',
      name: '生活方式指导_日饮酒量(两)_左_1',
      value: ' '
    }, {
      key: '31080',
      name: '生活方式指导_日饮酒量(两)_右_1',
      value: ' '
    }, {
      key: '31081',
      name: '生活方式指导_日饮酒量(两)_左_1',
      value: ' '
    }, {
      key: '31082',
      name: '生活方式指导_日饮酒量(两)_右_1',
      value: ' '
    }, {
      key: '31083',
      name: '生活方式指导_日饮酒量(两)_左_1',
      value: ' '
    }, {
      key: '31084',
      name: '生活方式指导_日饮酒量(两)_右_1',
      value: ' '
    }, {
      key: '31085',
      name: '生活方式指导_运动_次/周_上_1',
      value: data.diabCurrentSportcount
    }, {
      key: '31086',
      name: '生活方式指导_运动_分钟/次_上_1',
      value: data.diabCurrentSporttime
    }, {
      key: '31087',
      name: '生活方式指导_运动_次/周_下_1',
      value: data.diabTargetSportcount
    }, {
      key: '31088',
      name: '生活方式指导_运动_分钟/次_下_1',
      value: data.diabTargetSporttime
    }, {
      key: '31089',
      name: '生活方式指导_运动_次/周_上_1',
      value: ' '
    }, {
      key: '31090',
      name: '生活方式指导_运动_分钟/次_上_1',
      value: ' '
    }, {
      key: '31091',
      name: '生活方式指导_运动_次/周_下_1',
      value: ' '
    }, {
      key: '31092',
      name: '生活方式指导_运动_分钟/次_下_1',
      value: ' '
    }, {
      key: '31093',
      name: '生活方式指导_运动_次/周_上_1',
      value: ' '
    }, {
      key: '31094',
      name: '生活方式指导_运动_分钟/次_上_1',
      value: ' '
    }, {
      key: '31095',
      name: '生活方式指导_运动_次/周_下_1',
      value: ' '
    }, {
      key: '31096',
      name: '生活方式指导_运动_分钟/次_下_1',
      value: ' '
    }, {
      key: '31097',
      name: '生活方式指导_运动_次/周_上_1',
      value: ' '
    }, {
      key: '31098',
      name: '生活方式指导_运动_分钟/次_上_1',
      value: ' '
    }, {
      key: '31099',
      name: '生活方式指导_运动_次/周_下_1',
      value: ' '
    }, {
      key: '31100',
      name: '生活方式指导_运动_分钟/次_下_1',
      value: ' '
    }, {
      key: '31101',
      name: '生活方式指导_主食(克/天)_左_1',
      value: data.diabCurrentFood
    }, {
      key: '31102',
      name: '生活方式指导_主食(克/天)_右_1',
      value: data.diabTargerFood
    }, {
      key: '31103',
      name: '生活方式指导_主食(克/天)_左_1',
      value: ' '
    }, {
      key: '31104',
      name: '生活方式指导_主食(克/天)_右_1',
      value: ' '
    }, {
      key: '31105',
      name: '生活方式指导_主食(克/天)_左_1',
      value: ' '
    }, {
      key: '31106',
      name: '生活方式指导_主食(克/天)_右_1',
      value: ' '
    }, {
      key: '31107',
      name: '生活方式指导_主食(克/天)_左_1',
      value: ' '
    }, {
      key: '31108',
      name: '生活方式指导_主食(克/天)_右_1',
      value: ' '
    }, {
      key: '31109',
      name: '生活方式指导_心理调整_1',
      value: data.diabPsychologicalAdjust //心理调整 1:良好 2：一般 3：较差
    }, {
      key: '31110',
      name: '生活方式指导_心理调整_1',
      value: ' '
    }, {
      key: '31111',
      name: '生活方式指导_心理调整_1',
      value: ' '
    }, {
      key: '31112',
      name: '生活方式指导_心理调整_1',
      value: ' '
    }, {
      key: '31113',
      name: '生活方式指导_遵医行为_1',
      value: data.diabComplianceBehavior // 遵医行为 1:良好 2：一般 3：较差
    }, {
      key: '31114',
      name: '生活方式指导_遵医行为_1',
      value: ' '
    }, {
      key: '31115',
      name: '生活方式指导_遵医行为_1',
      value: ' '
    }, {
      key: '31116',
      name: '生活方式指导_遵医行为_1',
      value: ' '
    }, {
      key: '31117',
      name: '辅助检查_空腹血糖值_1',
      value: data.diabBloodGlucose
    }, {
      key: '31118',
      name: '辅助检查_空腹血糖值_1',
      value: ' '
    }, {
      key: '31119',
      name: '辅助检查_空腹血糖值_1',
      value: ' '
    }, {
      key: '31120',
      name: '辅助检查_空腹血糖值_1',
      value: ' '
    }, {
      key: '31121',
      name: '辅助检查_其他检查*_糖化红蛋白_1',
      value: data.diabGlycosylatedHemoglobin
    }, {
      key: '31122',
      name: '辅助检查_其他检查*_检查日期_月_1',
      value: diabOtherDate[1]
    }, {
      key: '31123',
      name: '辅助检查_其他检查*_检查日期_日_1',
      value: diabOtherDate[2]
    }, {
      key: '31124',
      name: '辅助检查_其他检查*_1_1',
      value: data.diabOtherInspection
    }, {
      key: '31125',
      name: '辅助检查_其他检查*_1_1',
      value: ' '
    }, {
      key: '31126',
      name: '辅助检查_其他检查*_1_1',
      value: ' '
    }, {
      key: '31127',
      name: '辅助检查_其他检查*_糖化红蛋白_1',
      value: ' '
    }, {
      key: '31128',
      name: '辅助检查_其他检查*_检查日期_月_1',
      value: ' '
    }, {
      key: '31129',
      name: '辅助检查_其他检查*_检查日期_日_1',
      value: ' '
    }, {
      key: '31130',
      name: '辅助检查_其他检查*_1_1',
      value: ' '
    }, {
      key: '31131',
      name: '辅助检查_其他检查*_1_1',
      value: ' '
    }, {
      key: '31132',
      name: '辅助检查_其他检查*_1_1',
      value: ' '
    }, {
      key: '31133',
      name: '辅助检查_其他检查*_糖化红蛋白_1',
      value: ' '
    }, {
      key: '31134',
      name: '辅助检查_其他检查*_检查日期_月_1',
      value: ' '
    }, {
      key: '31135',
      name: '辅助检查_其他检查*_检查日期_日_1',
      value: ' '
    }, {
      key: '31136',
      name: '辅助检查_其他检查*_1_1',
      value: ' '
    }, {
      key: '31137',
      name: '辅助检查_其他检查*_1_1',
      value: ' '
    }, {
      key: '31138',
      name: '辅助检查_其他检查*_1_1',
      value: ' '
    }, {
      key: '31139',
      name: '辅助检查_其他检查*_糖化红蛋白_1',
      value: ' '
    }, {
      key: '31140',
      name: '辅助检查_其他检查*_检查日期_月_1',
      value: ' '
    }, {
      key: '31141',
      name: '辅助检查_其他检查*_检查日期_日_1',
      value: ' '
    }, {
      key: '31142',
      name: '辅助检查_其他检查*_1_1',
      value: ' '
    }, {
      key: '31143',
      name: '辅助检查_其他检查*_1_1',
      value: ' '
    }, {
      key: '31144',
      name: '辅助检查_其他检查*_1_1',
      value: ' '
    }, {
      key: '31145',
      name: '服药依从性_1',
      value: data.diabMedicationCompliance // 服药依赖性 1:规律 2:间断 3：不服药
    }, {
      key: '31146',
      name: '服药依从性_1',
      value: ' '
    }, {
      key: '31147',
      name: '服药依从性_1',
      value: ' '
    }, {
      key: '31148',
      name: '服药依从性_1',
      value: ' '
    }, {
      key: '31149',
      name: '药物不良反应_1',
      value: function() {
        if (data.diabDrugReaction == 1) {
          return 2;
        }
        if (data.diabDrugReaction == 2) {
          return 1;
        }
        return ' ';
      } //药物不良反应 1有2无
    }, {
      key: '31150',
      name: '药物不良反应_1',
      value: ' '
    }, {
      key: '31151',
      name: '药物不良反应_1',
      value: ' '
    }, {
      key: '31152',
      name: '药物不良反应_1',
      value: ' '
    }, {
      key: '31153',
      name: '低血糖反应_1',
      value: data.diabHypoglyReaction // 低血糖反应 1:无 2：偶然 3:频繁
    }, {
      key: '31154',
      name: '低血糖反应_1',
      value: ' '
    }, {
      key: '31155',
      name: '低血糖反应_1',
      value: ' '
    }, {
      key: '31156',
      name: '低血糖反应_1',
      value: ' '
    }, {
      key: '31157',
      name: '此次随访分类_1',
      value: data.diabVisitClassification // 此次随访分类 1控制满意 2控制不满意 3不良反应 4并发症
    }, {
      key: '31158',
      name: '此次随访分类_1',
      value: ' '
    }, {
      key: '31159',
      name: '此次随访分类_1',
      value: ' '
    }, {
      key: '31160',
      name: '此次随访分类_1',
      value: ' '
    }, {
      key: '31162',
      name: '用药情况_ 药物名称1_2',
      value: ' '
    }, {
      key: '31163',
      name: '用药情况_ 药物名称1_3',
      value: ' '
    }, {
      key: '31164',
      name: '用药情况_ 药物名称1_4',
      value: ' '
    }, {
      key: '31167',
      name: '用药情况_ 用法用量1_每日次_2',
      value: ' '
    }, {
      key: '31168',
      name: '用药情况_ 用法用量1_每次mg_2',
      value: ' '
    }, {
      key: '31169',
      name: '用药情况_ 用法用量1_每日次_3',
      value: ' '
    }, {
      key: '31170',
      name: '用药情况_ 用法用量1_每次mg_3',
      value: ' '
    }, {
      key: '31171',
      name: '用药情况_ 用法用量1_每日次_4',
      value: ' '
    }, {
      key: '31172',
      name: '用药情况_ 用法用量1_每次mg_4',
      value: ' '
    }, {
      key: '29179',
      name: '用药情况_ 药物名称2_2',
      value: ' '
    }, {
      key: '31174',
      name: '用药情况_ 药物名称2_3',
      value: ' '
    }, {
      key: '31175',
      name: '用药情况_ 药物名称2_4',
      value: ' '
    }, {
      key: '31179',
      name: '用药情况_ 用法用量2_每日次_2',
      value: ' '
    }, {
      key: '31180',
      name: '用药情况_ 用法用量2_每次mg_2',
      value: ' '
    }, {
      key: '31181',
      name: '用药情况_ 用法用量2_每日次_3',
      value: ' '
    }, {
      key: '31182',
      name: '用药情况_ 用法用量2_每次mg_3',
      value: ' '
    }, {
      key: '31183',
      name: '用药情况_ 用法用量2_每日次_4',
      value: ' '
    }, {
      key: '31184',
      name: '用药情况_ 用法用量2_每次mg_4',
      value: ' '
    }, {
      key: '31186',
      name: '用药情况_ 药物名称3_2',
      value: ' '
    }, {
      key: '31187',
      name: '用药情况_ 药物名称3_3',
      value: ' '
    }, {
      key: '31188',
      name: '用药情况_ 药物名称3_4',
      value: ' '
    }, {
      key: '31191',
      name: '用药情况_ 用法用量3_每日次_2',
      value: ' '
    }, {
      key: '31192',
      name: '用药情况_ 用法用量3_每次mg_2',
      value: ' '
    }, {
      key: '31193',
      name: '用药情况_ 用法用量3_每日次_3',
      value: ' '
    }, {
      key: '31194',
      name: '用药情况_ 用法用量3_每次mg_3',
      value: ' '
    }, {
      key: '31195',
      name: '用药情况_ 用法用量3_每日次_4',
      value: ' '
    }, {
      key: '31196',
      name: '用药情况_ 用法用量3_每次mg_4',
      value: ' '
    }, {
      key: '31199',
      name: '用药情况_ 胰岛素_种类_2',
      value: ' '
    }, {
      key: '31200',
      name: '用药情况_ 胰岛素_用法和用量_2',
      value: ' '
    }, {
      key: '31201',
      name: '用药情况_ 胰岛素_种类_3',
      value: ' '
    }, {
      key: '31202',
      name: '用药情况_ 胰岛素_用法和用量_3',
      value: ' '
    }, {
      key: '31203',
      name: '用药情况_ 胰岛素_种类_4',
      value: ' '
    }, {
      key: '31204',
      name: '用药情况_ 胰岛素_用法和用量_4',
      value: ' '
    }, {
      key: '31205',
      name: '转诊_原因_1',
      value: data.diabReferralReason
    }, {
      key: '31206',
      name: '转诊_原因_2',
      value: ' '
    }, {
      key: '31207',
      name: '转诊_原因_3',
      value: ' '
    }, {
      key: '31208',
      name: '转诊_原因_4',
      value: ' '
    }, {
      key: '31209',
      name: '转诊_机构及科别_1',
      value: data.diabReferralHospital
    }, {
      key: '31210',
      name: '转诊_机构及科别_2',
      value: ' '
    }, {
      key: '31211',
      name: '转诊_机构及科别_3',
      value: ' '
    }, {
      key: '31212',
      name: '转诊_机构及科别_4',
      value: ' '
    }, {
      key: '31213',
      name: '下次随访日期_1',
      value: common.Util.formatDate(data.nextVisitDate)
    }, {
      key: '31214',
      name: '下次随访日期_2',
      value: ' '
    }, {
      key: '31215',
      name: '下次随访日期_3',
      value: ' '
    }, {
      key: '31216',
      name: '下次随访日期_4',
      value: ' '
    }, {
      key: '31217',
      name: '随访医生签名_1',
      value: ' '
    }, {
      key: '31218',
      name: '随访医生签名_2',
      value: ' '
    }, {
      key: '31219',
      name: '随访医生签名_3',
      value: ' '
    }, {
      key: '31220',
      name: '随访医生签名_4',
      value: ' '
    }];

    var temp = [{
        key: '31161',
        name: '用药情况_ 药物名称1_1',
        value: ' '
      }, {
        key: '31165',
        name: '用药情况_ 用法用量1_每日次_1',
        value: ' '
      }, {
        key: '31166',
        name: '用药情况_ 用法用量1_每次mg_1',
        value: ' '
      }, {
        key: '31173',
        name: '用药情况_ 药物名称1_1',
        value: ' '
      }, {
        key: '31177',
        name: '用药情况_ 用法用量2_每日次_1',
        value: ' '
      }, {
        key: '31178',
        name: '用药情况_ 用法用量2_每次mg_1',
        value: ' '
      }, {
        key: '31185',
        name: '用药情况_ 药物名称3_1',
        value: ' '
      }, {
        key: '31189',
        name: '用药情况_ 用法用量3_每日次_1',
        value: ' '
      }, {
        key: '31190',
        name: '用药情况_ 用法用量3_每次mg_1',
        value: ' '
      }, {
        key: '31221',
        name: '随访日期_1',
        value: common.Util.formatDate(data.createDate)
      }, {
        key: '31222',
        name: '随访日期_2',
        value: ' '
      }, {
        key: '31223',
        name: '随访日期_3',
        value: ' '
      }, {
        key: '31224',
        name: '随访日期_4',
        value: ' '
      }
      /*, {
            key: '31197',
            name: '用药情况_ 胰岛素_种类_1',
            value: ' '
          }, {
            key: '31198',
            name: '用药情况_ 胰岛素_用法和用量_1',
            value: ' '
          }*/
    ];
    var tempItem = {};
    var ii = _.findIndex(data.useMedicationList, function(item) {
      return item.medDrugName == '胰岛素';
    });
    tempItem = {
      key: '31197',
      name: '用药情况_ 胰岛素_种类_1',
      value: (ii >= 0 && data.useMedicationList[ii].medDrugName) || ' '
    };
    dataArr.push(tempItem);
    tempItem = {
      key: '31198',
      name: '用药情况_ 胰岛素_用法和用量_1',
      value: (ii >= 0 && data.useMedicationList[ii].medConsumption) || ' '
    };
    dataArr.push(tempItem);

    ii >= 0 && data.useMedicationList.splice(ii, 1);

    _.forEach(data.useMedicationList, function(item) {
      tempItem = temp.shift();
      tempItem.value = item.medDrugName;
      dataArr.push(tempItem);
      tempItem = temp.shift();
      tempItem.value = item.medUsage;
      dataArr.push(tempItem);
      tempItem = temp.shift();
      tempItem.value = item.medConsumption;
      dataArr.push(tempItem);
    });
    _.forEach(temp, function(item) {
      dataArr.push(item);
    });

    return dataArr;

  };

  return formTemplate;
}));
