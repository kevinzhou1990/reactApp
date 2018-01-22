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
    var phthStopDate = common.Util.formatDate(data.phthStopDate, '-').split('-');
    var bodySymptomList = (function() {
      var result = [];
      _.forEach(data.bodySymptomList, function(item) {
        //咳嗽咳痰
        if (item.symName == 'sym_expectoration_cough' && item.symType == 1) {
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

        //关节疼痛
        if (item.symName == 'sym_joint_pain' && item.symType == 1) {
          result.push(6);
        }

        //头痛失眠
        if (item.symName == 'sym_headache_insomnia' && item.symType == 1) {
          result.push(7);
        }
        //视物模糊
        if (item.symName == 'sym_blurred_vision_phth' && item.symType == 1) {
          result.push(8);
        }
        //皮肤瘙痒、皮疹
        if (item.symName == 'sym_skin_itch_phth' && item.symType == 1) {
          result.push(9);
        }
        //耳鸣、听力下降
        if (item.symName == 'sym_tinnitus_phth' && item.symType == 1) {
          result.push(10);
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
    return [{
      key: '36000',
      name: '姓名',
      value: data.residentName
    }, {
      key: '36001',
      name: '随访日期_年_1',
      value: createDate[0]
    }, {
      key: '36002',
      name: '随访日期_月_1',
      value: createDate[1]
    }, {
      key: '36003',
      name: '随访日期_日_1',
      value: createDate[2]
    }, {
      key: '36004',
      name: '随访日期_年_2',
      value: ' '
    }, {
      key: '36005',
      name: '随访日期_月_2',
      value: ' '
    }, {
      key: '36006',
      name: '随访日期_日_2',
      value: ' '
    }, {
      key: '36007',
      name: '随访日期_年_3',
      value: ' '
    }, {
      key: '36008',
      name: '随访日期_月_3',
      value: ' '
    }, {
      key: '36009',
      name: '随访日期_日_3',
      value: ' '
    }, {
      key: '36010',
      name: '随访日期_年_4',
      value: ' '
    }, {
      key: '36011',
      name: '随访日期_月_4',
      value: ' '
    }, {
      key: '36012',
      name: '随访日期_日_4',
      value: ' '
    }, {
      key: '36013',
      name: '治疗月序_1',
      value: data.phthVisitMonth.substr(1, 1)
    }, {
      key: '36014',
      name: '治疗月序_2',
      value: ' '
    }, {
      key: '36015',
      name: '治疗月序_3',
      value: ' '
    }, {
      key: '36016',
      name: '治疗月序_4',
      value: ' '
    }, {
      key: '36017',
      name: '督导人员_医生_1',
      value: function() {
        if (data.phthSupervisor == 1) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '36018',
      name: '督导人员_家属_1',
      value: function() {
        if (data.phthSupervisor == 2) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '36019',
      name: '督导人员_自服药_1',
      value: function() {
        if (data.phthSupervisor == 3) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '36020',
      name: '督导人员_其他_1',
      value: function() {
        if (data.phthSupervisor == 4) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '36021',
      name: '督导人员_医生_2',
      value: ' '
    }, {
      key: '36022',
      name: '督导人员_家属_2',
      value: ' '
    }, {
      key: '36023',
      name: '督导人员_自服药_2',
      value: ' '
    }, {
      key: '36024',
      name: '督导人员_其他_2',
      value: ' '
    }, {
      key: '36025',
      name: '督导人员_医生_3',
      value: ' '
    }, {
      key: '36026',
      name: '督导人员_家属_3',
      value: ' '
    }, {
      key: '36027',
      name: '督导人员_自服药_3',
      value: ' '
    }, {
      key: '36028',
      name: '督导人员_其他_3',
      value: ' '
    }, {
      key: '36029',
      name: '督导人员_医生_4',
      value: ' '
    }, {
      key: '36030',
      name: '督导人员_家属_4',
      value: ' '
    }, {
      key: '36031',
      name: '督导人员_自服药_4',
      value: ' '
    }, {
      key: '36032',
      name: '督导人员_其他_4',
      value: ' '
    }, {
      key: '36033',
      name: '随访方式_1',
      value: data.phthVisitStyle //随访方式 1门诊 2家庭  3电话
    }, {
      key: '36034',
      name: '随访方式_2',
      value: ' '
    }, {
      key: '36035',
      name: '随访方式_3',
      value: ' '
    }, {
      key: '36036',
      name: '随访方式_4',
      value: ' '
    }, {
      key: '36037',
      name: '症状及体征_1_1',
      value: bodySymptomList[0]
    }, {
      key: '36038',
      name: '症状及体征_1_2',
      value: bodySymptomList[1]
    }, {
      key: '36039',
      name: '症状及体征_1_3',
      value: bodySymptomList[2]
    }, {
      key: '36040',
      name: '症状及体征_1_4',
      value: bodySymptomList[3]
    }, {
      key: '36041',
      name: '症状及体征_1_5',
      value: bodySymptomList[4]
    }, {
      key: '36042',
      name: '症状及体征_1_6',
      value: bodySymptomList[5]
    }, {
      key: '36043',
      name: '症状及体征_1_7',
      value: bodySymptomList[6]
    }, {
      key: '36044',
      name: '症状及体征_其他_1',
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
      key: '36045',
      name: '症状及体征_2_1',
      value: bodySymptomList[6]
    }, {
      key: '36046',
      name: '症状及体征_2_2',
      value: ' '
    }, {
      key: '36047',
      name: '症状及体征_2_3',
      value: ' '
    }, {
      key: '36048',
      name: '症状及体征_2_4',
      value: ' '
    }, {
      key: '36049',
      name: '症状及体征_2_5',
      value: ' '
    }, {
      key: '36050',
      name: '症状及体征_2_6',
      value: ' '
    }, {
      key: '36051',
      name: '症状及体征_2_7',
      value: ' '
    }, {
      key: '36052',
      name: '症状及体征_其他_2',
      value: ' '
    }, {
      key: '36053',
      name: '症状及体征_3_1',
      value: ' '
    }, {
      key: '36054',
      name: '症状及体征_3_2',
      value: ' '
    }, {
      key: '36055',
      name: '症状及体征_3_3',
      value: ' '
    }, {
      key: '36056',
      name: '症状及体征_3_4',
      value: ' '
    }, {
      key: '36057',
      name: '症状及体征_3_5',
      value: ' '
    }, {
      key: '36058',
      name: '症状及体征_3_6',
      value: ' '
    }, {
      key: '36059',
      name: '症状及体征_3_7',
      value: ' '
    }, {
      key: '36060',
      name: '症状及体征_其他_3',
      value: ' '
    }, {
      key: '36061',
      name: '症状及体征_4_1',
      value: ' '
    }, {
      key: '36062',
      name: '症状及体征_4_2',
      value: ' '
    }, {
      key: '36063',
      name: '症状及体征_4_3',
      value: ' '
    }, {
      key: '36064',
      name: '症状及体征_4_4',
      value: ' '
    }, {
      key: '36065',
      name: '症状及体征_4_5',
      value: ' '
    }, {
      key: '36066',
      name: '症状及体征_4_6',
      value: ' '
    }, {
      key: '36067',
      name: '症状及体征_4_7',
      value: ' '
    }, {
      key: '36068',
      name: '症状及体征_其他_4',
      value: ' '
    }, {
      key: '36069',
      name: '生活方式指导_吸烟_支_1',
      value: data.phthCurrentSmoke
    }, {
      key: '36070',
      name: '生活方式指导_吸烟_天_1',
      value: data.phthTargerSmoke + ''
    }, {
      key: '36071',
      name: '生活方式指导_吸烟_支_2',
      value: ' '
    }, {
      key: '36072',
      name: '生活方式指导_吸烟_天_2',
      value: ' '
    }, {
      key: '36073',
      name: '生活方式指导_吸烟_支_3',
      value: ' '
    }, {
      key: '36074',
      name: '生活方式指导_吸烟_天_3',
      value: ' '
    }, {
      key: '36075',
      name: '生活方式指导_吸烟_支_4',
      value: ' '
    }, {
      key: '36076',
      name: '生活方式指导_吸烟_天_4',
      value: ' '
    }, {
      key: '36077',
      name: '生活方式指导_饮酒_两_1',
      value: data.phthCurrentDrink
    }, {
      key: '36078',
      name: '生活方式指导_饮酒_天_1',
      value: data.phthTargerDrink + ''
    }, {
      key: '36079',
      name: '生活方式指导_饮酒_两_2',
      value: ' '
    }, {
      key: '36080',
      name: '生活方式指导_饮酒_天_2',
      value: ' '
    }, {
      key: '36081',
      name: '生活方式指导_饮酒_两_3',
      value: ' '
    }, {
      key: '36082',
      name: '生活方式指导_饮酒_天_3',
      value: ' '
    }, {
      key: '36083',
      name: '生活方式指导_饮酒_两_4',
      value: ' '
    }, {
      key: '36084',
      name: '生活方式指导_饮酒_天_4',
      value: ' '
    }, {
      key: '36085',
      name: '用药_化疗方案_1',
      value: data.phthChemotherapy
    }, {
      key: '36086',
      name: '用药_化疗方案_2',
      value: ' '
    }, {
      key: '36087',
      name: '用药_化疗方案_3',
      value: ' '
    }, {
      key: '36088',
      name: '用药_化疗方案_4',
      value: ' '
    }, {
      key: '36089',
      name: '用药_用法_1',
      value: data.phthDrugUsag //药物用法频率  1每日 2 间歇
    }, {
      key: '36090',
      name: '用药_用法_1',
      value: ' '
    }, {
      key: '36091',
      name: '用药_用法_1',
      value: ' '
    }, {
      key: '36092',
      name: '用药_用法_1',
      value: ' '
    }, {
      key: '36093',
      name: '用药_药品剂型_1_1（多选）',
      value: function() {
        if (data.phthCompoundPreparation == 1) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '36094',
      name: '用药_药品剂型_1_2（多选）',
      value: function() {
        if (data.phthBulkLoading == 1) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '36095',
      name: '用药_药品剂型_1_3（多选）',
      value: function() {
        if (data.phthPlateCombination == 1) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '36096',
      name: '用药_药品剂型_1_4（多选）',
      value: function() {
        if (data.phthInjection == 1) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '36097',
      name: '用药_药品剂型_1_4（多选）',
      value: ' '
    }, {
      key: '36098',
      name: '用药_药品剂型_1_4（多选）',
      value: ' '
    }, {
      key: '36099',
      name: '用药_药品剂型_1_4（多选）',
      value: ' '
    }, {
      key: '36100',
      name: '用药_药品剂型_1_4（多选）',
      value: ' '
    }, {
      key: '36101',
      name: '用药_药品剂型_1_4（多选）',
      value: ' '
    }, {
      key: '36102',
      name: '用药_药品剂型_1_4（多选）',
      value: ' '
    }, {
      key: '36103',
      name: '用药_药品剂型_1_4（多选）',
      value: ' '
    }, {
      key: '36104',
      name: '用药_药品剂型_1_4（多选）',
      value: ' '
    }, {
      key: '36105',
      name: '用药_药品剂型_1_4（多选）',
      value: ' '
    }, {
      key: '36106',
      name: '用药_药品剂型_1_4（多选）',
      value: ' '
    }, {
      key: '36107',
      name: '用药_药品剂型_1_4（多选）',
      value: ' '
    }, {
      key: '36108',
      name: '用药_药品剂型_1_4（多选）',
      value: ' '
    }, {
      key: '36109',
      name: '用药_药品剂型_漏药次数_1',
      value: data.phthDrugMiss
    }, {
      key: '36110',
      name: '用药_药品剂型_漏药次数_2',
      value: ' '
    }, {
      key: '36111',
      name: '用药_药品剂型_漏药次数_3',
      value: ' '
    }, {
      key: '36112',
      name: '用药_药品剂型_漏药次数_4',
      value: ' '
    }, {
      key: '36113',
      name: '药物不良反应_1',
      value: function() {
        if (data.phthDrugReaction == 1) {
          return 2;
        }
        if (data.phthDrugReaction == 2) {
          return 1;
        }
        return ' ';
      }
    }, {
      key: '36114',
      name: '药物不良反应_有_1',
      value: function() {
        if (data.phthDrugReaction == 1) {
          return data.phthDrugDescribe;
        }
        return ' ';
      }
    }, {
      key: '36115',
      name: '药物不良反应_2',
      value: ' '
    }, {
      key: '36116',
      name: '药物不良反应_有_2',
      value: ' '
    }, {
      key: '36117',
      name: '药物不良反应_2',
      value: ' '
    }, {
      key: '36118',
      name: '药物不良反应_有_2',
      value: ' '
    }, {
      key: '36119',
      name: '药物不良反应_2',
      value: ' '
    }, {
      key: '36120',
      name: '药物不良反应_有_2',
      value: ' '
    }, {
      key: '36121',
      name: '并发症或合并症_1',
      value: function() {
        if (data.phthDrugNeopathy == 1) {
          return 2;
        }
        if (data.phthDrugNeopathy == 2) {
          return 1;
        }
        return ' ';
      }
    }, {
      key: '36122',
      name: '并发症或合并症_有_1',
      value: function() {
        if (data.phthDrugNeopathy == 1) {
          return data.phthNeopathyDescribe;
        }
        return ' ';
      }
    }, {
      key: '36123',
      name: '并发症或合并症_2',
      value: ' '
    }, {
      key: '36124',
      name: '并发症或合并症_有_2',
      value: ' '
    }, {
      key: '36125',
      name: '并发症或合并症_2',
      value: ' '
    }, {
      key: '36126',
      name: '并发症或合并症_有_2',
      value: ' '
    }, {
      key: '36127',
      name: '并发症或合并症_2',
      value: ' '
    }, {
      key: '36128',
      name: '并发症或合并症_有_2',
      value: ' '
    }, {
      key: '36129',
      name: '转诊_科别_1',
      value: data.phthReferralHospital
    }, {
      key: '36130',
      name: '转诊_科别_1',
      value: ' '
    }, {
      key: '36131',
      name: '转诊_科别_1',
      value: ' '
    }, {
      key: '36132',
      name: '转诊_科别_1',
      value: ' '
    }, {
      key: '36133',
      name: '转诊_原因_1',
      value: data.phthReferralReason
    }, {
      key: '36134',
      name: '转诊_原因_1',
      value: ' '
    }, {
      key: '36135',
      name: '转诊_原因_1',
      value: ' '
    }, {
      key: '36136',
      name: '转诊_原因_1',
      value: ' '
    }, {
      key: '36137',
      name: '转诊_2周内随访,随访结果_1',
      value: data.phthReferralVisit
    }, {
      key: '36138',
      name: '转诊_2周内随访,随访结果_2',
      value: ' '
    }, {
      key: '36139',
      name: '转诊_2周内随访,随访结果_3',
      value: ' '
    }, {
      key: '36140',
      name: '转诊_2周内随访,随访结果_4',
      value: ' '
    }, {
      key: '36141',
      name: '处理意见_1',
      value: data.phthOpinion
    }, {
      key: '36142',
      name: '处理意见_1',
      value: ' '
    }, {
      key: '36143',
      name: '处理意见_1',
      value: ' '
    }, {
      key: '36144',
      name: '处理意见_1',
      value: ' '
    }, {
      key: '36145',
      name: '下次随访时间_1',
      value: common.Util.formatDate(data.nextVisitDate)
    }, {
      key: '36146',
      name: '下次随访时间_1',
      value: ' '
    }, {
      key: '36147',
      name: '下次随访时间_1',
      value: ' '
    }, {
      key: '36148',
      name: '下次随访时间_1',
      value: ' '
    }, {
      key: '36149',
      name: '随访医生签名',
      value: data.phthVisitDoctor
    }, {
      key: '36150',
      name: '随访医生签名',
      value: ' '
    }, {
      key: '36151',
      name: '随访医生签名',
      value: ' '
    }, {
      key: '36152',
      name: '随访医生签名',
      value: ' '
    }, {
      key: '36153',
      name: '停止治疗及原因_ 出现停止治疗时间_年',
      value: phthStopDate[0]
    }, {
      key: '36154',
      name: '停止治疗及原因_ 出现停止治疗时间_月',
      value: phthStopDate[1]
    }, {
      key: '36155',
      name: '停止治疗及原因_ 出现停止治疗时间_日',
      value: phthStopDate[2]
    }, {
      key: '36156',
      name: '停止治疗及原因_ 停止治疗原因_1',
      value: function() {
        if (data.phthStopReason == 1) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '36157',
      name: '停止治疗及原因_ 停止治疗原因_2',
      value: function() {
        if (data.phthStopReason == 2) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '36158',
      name: '停止治疗及原因_ 停止治疗原因_3',
      value: function() {
        if (data.phthStopReason == 3) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '36159',
      name: '停止治疗及原因_ 停止治疗原因_4',
      value: function() {
        if (data.phthStopReason == 4) {
          return '√';
        }
        return ' ';
      }
    }, {
      key: '36160',
      name: '全程管理情况_应访视患者',
      value: data.phthShouldVisit
    }, {
      key: '36161',
      name: '全程管理情况_实际访视',
      value: data.phthActualVisit
    }, {
      key: '36162',
      name: '全程管理情况_应服药',
      value: data.phthShouldDrug
    }, {
      key: '36163',
      name: '全程管理情况_实际服药',
      value: data.phthActualDrug
    }, {
      key: '36164',
      name: '全程管理情况_服药率',
      value: data.phthDrugRate
    }, {
      key: '36165',
      name: '全程管理情况_评估医生签名',
      value: data.phthAssessDoctor
    }];

  };
  return formTemplate;
}));
