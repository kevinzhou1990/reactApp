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
    var createDate = common.Util.formatDate(data.createDate, '-').split('-');
    var bodySymptomList = (function() {
      var result = [];
      _.forEach(data.bodySymptomList, function(item) {
        //头痛头晕
        if (item.symName == 'sym_headache_dizzy' && item.symType == 1) {
          result.push(2);
        }
        //恶心呕吐
        if (item.symName == 'sym_nausea_vomiting' && item.symType == 1) {
          result.push(3);
        }
        //呼吸困难
        if (item.symName == 'sym_tinnitus_vertigo' && item.symType == 1) {
          result.push(4);
        }
        //头痛头晕
        if (item.symName == 'sym_dyspnea' && item.symType == 1) {
          result.push(5);
        }
        //心悸胸闷
        if (item.symName == 'sym_chest_tightness' && item.symType == 1) {
          result.push(6);
        }
        //鼻衄出血不止
        if (item.symName == 'sym_epistaxis_bleeding' && item.symType == 1) {
          result.push(7);
        }
        //四肢发麻
        if (item.symName == 'sym_numbness_limbs' && item.symType == 1) {
          result.push(8);
        }
        //下肢水肿
        if (item.symName == 'sym_lower_extremity' && item.symType == 1) {
          result.push(9);
        }


      });
      if (result.length == 0) {
        result.push(1);
      }
      return result;
    })();
    dataArr = [{
      key: '29000',
      name: '姓名',
      value: data.residentName
    }, {
      key: '29001',
      name: '编号',
      value: data.residentNo
    }, {
      key: '29002',
      name: '随访日期_年_1',
      value: createDate[0]
    }, {
      key: '29003',
      name: '随访日期_月_1',
      value: createDate[1]
    }, {
      key: '29004',
      name: '随访日期_日_1',
      value: createDate[2]
    }, {
      key: '29005',
      name: '随访日期_年_2',
      value: ' '
    }, {
      key: '29006',
      name: '随访日期_月_2',
      value: ' '
    }, {
      key: '29007',
      name: '随访日期_日_2',
      value: ' '
    }, {
      key: '29008',
      name: '随访日期_年_3',
      value: ' '
    }, {
      key: '29009',
      name: '随访日期_月_3',
      value: ' '
    }, {
      key: '29010',
      name: '随访日期_日_3',
      value: ' '
    }, {
      key: '29011',
      name: '随访日期_年_4',
      value: ' '
    }, {
      key: '29012',
      name: '随访日期_月_4',
      value: ' '
    }, {
      key: '29013',
      name: '随访日期_日_4',
      value: ' '
    }, {
      key: '29014',
      name: '随访方式_1',
      value: data.hyperVisitType //随访方式 1：门诊 2：家庭 3：电话
    }, {
      key: '29015',
      name: '随访方式_2',
      value: ' ' //随访方式 1：门诊 2：家庭 3：电话
    }, {
      key: '29016',
      name: '随访方式_3',
      value: ' ' //随访方式 1：门诊 2：家庭 3：电话
    }, {
      key: '29017',
      name: '随访方式_4',
      value: ' ' //随访方式 1：门诊 2：家庭 3：电话
    }, {
      key: '29018',
      name: '症状_1_1(多选)',
      value: bodySymptomList[0]
    }, {
      key: '29019',
      name: '症状_1_2(多选)',
      value: bodySymptomList[1]
    }, {
      key: '29020',
      name: '症状_1_3(多选)',
      value: bodySymptomList[2]
    }, {
      key: '29021',
      name: '症状_1_4(多选)',
      value: bodySymptomList[3]
    }, {
      key: '29022',
      name: '症状_1_5(多选)',
      value: bodySymptomList[4]
    }, {
      key: '29023',
      name: '症状_1_6(多选)',
      value: bodySymptomList[5]
    }, {
      key: '29024',
      name: '症状_1_7(多选)',
      value: bodySymptomList[6]
    }, {
      key: '29025',
      name: '症状_1_8(多选)',
      value: bodySymptomList[7]
    }, {
      key: '29026',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29027',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29028',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29029',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29030',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29031',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29032',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29033',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29034',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29035',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29036',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29037',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29038',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29039',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29040',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29041',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29042',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29043',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29044',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29045',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29046',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29047',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29048',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29049',
      name: '症状_1(多选)',
      value: ' '
    }, {
      key: '29050',
      name: '症状_其他_1',
      value: function() {
        var item = _.find(data.bodySymptomList, function(item) {
          return item.symName == 'sym_other';
        });
        if (item && item.symType == 1) {
          return item.symDescribe;
        }
        return ' ';
      }
    }, {
      key: '29051',
      name: '症状_其他_2',
      value: ' '
    }, {
      key: '29052',
      name: '症状_其他_3',
      value: ' '
    }, {
      key: '29053',
      name: '症状_其他_4',
      value: ' '
    }, {
      key: '29054',
      name: '体征_血压_1',
      value: data.hyperBloodpreLow + '/' + data.hyperBlooderHigh
    }, {
      key: '29055',
      name: '体征_血压_2',
      value: ' '
    }, {
      key: '29056',
      name: '体征_血压_3',
      value: ' '
    }, {
      key: '29057',
      name: '体征_血压_4',
      value: ' '
    }, {
      key: '29058',
      name: '体征_体重_左_1',
      value: data.hyperCurrentWeight
    }, {
      key: '29059',
      name: '体征_体重_右_1',
      value: data.hyperTargetWeight
    }, {
      key: '29060',
      name: '体征_体重_左_2',
      value: ' '
    }, {
      key: '29061',
      name: '体征_体重_右_2',
      value: ' '
    }, {
      key: '29062',
      name: '体征_体重_左_3',
      value: ' '
    }, {
      key: '29063',
      name: '体征_体重_右_3',
      value: ' '
    }, {
      key: '29064',
      name: '体征_体重_左_4',
      value: ' '
    }, {
      key: '29065',
      name: '体征_体重_右_4',
      value: ' '
    }, {
      key: '29066',
      name: '体征_体质指数_左_1',
      value: data.hyperCurrentConstitution
    }, {
      key: '29067',
      name: '体征_体质指数_右_1',
      value: data.hyperTargerConstition
    }, {
      key: '29068',
      name: '体征_体质指数_左_2',
      value: ' '
    }, {
      key: '29069',
      name: '体征_体质指数_右_2',
      value: ' '
    }, {
      key: '29070',
      name: '体征_体质指数_左_3',
      value: ' '
    }, {
      key: '29071',
      name: '体征_体质指数_右_3',
      value: ' '
    }, {
      key: '29072',
      name: '体征_体质指数_左_4',
      value: ' '
    }, {
      key: '29073',
      name: '体征_体质指数_右_4',
      value: ' '
    }, {
      key: '29074',
      name: '体征_心率_1',
      value: data.hyperHeartRate
    }, {
      key: '29075',
      name: '体征_心率_2',
      value: ' '
    }, {
      key: '29076',
      name: '体征_心率_3',
      value: ' '
    }, {
      key: '29077',
      name: '体征_心率_4',
      value: ' '
    }, {
      key: '29078',
      name: '体征_其他_1',
      value: data.hyperSignOther
    }, {
      key: '29079',
      name: '体征_其他_2',
      value: ' '
    }, {
      key: '29080',
      name: '体征_其他_3',
      value: ' '
    }, {
      key: '29081',
      name: '体征_其他_4',
      value: ' '
    }, {
      key: '29082',
      name: '生活方式指导_日吸烟量(支)_左_1',
      value: data.hyperCurrentSmoking
    }, {
      key: '29083',
      name: '生活方式指导_日吸烟量(支)_右_1',
      value: data.hyperTargerSmoking + ''
    }, {
      key: '29084',
      name: '生活方式指导_日吸烟量(支)_左_2',
      value: ' '
    }, {
      key: '29085',
      name: '生活方式指导_日吸烟量(支)_右_2',
      value: ' '
    }, {
      key: '29086',
      name: '生活方式指导_日吸烟量(支)_左_3',
      value: ' '
    }, {
      key: '29087',
      name: '生活方式指导_日吸烟量(支)_右_3',
      value: ' '
    }, {
      key: '29088',
      name: '生活方式指导_日吸烟量(支)_左_4',
      value: ' '
    }, {
      key: '29089',
      name: '生活方式指导_日吸烟量(支)_右_4',
      value: ' '
    }, {
      key: '29090',
      name: '生活方式指导_日饮酒量(两)_左_1',
      value: data.hyperCurrentDrink
    }, {
      key: '29091',
      name: '生活方式指导_日饮酒量(两)_右_1',
      value: data.hyperTargerDrink + ''
    }, {
      key: '29092',
      name: '生活方式指导_日饮酒量(两)_左_2',
      value: ' '
    }, {
      key: '29093',
      name: '生活方式指导_日饮酒量(两)_右_2',
      value: ' '
    }, {
      key: '29094',
      name: '生活方式指导_日饮酒量(两)_左_3',
      value: ' '
    }, {
      key: '29095',
      name: '生活方式指导_日饮酒量(两)_右_3',
      value: ' '
    }, {
      key: '29096',
      name: '生活方式指导_日饮酒量(两)_左_4',
      value: ' '
    }, {
      key: '29097',
      name: '生活方式指导_日饮酒量(两)_右_4',
      value: ' '
    }, {
      key: '29098',
      name: '生活方式指导_运动_次/周_上_1',
      value: data.hyperCurrentSportcount
    }, {
      key: '29099',
      name: '生活方式指导_运动_分钟/次_上_1',
      value: data.hyperCurrentSporttime
    }, {
      key: '29100',
      name: '生活方式指导_运动_次/周_下_1',
      value: data.hyperTargetSportcount
    }, {
      key: '29101',
      name: '生活方式指导_运动_分钟/次_下_1',
      value: data.hyperTargerSporttime
    }, {
      key: '29102',
      name: '生活方式指导_运动_次/周_上_2',
      value: ' '
    }, {
      key: '29103',
      name: '生活方式指导_运动_分钟/次_上_2',
      value: ' '
    }, {
      key: '29104',
      name: '生活方式指导_运动_次/周_下_2',
      value: ' '
    }, {
      key: '29105',
      name: '生活方式指导_运动_分钟/次_下_2',
      value: ' '
    }, {
      key: '29106',
      name: '生活方式指导_运动_分钟/次_下_3',
      value: ' '
    }, {
      key: '29107',
      name: '生活方式指导_运动_次/周_上_3',
      value: ' '
    }, {
      key: '29108',
      name: '生活方式指导_运动_分钟/次_上_3',
      value: ' '
    }, {
      key: '29109',
      name: '生活方式指导_运动_次/周_下_3',
      value: ' '
    }, {
      key: '29110',
      name: '生活方式指导_运动_分钟/次_下_4',
      value: ' '
    }, {
      key: '29111',
      name: '生活方式指导_运动_分钟/次_下_4',
      value: ' '
    }, {
      key: '29112',
      name: '生活方式指导_运动_次/周_上_4',
      value: ' '
    }, {
      key: '29113',
      name: '生活方式指导_运动_分钟/次_上_4',
      value: ' '
    }, {
      key: '29114',
      name: '生活方式指导_摄盐情况(咸淡)_轻_左_1',
      value: function() {
        if (data.hyperCurrentSaltuptake == 1) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '29115',
      name: '生活方式指导_摄盐情况(咸淡)_中_左_1',
      value: function() {
        if (data.hyperCurrentSaltuptake == 2) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '29116',
      name: '生活方式指导_摄盐情况(咸淡)_重_左_1',
      value: function() {
        if (data.hyperCurrentSaltuptake == 3) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '29117',
      name: '生活方式指导_摄盐情况(咸淡)_轻_右_1',
      value: function() {
        if (data.hyperTargetSaltuptake == 1) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '29118',
      name: '生活方式指导_摄盐情况(咸淡)_中_右_1',
      value: function() {
        if (data.hyperTargetSaltuptake == 2) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '29119',
      name: '生活方式指导_摄盐情况(咸淡)_重_右_1',
      value: function() {
        if (data.hyperTargetSaltuptake == 3) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '29120',
      name: '生活方式指导_摄盐情况(咸淡)_轻_左_2',
      value: ' '
    }, {
      key: '29121',
      name: '生活方式指导_摄盐情况(咸淡)_中_左_2',
      value: ' '
    }, {
      key: '29122',
      name: '生活方式指导_摄盐情况(咸淡)_重_左_2',
      value: ' '
    }, {
      key: '29123',
      name: '生活方式指导_摄盐情况(咸淡)_轻_右_2',
      value: ' '
    }, {
      key: '29124',
      name: '生活方式指导_摄盐情况(咸淡)_中_右_2',
      value: ' '
    }, {
      key: '29125',
      name: '生活方式指导_摄盐情况(咸淡)_重_右_2',
      value: ' '
    }, {
      key: '29126',
      name: '生活方式指导_摄盐情况(咸淡)_轻_左_3',
      value: ' '
    }, {
      key: '29127',
      name: '生活方式指导_摄盐情况(咸淡)_中_左_3',
      value: ' '
    }, {
      key: '29128',
      name: '生活方式指导_摄盐情况(咸淡)_重_左_3',
      value: ' '
    }, {
      key: '29129',
      name: '生活方式指导_摄盐情况(咸淡)_轻_右_3',
      value: ' '
    }, {
      key: '29130',
      name: '生活方式指导_摄盐情况(咸淡)_中_右_3',
      value: ' '
    }, {
      key: '29131',
      name: '生活方式指导_摄盐情况(咸淡)_重_右_3',
      value: ' '
    }, {
      key: '29132',
      name: '生活方式指导_摄盐情况(咸淡)_轻_左_4',
      value: ' '
    }, {
      key: '29133',
      name: '生活方式指导_摄盐情况(咸淡)_中_左_4',
      value: ' '
    }, {
      key: '29134',
      name: '生活方式指导_摄盐情况(咸淡)_重_左_4',
      value: ' '
    }, {
      key: '29135',
      name: '生活方式指导_摄盐情况(咸淡)_轻_右_4',
      value: ' '
    }, {
      key: '29136',
      name: '生活方式指导_摄盐情况(咸淡)_中_右_4',
      value: ' '
    }, {
      key: '29137',
      name: '生活方式指导_摄盐情况(咸淡)_重_右_4',
      value: ' '
    }, {
      key: '29138',
      name: '生活方式指导_心理调整_1',
      value: data.hyperPsychologicalAdjustment //'心理调整  1:良好  2：一般 3：差',
    }, {
      key: '29139',
      name: '生活方式指导_心理调整_2',
      value: ' '
    }, {
      key: '29140',
      name: '生活方式指导_心理调整_3',
      value: ' '
    }, {
      key: '29141',
      name: '生活方式指导_心理调整_4',
      value: ' '
    }, {
      key: '29142',
      name: '生活方式指导_遵医行为_1',
      value: data.hyperComplianceBehavior //遵医行为 1:良好  2：一般 3：差'
    }, {
      key: '29143',
      name: '生活方式指导_遵医行为_2',
      value: ' '
    }, {
      key: '29144',
      name: '生活方式指导_遵医行为_3',
      value: ' '
    }, {
      key: '29145',
      name: '生活方式指导_遵医行为_4',
      value: ' '
    }, {
      key: '29146',
      name: '辅助检查*_1',
      value: data.hyperSupplementExam
    }, {
      key: '29147',
      name: '辅助检查*_2',
      value: ' '
    }, {
      key: '29148',
      name: '辅助检查*_3',
      value: ' '
    }, {
      key: '29149',
      name: '辅助检查*_4',
      value: ' '
    }, {
      key: '29150',
      name: '服药依从性_1',
      value: data.hyperMedicationCompliance // 服药依从性 1：规律 2：间断  3：不服药
    }, {
      key: '29151',
      name: '服药依从性_2',
      value: ' '
    }, {
      key: '29152',
      name: '服药依从性_3',
      value: ' '
    }, {
      key: '29153',
      name: '服药依从性_4',
      value: ' '
    }, {
      key: '29154',
      name: '药物不良反应_有_1',
      value: function() {
        if (data.hyperDrugEffect == 1) {
          return data.hyperDrugDescribe;
        }
        return ' ';
      }
    }, {
      key: '29155',
      name: '药物不良反应_1',
      value: function() {
        if (data.hyperDrugEffect == 1) {
          return 2;
        }
        if (data.hyperDrugEffect == 2) {
          return 1;
        }
        return ' ';
      }
    }, {
      key: '29156',
      name: '药物不良反应_有_2',
      value: ' '
    }, {
      key: '29157',
      name: '药物不良反应_2',
      value: ' '
    }, {
      key: '29158',
      name: '药物不良反应_有_3',
      value: ' '
    }, {
      key: '29159',
      name: '药物不良反应_3',
      value: ' '
    }, {
      key: '29160',
      name: '药物不良反应_有_4',
      value: ' '
    }, {
      key: '29161',
      name: '药物不良反应_4',
      value: ' '
    }, {
      key: '29162',
      name: '此次随访分类_1',
      value: data.hyperVisitSurvey // 随访分类   1：控制满意 2：控制不满意 3：不良反应  4：并发症
    }, {
      key: '29163',
      name: '此次随访分类_2',
      value: ' '
    }, {
      key: '29164',
      name: '此次随访分类_3',
      value: ' '
    }, {
      key: '29165',
      name: '此次随访分类_4',
      value: ' '
    }, {
      key: '29167',
      name: '用药情况_ 药物名称1_2',
      value: ' '
    }, {
      key: '29168',
      name: '用药情况_ 药物名称1_3',
      value: ' '
    }, {
      key: '29169',
      name: '用药情况_ 药物名称1_4',
      value: ' '
    }, {
      key: '29172',
      name: '用药情况_ 用法用量1_每日次_2',
      value: ' '
    }, {
      key: '29173',
      name: '用药情况_ 用法用量1_每次mg_2',
      value: ' '
    }, {
      key: '29174',
      name: '用药情况_ 用法用量1_每日次_3',
      value: ' '
    }, {
      key: '29175',
      name: '用药情况_ 用法用量1_每次mg_3',
      value: ' '
    }, {
      key: '29176',
      name: '用药情况_ 用法用量1_每日次_4',
      value: ' '
    }, {
      key: '29177',
      name: '用药情况_ 用法用量1_每次mg_4',
      value: ' '
    }, {
      key: '29179',
      name: '用药情况_ 药物名称2_2',
      value: ' '
    }, {
      key: '29180',
      name: '用药情况_ 药物名称2_3',
      value: ' '
    }, {
      key: '29181',
      name: '用药情况_ 药物名称2_4',
      value: ' '
    }, {
      key: '29184',
      name: '用药情况_ 用法用量2_每日次_2',
      value: ' '
    }, {
      key: '29185',
      name: '用药情况_ 用法用量2_每次mg_2',
      value: ' '
    }, {
      key: '29186',
      name: '用药情况_ 用法用量2_每日次_3',
      value: ' '
    }, {
      key: '29187',
      name: '用药情况_ 用法用量2_每次mg_3',
      value: ' '
    }, {
      key: '29188',
      name: '用药情况_ 用法用量2_每日次_4',
      value: ' '
    }, {
      key: '29189',
      name: '用药情况_ 用法用量2_每次mg_4',
      value: ' '
    }, {
      key: '29191',
      name: '用药情况_ 药物名称3_2',
      value: ' '
    }, {
      key: '29192',
      name: '用药情况_ 药物名称3_3',
      value: ' '
    }, {
      key: '29193',
      name: '用药情况_ 药物名称3_4',
      value: ' '
    }, {
      key: '29196',
      name: '用药情况_ 用法用量3_每日次_2',
      value: ' '
    }, {
      key: '29197',
      name: '用药情况_ 用法用量3_每次mg_2',
      value: ' '
    }, {
      key: '29198',
      name: '用药情况_ 用法用量3_每日次_3',
      value: ' '
    }, {
      key: '29199',
      name: '用药情况_ 用法用量3_每次mg_3',
      value: ' '
    }, {
      key: '29200',
      name: '用药情况_ 用法用量3_每日次_4',
      value: ' '
    }, {
      key: '29201',
      name: '用药情况_ 用法用量3_每次mg_4',
      value: ' '
    }, {
      key: '29203',
      name: '用药情况_其他药物_2',
      value: ' '
    }, {
      key: '29204',
      name: '用药情况_其他药物_3',
      value: ' '
    }, {
      key: '29205',
      name: '用药情况_其他药物_4',
      value: ' '
    }, {
      key: '29208',
      name: '用药情况_ 用法用量4_每日次_2',
      value: ' '
    }, {
      key: '29209',
      name: '用药情况_ 用法用量4_每次mg_2',
      value: ' '
    }, {
      key: '29210',
      name: '用药情况_ 用法用量4_每日次_3',
      value: ' '
    }, {
      key: '29211',
      name: '用药情况_ 用法用量4_每次mg_3',
      value: ' '
    }, {
      key: '29212',
      name: '用药情况_ 用法用量4_每日次_4',
      value: ' '
    }, {
      key: '29213',
      name: '用药情况_ 用法用量4_每次mg_4',
      value: ' '
    }, {
      key: '29214',
      name: '转诊_原因_1',
      value: data.hyperReferralReason
    }, {
      key: '29215',
      name: '转诊_原因_2',
      value: ' '
    }, {
      key: '29216',
      name: '转诊_原因_3',
      value: ' '
    }, {
      key: '29217',
      name: '转诊_原因_4',
      value: ' '
    }, {
      key: '29218',
      name: '转诊_机构及科别_1',
      value: data.hyperReferralHopital
    }, {
      key: '29219',
      name: '转诊_机构及科别_2',
      value: ' '
    }, {
      key: '29220',
      name: '转诊_机构及科别_3',
      value: ' '
    }, {
      key: '29221',
      name: '转诊_机构及科别_4',
      value: ' '
    }, {
      key: '29222',
      name: '下次随访日期_1',
      value: common.Util.formatDate(data.nextVisitDate)
    }, {
      key: '29223',
      name: '下次随访日期_2',
      value: ' '
    }, {
      key: '29224',
      name: '下次随访日期_3',
      value: ' '
    }, {
      key: '29225',
      name: '下次随访日期_4',
      value: ' '
    }, {
      key: '29226',
      name: '随访医生签名_1',
      value: ' '
    }, {
      key: '29227',
      name: '随访医生签名_2',
      value: ' '
    }, {
      key: '29228',
      name: '随访医生签名_3',
      value: ' '
    }, {
      key: '29229',
      name: '随访医生签名_4',
      value: ' '
    }];

    var temp = [{
      key: '29166',
      name: '用药情况_ 药物名称1_1',
      value: ' '
    }, {
      key: '29170',
      name: '用药情况_ 用法用量1_每日次_1',
      value: ' '
    }, {
      key: '29171',
      name: '用药情况_ 用法用量1_每次mg_1',
      value: ' '
    }, {
      key: '29178',
      name: '用药情况_ 药物名称1_1',
      value: ' '
    }, {
      key: '29182',
      name: '用药情况_ 用法用量2_每日次_1',
      value: ' '
    }, {
      key: '29183',
      name: '用药情况_ 用法用量2_每次mg_1',
      value: ' '
    }, {
      key: '29190',
      name: '用药情况_ 药物名称3_1',
      value: ' '
    }, {
      key: '29194',
      name: '用药情况_ 用法用量3_每日次_1',
      value: ' '
    }, {
      key: '29195',
      name: '用药情况_ 用法用量3_每次mg_1',
      value: ' '
    }, {
      key: '29202',
      name: '用药情况_其他药物_1',
      value: ' '
    }, {
      key: '29206',
      name: '用药情况_ 用法用量4_每日次_1',
      value: ' '
    }, {
      key: '29207',
      name: '用药情况_ 用法用量4_每次mg_1',
      value: ' '
    }];
    var tempItem = {};
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
