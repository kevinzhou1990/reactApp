(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['lodash'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS之类的
    module.exports = factory('lodash');
  } else {
    // 浏览器全局变量(root 即 window)
    root.Util = factory(root._);
  }
}(this, function(_) {
  var formTemplate = {};

  /*  function formatDate(dateStr, splitType) {
      if (!dateStr) return '';
      splitType = splitType || '  ';
      var date = new Date(dateStr);
      var arr = [];
      arr.push(date.getFullYear());
      arr.push(date.getMonth() + 1);
      arr.push(date.getDate());
      return arr.join(splitType);
    }*/
  var formatDate = common.Util.formatDate;


  var defaultValue = ' ';

  formTemplate.getFormData = function(data) {

    var drupAllergyList = (function() {
      var drupAllergy = data.drupAllergy;
      var arr = [];
      if (drupAllergy && drupAllergy.drugFlag === 1) {
        if (drupAllergy.drugPenicillin === 1) {
          arr.push(2);
        }
        if (drupAllergy.drugSulfa === 1) {
          arr.push(3);
        }
        if (drupAllergy.drugStreptomycin === 1) {
          arr.push(4);
        }
        if (drupAllergy.drugOtherSelect === 1) {
          arr.push(5);
        }
      }
      return arr;
    })();

    var exposureHistoryList = (function() {
      var arr = [];
      var exposureHistory = data.exposureHistory;
      if (exposureHistory && exposureHistory.expoFlag === 1) {

        if (exposureHistory.expoChemical === 1) {
          arr.push(2);
        }
        if (exposureHistory.expoPoison === 1) {
          arr.push(3);
        }
        if (exposureHistory.expoRadial === 1) {
          arr.push(4);
        }

      } else {
        arr.push(1);
      }
      return arr;
    })();

    var deformityRecordList = (function() {
      var deformityRecord = data.deformityRecord;
      var temp = [];
      if (deformityRecord && deformityRecord.defoFlag === 1) {
        if (deformityRecord.defoVision === 1) {
          temp.push(2);
        }
        if (deformityRecord.defoHearing === 1) {
          temp.push(3);
        }
        if (deformityRecord.defoSpeech === 1) {
          temp.push(4);
        }
        if (deformityRecord.defoLimbs === 1) {
          temp.push(5);
        }
        if (deformityRecord.defoRetarded === 1) {
          temp.push(6);
        }
        if (deformityRecord.defoMental === 1) {
          temp.push(7);
        }
        if (deformityRecord.defoOtherFlag === 1) {
          temp.push(8);
        }
      }
      return temp;
    })();

    var residentMedicalPay = (function() {
      // var result = data.residentMedicalPay;
      var result = [];
      if (data.residentMedicalPay) {
        result.push(data.residentMedicalPay);
      } else if (data.medicalCarePay) {
        if (data.medicalCarePay.payType1 == 1) {
          result.push(1);
        }
        if (data.medicalCarePay.payType2 == 1) {
          result.push(2);
        }
        if (data.medicalCarePay.payType3 == 1) {
          result.push(3);
        }
        if (data.medicalCarePay.payType4 == 1) {
          result.push(4);
        }
        if (data.medicalCarePay.payType5 == 1) {
          result.push(5);
        }
        if (data.medicalCarePay.payType6 == 1) {
          result.push(6);
        }
        if (data.medicalCarePay.payType7 == 1) {
          result.push(7);
        }
        if (data.medicalCarePay.payOther == 1) {
          result.push(8);
        }
        if (result.length > 3) {
          result.length = 3;
        }

      }
      return result;
    })();

    var fatherDiseaseList = [];
    var montherDiseaseList = [];
    var bortherDiseaseList = [];
    var chirdrenDiseaseList = [];
    var result = [];
    _.forEach(data.familyDiseaseList, function(item) {

      if (item.diseRelation === 0) {
        // 本人

        var arr = [{
            'list': [{
                key: '10024',
                name: 'familyDiseaseList',
                value: 1
              },
              {
                key: '10025',
                name: 'familyDiseaseList',
                value: ' '
              },
              {
                key: '10026',
                name: 'familyDiseaseList',
                value: ' '
              }
            ]
          },
          {
            'list': [{
                key: '10027',
                name: 'familyDiseaseList',
                value: ' '
              },
              {
                key: '10028',
                name: 'familyDiseaseList',
                value: ' '
              },
              {
                key: '10029',
                name: 'familyDiseaseList',
                value: ' '
              }
            ]
          },
          {
            'list': [{
                key: '10030',
                name: 'familyDiseaseList',
                value: ' '
              },
              {
                key: '10031',
                name: 'familyDiseaseList',
                value: ' '
              },
              {
                key: '10032',
                name: 'familyDiseaseList',
                value: ' '
              }
            ]
          },
          {
            'list': [{
                key: '10033',
                name: 'familyDiseaseList',
                value: ' '
              },
              {
                key: '10034',
                name: 'familyDiseaseList',
                value: ' '
              },
              {
                key: '10035',
                name: 'familyDiseaseList',
                value: ' '
              }
            ]
          },
          {
            'list': [{
                key: '10036',
                name: 'familyDiseaseList',
                value: ' '
              },
              {
                key: '10037',
                name: 'familyDiseaseList',
                value: ' '
              },
              {
                key: '10038',
                name: 'familyDiseaseList',
                value: ' '
              }
            ]
          },
          {
            'list': [{
                key: '10039',
                name: 'familyDiseaseList',
                value: ' '
              },
              {
                key: '10040',
                name: 'familyDiseaseList',
                value: ' '
              },
              {
                key: '10041',
                name: 'familyDiseaseList',
                value: ' '
              }
            ]
          }
        ];
        var temp = {};
        var splitType = '-';
        var date = ' ';


        // 高血压
        if (item.diseHypertension === 1) {
          date = formatDate(item.diseHypertensionDate, splitType).split(splitType);
          temp = arr.shift();
          temp.list[0].value = '2';
          temp.list[1].value = date[0];
          temp.list[2].value = date[1];
          _.forEach(temp.list, function(i) {
            result.push(i);
          });
        }

        // 糖尿病
        if (item.diseDiabetes === 1) {
          date = formatDate(item.diseDiabetesDate, splitType).split(splitType);
          temp = arr.shift();
          temp.list[0].value = '3';
          temp.list[1].value = date[0];
          temp.list[2].value = date[1];
          _.forEach(temp.list, function(i) {
            result.push(i);
          });
        }

        // 冠心病
        if (item.diseCoronaryHeart === 1) {
          date = formatDate(item.coronaryHeartDate, splitType).split(splitType);
          temp = arr.shift();
          temp.list[0].value = '4';
          temp.list[1].value = date[0];
          temp.list[2].value = date[1];
          _.forEach(temp.list, function(i) {
            result.push(i);
          });
        }

        // 慢性阻塞肺疾病
        if (item.diseChronicObstructive === 1) {
          date = formatDate(item.chronicObstructiveDate, splitType).split(splitType);
          temp = arr.shift();
          temp.list[0].value = '5';
          temp.list[1].value = date[0];
          temp.list[2].value = date[1];
          _.forEach(temp.list, function(i) {
            result.push(i);
          });
        }

        // 恶性肿瘤
        if (item.diseMalignantTumor === 1) {
          date = formatDate(item.diseTumorDate, splitType).split(splitType);
          temp = arr.shift();
          temp.list[0].value = '6';
          temp.list[1].value = date[0];
          temp.list[2].value = date[1];
          _.forEach(temp.list, function(i) {
            result.push(i);
          });
        }

        // 脑卒中
        if (item.diseCerebralApoplexy === 1) {
          date = formatDate(item.cerebralApoplexyDate, splitType).split(splitType);
          temp = arr.shift();
          temp.list[0].value = '7';
          temp.list[1].value = date[0];
          temp.list[2].value = date[1];
          _.forEach(temp.list, function(i) {
            result.push(i);
          });
        }

        // 严重精神障碍
        if (item.diseMentalDisorder === 1) {
          date = formatDate(item.mentalDisorderDate, splitType).split(splitType);
          if (arr.length > 0) {
            temp = arr.shift();
            temp.list[0].value = '8';
            temp.list[1].value = date[0];
            temp.list[2].value = date[1];
            _.forEach(temp.list, function(i) {
              result.push(i);
            });
          }
        }

        // 结核病
        if (item.diseTuberculosis === 1) {
          date = formatDate(item.diseTuberculosisDate, splitType).split(splitType);
          if (arr.length > 0) {
            temp = arr.shift();
            temp.list[0].value = '9';
            temp.list[1].value = date[0];
            temp.list[2].value = date[1];
            _.forEach(temp.list, function(i) {
              result.push(i);
            });
          }
        }

        // 肝炎
        if (item.diseHepatitis === 1) {
          date = formatDate(item.diseHepatitisDate, splitType).split(splitType);
          if (arr.length > 0) {
            temp = arr.shift();
            temp.list[0].value = '10';
            temp.list[1].value = date[0];
            temp.list[2].value = date[1];
            _.forEach(temp.list, function(i) {
              result.push(i);
            });
          }
        }

        // 其他法定传染病
        if (item.diseOtherNotifiable === 1) {
          date = formatDate(item.otherNotifiableDate, splitType).split(splitType);
          if (arr.length > 0) {
            temp = arr.shift();
            temp.list[0].value = '11';
            temp.list[1].value = date[0];
            temp.list[2].value = date[1];
            _.forEach(temp.list, function(i) {
              result.push(i);
            });
          }
        }

        // 职业病
        if (item.diseCareer === 1) {
          date = formatDate(item.diseCareerDate, splitType).split(splitType);
          if (arr.length > 0) {
            temp = arr.shift();
            temp.list[0].value = '12';
            temp.list[1].value = date[0];
            temp.list[2].value = date[1];
            _.forEach(temp.list, function(i) {
              result.push(i);
            });
          }
        }

        // 其他疾病
        if (item.diseOther === 1) {
          date = formatDate(item.diseOtherDate, splitType).split(splitType);
          if (arr.length > 0) {
            temp = arr.shift();
            temp.list[0].value = '13';
            temp.list[1].value = date[0];
            temp.list[2].value = date[1];
            _.forEach(temp.list, function(i) {
              result.push(i);
            });
          }
        }

        if (arr.length > 0) {
          _.forEach(arr, function(i) {
            _.forEach(i.list, function(ii) {
              result.push(ii);
            });
          });
        } else {

        }

      }

      // 父亲
      if (item.diseRelation === 2) {
        arr = [];

        // 高血压
        if (item.diseHypertension === 1) {
          arr.push(2);
        }

        // 糖尿病
        if (item.diseDiabetes === 1) {
          arr.push(3);
        }

        // 冠心病
        if (item.diseCoronaryHeart === 1) {
          arr.push(4);
        }

        // 慢性阻塞肺疾病
        if (item.diseChronicObstructive === 1) {
          arr.push(5);
        }

        // 恶性肿瘤
        if (item.diseMalignantTumor === 1) {
          arr.push(6);
        }

        // 脑卒中
        if (item.diseCerebralApoplexy === 1) {
          arr.push(7);
        }

        // 严重精神障碍
        if (item.diseMentalDisorder === 1) {
          arr.push(8);
        }

        // 结核病
        if (item.diseTuberculosis === 1) {
          arr.push(9);
        }

        // 肝炎
        if (item.diseHepatitis === 1) {
          arr.push(10);
        }

        // 先天畸形
        if (item.diseLustreNaturae === 1) {
          arr.push(11);
        }

        // 其他疾病
        if (item.diseOther === 1) {
          if (arr.length > 6) arr.length = 5;
          arr.push(12);
        }
        if (arr.length > 6) arr.length = 6;
        // arr.length = 6;
        /*dataArr.push({
          key: '10057',
          name: 'familyDiseaseList',
          value: arr.join(' ') || ' '
        });*/
        fatherDiseaseList = arr;
        result.push({
          key: '10058',
          name: 'familyDiseaseList',
          value: item.diseOtherName || ' '
        });
      }

      // 母亲
      if (item.diseRelation === 3) {
        arr = [];

        // 高血压
        if (item.diseHypertension === 1) {
          arr.push(2);
        }

        // 糖尿病
        if (item.diseDiabetes === 1) {
          arr.push(3);
        }

        // 冠心病
        if (item.diseCoronaryHeart === 1) {
          arr.push(4);
        }

        // 慢性阻塞肺疾病
        if (item.diseChronicObstructive === 1) {
          arr.push(5);
        }

        // 恶性肿瘤
        if (item.diseMalignantTumor === 1) {
          arr.push(6);
        }

        // 脑卒中
        if (item.diseCerebralApoplexy === 1) {

          arr.push(7);
        }

        // 严重精神障碍
        if (item.diseMentalDisorder === 1) {
          arr.push(8);
        }

        // 结核病
        if (item.diseTuberculosis === 1) {
          arr.push(9);
        }

        // 肝炎
        if (item.diseHepatitis === 1) {
          arr.push(10);
        }

        // 先天畸形
        if (item.diseLustreNaturae === 1) {
          arr.push(11);
        }

        // 其他疾病
        if (item.diseOther === 1) {
          arr.push(12);
        }

        if (arr.length > 6)
          arr.length = 6;

        /*dataArr.push({
          key: '10059',
          name: 'familyDiseaseList',
          value: arr.join(' ') || ' '
        });*/
        montherDiseaseList = arr;
        result.push({
          key: '10060',
          name: 'familyDiseaseList',
          value: item.diseOtherName || ' '
        });
      }


      // 兄弟姐妹
      if (item.diseRelation === 4) {
        arr = [];

        // 高血压
        if (item.diseHypertension === 1) {
          arr.push(2);
        }

        // 糖尿病
        if (item.diseDiabetes === 1) {
          arr.push(3);
        }

        // 冠心病
        if (item.diseCoronaryHeart === 1) {
          arr.push(4);
        }

        // 慢性阻塞肺疾病
        if (item.diseChronicObstructive === 1) {
          arr.push(5);
        }

        // 恶性肿瘤
        if (item.diseMalignantTumor === 1) {
          arr.push(6);
        }

        // 脑卒中
        if (item.diseCerebralApoplexy === 1) {

          arr.push(7);
        }

        // 严重精神障碍
        if (item.diseMentalDisorder === 1) {
          arr.push(8);
        }

        // 结核病
        if (item.diseTuberculosis === 1) {
          arr.push(9);
        }

        // 肝炎
        if (item.diseHepatitis === 1) {
          arr.push(10);
        }

        // 先天畸形
        if (item.diseLustreNaturae === 1) {
          arr.push(11);
        }

        // 其他疾病
        if (item.diseOther === 1) {
          arr.push(12);
        }

        if (arr.length > 6)
          arr.length = 6;

        /*dataArr.push({
          key: '10061',
          name: 'familyDiseaseList',
          value: arr.join(' ') || ' '
        });*/
        bortherDiseaseList = arr;
        result.push({
          key: '10062',
          name: 'familyDiseaseList',
          value: item.diseOtherName || ' '
        });
      }

      // 子女
      if (item.diseRelation === 5) {
        arr = [];

        // 高血压
        if (item.diseHypertension === 1) {
          arr.push(2);
        }

        // 糖尿病
        if (item.diseDiabetes === 1) {
          arr.push(3);
        }

        // 冠心病
        if (item.diseCoronaryHeart === 1) {
          arr.push(4);
        }

        // 慢性阻塞肺疾病
        if (item.diseChronicObstructive === 1) {
          arr.push(5);
        }

        // 恶性肿瘤
        if (item.diseMalignantTumor === 1) {
          arr.push(6);
        }

        // 脑卒中
        if (item.diseCerebralApoplexy === 1) {

          arr.push(7);
        }

        // 严重精神障碍
        if (item.diseMentalDisorder === 1) {
          arr.push(8);
        }

        // 结核病
        if (item.diseTuberculosis === 1) {
          arr.push(9);
        }

        // 肝炎
        if (item.diseHepatitis === 1) {
          arr.push(10);
        }

        // 先天畸形
        if (item.diseLustreNaturae === 1) {
          arr.push(11);
        }

        // 其他疾病
        if (item.diseOther === 1) {
          arr.push(12);
        }
        if (arr.length > 6)
          arr.length = 6;

        /* dataArr.push({
           key: '10063',
           name: 'familyDiseaseList',
           value: arr.join(' ')
         });*/
        chirdrenDiseaseList = arr;
        result.push({
          key: '10064',
          name: 'familyDiseaseList',
          value: item.diseOtherName || ' '
        });
      }
      return true;
    });
    var dataArr = [{
        key: '10000',
        name: 'residentName',
        value: data.residentName || ' '
      },
      {
        key: '10002',
        name: 'residentSex',
        value: data.residentSex || ' '
      },
      {
        key: '10003',
        name: 'birthday',
        value: formatDate(data.birthday, '-') || ' '
      },
      {
        key: '10004',
        name: 'residentCardId',
        value: data.residentCardId || ' '
      },
      {
        key: '10005',
        name: 'residentEmployer',
        value: data.residentEmployer || ' '
      },
      {
        key: '10006',
        name: 'residentMobile',
        value: data.residentMobile || ' '
      },
      {
        key: '10007',
        name: 'contactName',
        value: data.contactName || ' '
      },
      {
        key: '10008',
        name: 'contactMobile',
        value: data.contactMobile || ' '
      },
      {
        key: '10009',
        name: 'residentAddressType',
        value: data.residentAddressType || ' '
      },
      {
        key: '10010', //TODO: 该字段有问题
        name: 'nation',
        value: function() {
          if (data.nation === '汉族') {
            return 1;
          }
          return 2;
        }
      },
      {
        key: '10011', //TODO: 该字段有问题
        name: 'nationother',
        value: function() {
          if (data.nation === '汉族') {
            return ' ';
          }
          return data.nation;
        }
      },
      /*{
        key: '10012',
        name: 'residentAddressType/residentRhType',
        value: data.residentAddressType + '  ' + data.residentRhType
      },*/
      {
        key: '10013',
        name: 'residentCulturalLevel',
        value: function() {
          if (data.residentCulturalLevel === 5 || data.residentCulturalLevel === 6) {
            return 5;
          }
          if (data.residentCulturalLevel === 7) {
            return 6;
          }
          return data.residentCulturalLevel;
        }
      },
      {
        key: '10014',
        name: 'residentCareer',
        value: data.residentCareer || '-'
      },
      {
        key: '10015',
        name: 'residentMaritalStatus',
        value: data.residentMaritalStatus || '-'
      }
      /*,
      {
        key: '10016', //TODO: 该字段有问题 此字段为单选。 但表格是多选；
        name: 'residentMedicalPay',
        value: data.residentMedicalPay || ' '
      }*/
      ,
      {
        key: '10017',
        name: 'residentMedicalPayText',
        value: function() {
          if (data.residentMedicalPay) {
            return data.residentMedicalPayText;
          }
          if (data.medicalCarePay && data.medicalCarePay.payOther == 1) {
            return data.medicalCarePay.payOtherDescribe;
          }
          return ' ';
        }
      }
      /*,
      {
        key: '10018',
        name: 'drupAllergy',
        value: function() {
          var drupAllergy = data.drupAllergy;
          var arr = [];
          if (drupAllergy && drupAllergy.drugFlag === 1) {
            if (drupAllergy.drugPenicillin === 1) {
              arr.push(2);
            }
            if (drupAllergy.drugSulfa === 1) {
              arr.push(3);
            }
            if (drupAllergy.drugStreptomycin === 1) {
              arr.push(4);
            }
            if (drupAllergy.drugOtherSelect === 1) {
              arr.push(5);
            }
          }
          return arr.join(' ') || ' ';
        }
      }*/
      ,
      {
        key: '10019',
        name: 'drupAllergy',
        value: function() {
          var drupAllergy = data.drupAllergy;
          var txt = '';
          if (drupAllergy && drupAllergy.drugFlag === 1) {
            if (drupAllergy.drugOtherSelect === 1) {
              txt = drupAllergy.drugOther;
            }
          }
          return txt || ' ';
        }
      },
      /*
        {
          key: '10020',
          name: 'exposureHistory',
          value: function() {
            var arr = [];
            var exposureHistory = data.exposureHistory;
            if (exposureHistory && exposureHistory.expoFlag === 1) {

              if (exposureHistory.expoChemical === 1) {
                arr.push(2);
              }
              if (exposureHistory.expoPoison === 1) {
                arr.push(3);
              }
              if (exposureHistory.expoRadial === 1) {
                arr.push(4);
              }

            } else {
              arr.push(1);
            }
            return arr.join(' ') || ' ';
          }

        },*/
      {
        key: '10021',
        name: 'diseTumorName',
        value: function() {
          var disease = _.find(data.familyDiseaseList, { diseRelation: 0, diseFlag: 1 });
          if (disease && disease.diseMalignantTumor === 1) {
            return disease.diseTumorName;
          } else {
            return ' ';
          }

        }
      },
      {
        key: '10022',
        name: 'diseCareerName',
        value: function() {
          var disease = _.find(data.familyDiseaseList, { diseRelation: 0, diseFlag: 1 });
          if (disease && disease.diseCareer === 1) {
            return disease.diseCareerName;
          } else {
            return ' ';
          }
        }
      },
      {
        key: '10023',
        name: 'diseCareerName',
        value: function() {
          var disease = _.find(data.familyDiseaseList, { diseRelation: 0, diseFlag: 1 });
          if (disease && disease.diseOther) {
            return disease.diseOtherName;
          } else {
            return ' ';
          }
        }
      },
      {
        key: '10067',
        name: 'residentGeneticSelect',
        value: function() {
          if (data.residentGeneticSelect === 1) {
            return 2;
          } else {
            return 1;
          }
        }
      },
      {
        key: '10068',
        name: 'residentGeneticSelect',
        value: function() {
          if (data.residentGeneticSelect === 1) {
            return data.residentGeneticDescribe;
          } else {
            return ' ';
          }
        }
      },
      /*{
        key: '10069',
        name: 'deformityRecord',
        value: function() {
          var deformityRecord = data.deformityRecord;
          var temp = [];
          if (deformityRecord && deformityRecord.defoFlag === 1) {
            if (deformityRecord.defoVision === 1) {
              temp.push(2);
            }
            if (deformityRecord.defoHearing === 1) {
              temp.push(3);
            }
            if (deformityRecord.defoSpeech === 1) {
              temp.push(4);
            }
            if (deformityRecord.defoLimbs === 1) {
              temp.push(5);
            }
            if (deformityRecord.defoRetarded === 1) {
              temp.push(6);
            }
            if (deformityRecord.defoMental === 1) {
              temp.push(7);
            }
            if (deformityRecord.defoOtherFlag === 1) {
              temp.push(8);
            }
          }
          return temp.join(' ') || ' ';
        }
      },*/
      {
        key: '10070',
        name: 'defoOther',
        value: function() {
          var deformityRecord = data.deformityRecord;
          if (deformityRecord.defoOtherFlag === 1) {
            return deformityRecord.defoOther;
          } else {
            return ' ';
          }
        }
      },
      {
        key: '10071',
        name: 'residentKitchenExhaust',
        value: data.residentKitchenExhaust || '-'
      },
      {
        key: '10072',
        name: 'residentFuelType',
        value: function() {
          if (data.residentFuelType == 1)
            return '-';
          return data.residentFuelType - 1;
        }
      },
      {
        key: '10073',
        name: 'residentWaterType',
        value: function() {
          if (data.residentWaterType == 1)
            return '-';
          return data.residentWaterType - 1;
        }
      },
      {
        key: '10074',
        name: 'residentToiletType',
        value: function() {
          if (data.residentToiletType == 1)
            return '-';
          return data.residentToiletType - 1;
        }
      },
      {
        key: '10075',
        name: 'residentToiletType',
        value: function() {
          if (data.residentBeastColumn == 1)
            return '-';
          return data.residentBeastColumn - 1;
        }
      },
      {
        key: '10076',
        name: 'residentBloodType',
        value: data.residentBloodType
      },
      {
        key: '10077',
        name: 'residentToiletType',
        value: data.residentRhType
      },
      {
        key: '10078',
        name: 'residentToiletType',
        value: residentMedicalPay[0] || '-'
      },
      {
        key: '10079',
        name: 'residentToiletType',
        value: residentMedicalPay[1]
      },
      {
        key: '10080',
        name: 'residentToiletType',
        value: residentMedicalPay[2]
      },
      {
        key: '10081',
        name: 'drupAllergyList',
        value: function() {
          if (drupAllergyList.length > 0) {
            return drupAllergyList[0];
          }
          return 1;
        }
      },
      {
        key: '10082',
        name: 'drupAllergyList',
        value: drupAllergyList[1]
      },
      {
        key: '10083',
        name: 'drupAllergyList',
        value: drupAllergyList[2]
      },
      {
        key: '10084',
        name: 'drupAllergyList',
        value: drupAllergyList[3]
      },
      {
        key: '10085',
        name: 'exposureHistoryList',
        value: function() {
          if (exposureHistoryList.length > 0) {
            return exposureHistoryList[0];
          }
          return 1;
        }
      },
      {
        key: '10086',
        name: 'exposureHistoryList',
        value: exposureHistoryList[1]
      },
      {
        key: '10087',
        name: 'exposureHistoryList',
        value: exposureHistoryList[2]
      },
      {
        key: '10088',
        name: 'fatherDiseaseList',
        value: function() {
          if (fatherDiseaseList.length > 0)
            return fatherDiseaseList[0];
          return 1;
        }
      },
      {
        key: '10089',
        name: 'fatherDiseaseList',
        value: fatherDiseaseList[1]
      },
      {
        key: '10090',
        name: 'fatherDiseaseList',
        value: fatherDiseaseList[2]
      },
      {
        key: '10091',
        name: 'fatherDiseaseList',
        value: fatherDiseaseList[3]
      },
      {
        key: '10092',
        name: 'fatherDiseaseList',
        value: fatherDiseaseList[4]
      },
      {
        key: '10093',
        name: 'fatherDiseaseList',
        value: fatherDiseaseList[5]
      },
      {
        key: '10094',
        name: 'montherDiseaseList',
        value: function() {
          if (montherDiseaseList.length > 0)
            return montherDiseaseList[0];
          return 1;
        }
      },
      {
        key: '10095',
        name: 'montherDiseaseList',
        value: montherDiseaseList[1]
      },
      {
        key: '10096',
        name: 'montherDiseaseList',
        value: montherDiseaseList[2]
      },
      {
        key: '10097',
        name: 'montherDiseaseList',
        value: montherDiseaseList[3]
      },
      {
        key: '10098',
        name: 'montherDiseaseList',
        value: montherDiseaseList[4]
      },
      {
        key: '10099',
        name: 'montherDiseaseList',
        value: montherDiseaseList[5]
      },
      {
        key: '10100',
        name: 'bortherDiseaseList',
        value: function() {
          if (bortherDiseaseList.length > 0)
            return bortherDiseaseList[0];
          return 1;
        }
      },
      {
        key: '10101',
        name: 'bortherDiseaseList',
        value: bortherDiseaseList[1]
      },
      {
        key: '10102',
        name: 'bortherDiseaseList',
        value: bortherDiseaseList[2]
      },
      {
        key: '10103',
        name: 'bortherDiseaseList',
        value: bortherDiseaseList[3]
      },
      {
        key: '10104',
        name: 'bortherDiseaseList',
        value: bortherDiseaseList[4]
      },
      {
        key: '10105',
        name: 'bortherDiseaseList',
        value: bortherDiseaseList[5]
      },
      {
        key: '10106',
        name: 'chirdrenDiseaseList',
        value: function() {
          if (chirdrenDiseaseList.length > 0)
            return chirdrenDiseaseList[0];
          return 1;
        }
      },
      {
        key: '10107',
        name: 'chirdrenDiseaseList',
        value: chirdrenDiseaseList[1]
      },
      {
        key: '10108',
        name: 'chirdrenDiseaseList',
        value: chirdrenDiseaseList[2]
      },
      {
        key: '10109',
        name: 'chirdrenDiseaseList',
        value: chirdrenDiseaseList[3]
      },
      {
        key: '10110',
        name: 'chirdrenDiseaseList',
        value: chirdrenDiseaseList[4]
      },
      {
        key: '10111',
        name: 'chirdrenDiseaseList',
        value: chirdrenDiseaseList[5]
      },
      {
        key: '10112',
        name: 'deformityRecordList',
        value: function() {
          if (deformityRecordList.length > 0)
            return deformityRecordList[0];
          return 1;
        }
      },
      {
        key: '10113',
        name: 'deformityRecordList',
        value: deformityRecordList[1]
      },
      {
        key: '10114',
        name: 'deformityRecordList',
        value: deformityRecordList[2]
      },
      {
        key: '10115',
        name: 'deformityRecordList',
        value: deformityRecordList[3]
      },
      {
        key: '10116',
        name: 'deformityRecordList',
        value: deformityRecordList[4]
      },
      {
        key: '10117',
        name: 'deformityRecordList',
        value: deformityRecordList[5]
      }


    ];

    dataArr = dataArr.concat(result);

    // 手术
    var surgery = _.filter(data.personHistoryList, { pastType: 1 });
    var surgeryData = [{
        'list': [{
            key: '10042',
            name: 'personHistoryList',
            value: ' '
          },
          {
            key: '10043',
            name: 'personHistoryList',
            value: ' '
          }
        ]
      },
      {
        'list': [{
            key: '10044',
            name: 'personHistoryList',
            value: ' '
          },
          {
            key: '10045',
            name: 'personHistoryList',
            value: ' '
          }
        ]
      }
    ];
    _.forEach(surgery, function(item) {
      var temp = surgeryData.shift();
      temp.list[0].value = item.pastName;
      temp.list[1].value = formatDate(item.pastDate, '-');
      dataArr.push(temp.list[0]);
      dataArr.push(temp.list[1]);
    });

    var surgeryFlag = {
      key: '10046',
      name: 'personHistoryList',
      value: '1'

    };
    if (surgery.length > 0) {
      surgeryFlag.value = '2';
    }
    _.forEach(surgeryData, function(item) {
      _.forEach(item.list, function(ii) {
        dataArr.push(ii);
      });
    });
    dataArr.push(surgeryFlag);


    // 外伤
    var trauma = _.filter(data.personHistoryList, { pastType: 2 });
    var traumaData = [{
        'list': [{
            key: '10047',
            name: 'personHistoryList',
            value: ' '
          },
          {
            key: '10048',
            name: 'personHistoryList',
            value: ' '
          }
        ]
      },
      {
        'list': [{
            key: '10049',
            name: 'personHistoryList',
            value: ' '
          },
          {
            key: '10050',
            name: 'personHistoryList',
            value: ' '
          }
        ]
      }
    ];
    _.forEach(trauma, function(item) {
      var temp = traumaData.shift();
      temp.list[0].value = item.pastName;
      temp.list[1].value = formatDate(item.pastDate, '-');
      dataArr.push(temp.list[0]);
      dataArr.push(temp.list[1]);
    });

    var traumaFlag = {
      key: '10051',
      name: 'personHistoryList',
      value: '1'

    };
    if (trauma.length > 0) {
      traumaFlag.value = '2';
    }
    _.forEach(traumaData, function(item) {
      _.forEach(item.list, function(ii) {
        dataArr.push(ii);
      });
    });
    dataArr.push(traumaFlag);


    // 输血
    var blood = _.filter(data.personHistoryList, { pastType: 3 });
    var bloodData = [{
        'list': [{
            key: '10052',
            name: 'personHistoryList',
            value: ' '
          },
          {
            key: '10053',
            name: 'personHistoryList',
            value: ' '
          }
        ]
      },
      {
        'list': [{
            key: '10054',
            name: 'personHistoryList',
            value: ' '
          },
          {
            key: '10055',
            name: 'personHistoryList',
            value: ' '
          }
        ]
      }
    ];
    _.forEach(blood, function(item) {
      var temp = bloodData.shift();
      temp.list[0].value = item.pastName;
      temp.list[1].value = formatDate(item.pastDate, '-');
      dataArr.push(temp.list[0]);
      dataArr.push(temp.list[1]);
    });

    var bloodFlag = {
      key: '10056',
      name: 'personHistoryList',
      value: '1'

    };
    if (blood.length > 0) {
      bloodFlag.value = '2';
    }
    _.forEach(bloodData, function(item) {
      _.forEach(item.list, function(ii) {
        dataArr.push(ii);
      });
    });
    dataArr.push(bloodFlag);





    /*dataArr.push({
      key: '10065',
      name: 'familyDiseaseList',
      value: ' '
    });*/

    dataArr.push({
      key: '10066',
      name: 'familyDiseaseList',
      value: ' '
    });
    return dataArr;
  };

  return formTemplate;
}));
