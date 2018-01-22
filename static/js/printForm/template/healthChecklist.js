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
}(this, function() {
  var formTemplate = {};
  formTemplate.getFormData = function(data) {
    var createDate = common.Util.formatDate(data.examDate, '-').split('-');
    var bodySymptomList = (function() {
      var result = [];
      var temp = 0;
      _.forEach(data.bodySymptomList, function(item) {
        switch (item['symName']) {
          case 'sym_headache':
            temp = 2;
            break;
          case 'sym_dizzy':
            temp = 3;
            break;
          case 'sym_palpitation':
            temp = 4;
            break;
          case 'sym_chest_tightness':
            temp = 5;
            break;
          case 'sym_chest_pain':
            temp = 6;
            break;
          case 'sym_chronic_cough':
            temp = 7;
            break;
          case 'sym_expectoration':
            temp = 8;
            break;
          case 'sym_dyspnea':
            temp = 9;
            break;
          case 'sym_drink_more':
            temp = 10;
            break;
          case 'sym_polyuria':
            temp = 11;
            break;
          case 'sym_weight_loss':
            temp = 12;
            break;
          case 'sym_weak':
            temp = 13;
            break;
          case 'sym_joint_swelling':
            temp = 14;
            break;
          case 'sym_blurred_vision':
            temp = 15;
            break;
          case 'sym_motion':
            temp = 16;
            break;
          case 'sym_urgency':
            temp = 17;
            break;
          case 'sym_odynuria':
            temp = 18;
            break;
          case 'sym_constipation':
            temp = 19;
            break;
          case 'sym_diarrhea':
            temp = 20;
            break;
          case 'sym_NV':
            temp = 21;
            break;
          case 'sym_vertigo':
            temp = 22;
            break;
          case 'sym_tinnitus':
            temp = 23;
            // result.push(23);
            break;
          case 'sym_breast_tenderness':
            temp = 24;
            break;
          case 'sym_other':
            // if (result.length > 10)
            //   result.length = 9;
            if (item['symDescribe']) {
              temp = 25;
            } else {
              temp = 0;
            }

            break;
        }
        if (item['symType'] == 1 && temp !== 0)
          result.push(temp);
        }
      );
      if (result.length == 0)
        return 1;
      if (result.length > 10)
        result.length = 10;
      return result;
    })();

    var examExerciseType = (function() {
      var result = [];
      result.push(data.eatHabits.eatMeatVegetables);
      if (data.eatHabits.eatHalophilic == 1) {
        result.push(4);
      }
      if (data.eatHabits.eatOil == 1) {
        result.push(5);
      }
      if (data.eatHabits.eatSugar == 1) {
        result.push(6);
      }
      if (result.length > 3)
        result.length = 3;
      return result;
    })();

    var examDrinkingType = (function() {
      var result = [];
      if (data.examSpirit == 1) {
        result.push(1);
      }
      if (data.examBeer == 1) {
        result.push(2);
      }
      if (data.examRedwine == 1) {
        result.push(3);
      }
      if (data.examYellowwine == 1) {
        result.push(4);
      }
      if (data.examDrinkingType == 1) {
        result.push(5);
      }
      if (result.length > 4)
        result.length = 4;
      return result;
    })();

    var cerebroDisease = (function() {
      var result = [];
      if (data.cerebroDisease.tconIschemicStroke == 1) {
        result.push(2);
      }
      if (data.cerebroDisease.tconCerebralHemorrhage == 1) {
        result.push(3);
      }
      if (data.cerebroDisease.tconSubarchnoidHemorrhage == 1) {
        result.push(4);
      }
      if (data.cerebroDisease.tconTransientCerebral == 1) {
        result.push(5);
      }
      if (data.cerebroDisease.tconOther == 1) {
        result.push(6);
      }

      if (result.length == 0)
        result.push(1);

      return result;
    })();

    var kidneyDisease = (function() {
      var result = [];
      if (data.kidneyDisease.kidnDiabets == 1) {
        result.push(2);
      }
      if (data.kidneyDisease.kidnRenalFailure == 1) {
        result.push(3);
      }
      if (data.kidneyDisease.kidnAcuteNephritis == 1) {
        result.push(4);
      }
      if (data.kidneyDisease.kidnChronicNephritis == 1) {
        result.push(5);
      }
      if (data.kidneyDisease.kidnOther == 1) {
        result.push(6);
      }
      if (result.length == 0)
        result.push(1);

      return result;
    })();

    var heartDisease = (function() {
      var result = [];
      if (data.heartDisease.heartMiocardialInfartion == 1) {
        result.push(2);
      }
      if (data.heartDisease.heartAnginaPectoris == 1) {
        result.push(3);
      }
      if (data.heartDisease.heartCoronaryReva == 1) {
        result.push(4);
      }
      if (data.heartDisease.heartCongestiveFail == 1) {
        result.push(5);
      }
      if (data.heartDisease.heartPrecordialPain == 1) {
        result.push(6);
      }
      if (data.heartDisease.heartOther == 1) {
        result.push(7);
      }
      if (result.length == 0)
        result.push(1);
      if (result.length > 5)
        result.length = 5;

      return result;
    })();

    var vascularDisease = (function() {
      var result = [];
      if (data.vascularDisease.vascDissectingAneurysm == 1) {
        result.push(2);
      }
      if (data.vascularDisease.vascArterialOcclusive == 1) {
        result.push(3);
      }
      if (data.vascularDisease.vascOther == 1) {
        result.push(4);
      }

      if (result.length == 0)
        result.push(1);

      return result;
    })();

    var eyeDisease = (function() {
      var result = [];
      if (data.eyeDisease.eyeRetinalException == 1) {
        result.push(2);
      }
      if (data.eyeDisease.eyePapillaryEdema == 1) {
        result.push(3);
      }
      if (data.eyeDisease.eyeCataract == 1) {
        result.push(4);
      }
      if (data.eyeDisease.eyeOther == 1) {
        result.push(5);
      }

      if (result.length == 0)
        result.push(1);
      if (result.length > 3)
        result.length = 3;

      return result;
    })();

    var healthGuide = (function() {
      var result = [];
      if (data.healthGuidanceManager == 1) {
        result.push(1);
      }
      if (data.healthGuidanceReview == 1) {
        result.push(2);
      }
      if (data.healthGuidanceReferral == 1) {
        result.push(3);
      }
      return result;
    })();

    var riskFactor = (function() {
      var result = [];
      if (data.riskFactor.rfcNoSmoking == 1) {
        result.push(1);
      }
      if (data.riskFactor.rfcHealthyDrinking == 1) {
        result.push(2);
      }
      if (data.riskFactor.rfcFood == 1) {
        result.push(3);
      }
      if (data.riskFactor.rfcExercise == 1) {
        result.push(4);
      }
      if (data.riskFactor.rfcReduceWeight == 1) {
        result.push(5);
      }
      if (data.riskFactor.rfcVaccination == 1) {
        result.push(6);
      }
      if (data.riskFactor.rfcOther == 1) {
        result.push(7);
      }
      if (result.length > 6)
        result.length = 6;
      return result;
    })();

    var teeth = (function() {
      var result = [];
      if (data.examMissingTeeth == 1) {
        result.push(2);
      }
      if (data.examDentalTeeth == 1) {
        result.push(3);
      }
      if (data.examFalseTeeth == 1) {
        result.push(4);
      }
      if (result.length < 1) {
        result.push(1);
      }
      return result;
    })();

    var medicationUses = (function() {
      var arr = [];
      var medication = {
        medDrugName: '',
        medUsage: '',
        medConsumption: '',
        medMedicationTime: '',
        medMedicationCompliance: ''
      };
      if (data.medicationUses && data.medicationUses.length > 0) {
        var temp = {};
        _.forEach(data.medicationUses, function(item) {
          temp = _.assign({}, medication);
          temp.medDrugName = item.medDrugName;
          temp.medUsage = item.medUsage;
          temp.medConsumption = item.medConsumption;
          temp.medMedicationTime = item.medMedicationTime + item.medDrupRate;
          temp.medMedicationCompliance = item.medComplianceDes;
          arr.push(temp);
        });
        for (var i = 0; i < 6 - data.medicationUses.length; i++) {
          temp = _.assign({}, medication);
          arr.push(temp);
        }
      } else {
        var medication_1 = _.assign({}, medication);
        medication_1.medDrugName = data.examDrugName;
        medication_1.medUsage = data.examDrugUse;
        medication_1.medConsumption = data.examDrugDosage;
        medication_1.medMedicationTime = (function() {
          if (data.examDrupUnit) {
            return data.examDrugDate + data.examDrupUnit;
          } else {
            return common.Util.formatDate(data.examDrugDate, '-');
          }
        })();
        medication_1.medMedicationCompliance = data.examDrugDependenceDes;
        arr.push(medication_1);
        arr.push(medication);
        arr.push(medication);
        arr.push(medication);
        arr.push(medication);
        arr.push(medication);
        arr.push(medication);
      }
      return arr;
    })();

    var vaccineRecords = (function() {
      var arr = [];
      var vaccineRecord = {
        recoVaccineName: '',
        recoInouclationDate: '',
        recoInouclationSite: ''
      };
      if (data.vaccineRecords && data.vaccineRecords.length > 0) {
        var temp = {};
        _.forEach(data.vaccineRecords, function(item) {
          temp = _.assign({}, vaccineRecord);
          temp.recoVaccineName = item.recoVaccineName;
          temp.recoInouclationDate = common.Util.formatDate(item.recoInouclationDate);
          temp.recoInouclationSite = item.recoInouclationSite;
          arr.push(temp);
        });
        for (var i = 0; i < 6 - data.vaccineRecords.length; i++) {
          temp = _.assign({}, vaccineRecord);
          arr.push(temp);
        }
      } else {
        var vaccineRecord_1 = _.assign({}, vaccineRecord);
        vaccineRecord_1.recoVaccineName = data.healthNovaccinationName;
        vaccineRecord_1.recoInouclationDate = common.Util.formatDate(data.healthNovaccinationDate);
        vaccineRecord_1.recoInouclationSite = data.healthNovaccinationOrg;
        arr.push(vaccineRecord_1);
        arr.push(vaccineRecord);
        arr.push(vaccineRecord);
      }
      return arr;
    })();

    var dataArr = [
      {
        key: '20000',
        name: 'residentName',
        value: data.residentName
      }, {
        key: '20001',
        name: 'residentNo',
        value: data.residentNo
      }, {
        key: '20002',
        name: 'createDate',
        value: createDate[0]
      }, {
        key: '20003',
        name: 'createDate',
        value: createDate[1]
      }, {
        key: '20004',
        name: 'createDate',
        value: createDate[2]
      }, {
        key: '20005',
        name: 'examDoctor',
        value: data.examDoctor
      }, {
        key: '20007',
        name: 'symDescribe',
        value: function() {
          var result = ' ';
          var item = _.find(data.bodySymptomList, function(item) {
            return item['symName'] == 'sym_other' && item['symType'] == 1;
          });
          result = item
            ? item.symDescribe
            : result;
          return result;
        }
      }, {
        key: '20008',
        name: 'examTemperature',
        value: data.examTemperature
      }, {
        key: '20009',
        name: 'examPulseRate',
        value: data.examPulseRate
      }, {
        key: '20010',
        name: 'examBreathingRate',
        value: data.examBreathingRate
      }, {
        key: '20011',
        name: 'examLeftBloodLow',
        value: data.examLeftBloodLow
      }, {
        key: '20012',
        name: 'examLeftBloodHigh',
        value: data.examLeftBloodHigh
      }, {
        key: '20013',
        name: 'examRightBloodLow',
        value: data.examRightBloodLow
      }, {
        key: '20014',
        name: 'examRightBloodHigh',
        value: data.examRightBloodHigh
      }, {
        key: '20015',
        name: 'examHeight',
        value: data.examHeight
      }, {
        key: '20016',
        name: 'examWeight',
        value: data.examWeight
      }, {
        key: '20017',
        name: 'examWaist',
        value: data.examWaist
      }, {
        key: '20018',
        name: 'examBmi',
        value: function() {
          var examBmi = data.examBmi || 0;
          return examBmi.toFixed(2);
        }
      }, {
        key: '20019',
        name: 'examHealthStatus',
        value: data.examHealthStatus || '-'
      }, {
        key: '20020',
        name: 'examSelfCare',
        value: data.examSelfCare || '-'
      }, {
        key: '20021',
        name: 'elderCognitiveAbility',
        value: data.elderCognitiveAbility || '-'
      }, {
        key: '20022',
        name: 'elderCognitiveScore',
        value: data.elderCognitiveScore || ' '
      }, {
        key: '20023',
        name: 'elderEmotionStatus',
        value: data.elderEmotionStatus || '-'
      }, {
        key: '20024',
        name: 'elderEmotionScore',
        value: data.elderEmotionScore || ' '
      }, {
        key: '20025',
        name: 'examExerciseFrequency',
        value: data.examExerciseFrequency
      }, {
        key: '20026',
        name: 'examExerciseTime',
        value: data.examExerciseTime
      }, {
        key: '20027',
        name: 'examExerciseTotal',
        value: data.examExerciseTotal
      }, {
        key: '20028',
        name: 'examExerciseType',
        value: data.examExerciseType
      }, {
        key: '20030',
        name: 'examSmokingStatus',
        value: data.examSmokingStatus
      }, {
        key: '20031',
        name: 'examSmokingQuantity',
        value: data.examSmokingQuantity
      }, {
        key: '20032',
        name: 'examSmokingBegin',
        value: data.examSmokingBegin
      }, {
        key: '20033',
        name: 'examSmokingCessation',
        value: data.examSmokingCessation
      }, {
        key: '20034',
        name: 'examDrinkingFrequency',
        value: data.examDrinkingFrequency
      }, {
        key: '20035',
        name: 'examDailyDrinking',
        value: data.examDailyDrinking
      }, {
        key: '20036',
        name: 'examDrinkingCessation',
        value: function() {
          if (data.examDrinkingFrequency == 1) {
            return '-';
          }
          return data.examDrinkingCessation;
        }
      }, {
        key: '20037',
        name: 'examDrinkCessationAge',
        value: data.examDrinkCessationAge
      }, {
        key: '20038',
        name: 'examDrinkingAge',
        value: data.examDrinkingAge
      }, {
        key: '20039',
        name: 'examLastDrunk',
        value: data.examLastDrunk || '-'
      }, {
        key: '20041',
        name: 'examWineOther',
        value: data.examWineOther
      }, {
        key: '20042',
        name: 'careerDisease',
        value: function() {
          if (data.careerDisease.careerFlag == 1) {
            return 2;
          }
          if (data.careerDisease.careerFlag == 2) {
            return 1;
          }
          return ' ';
        }
      }, {
        key: '20043',
        name: 'careerName',
        value: data.careerDisease.careerName
      }, {
        key: '20044',
        name: 'careerTime',
        value: data.careerDisease.careerTime
      }, {
        key: '20045',
        name: 'careerDustName',
        value: data.careerDisease.careerDustName
      }, {
        key: '20046',
        name: 'careerDustProtectFlag',
        value: function() {
          // data.careerDisease.careerDustProtectFlag == 3 兼容以前错误数据
          if (data.careerDisease.careerDustProtectFlag == 1 || data.careerDisease.careerDustProtectFlag == 3) {
            return 2;
          }
          if (data.careerDisease.careerDustProtectFlag == 2) {
            return 1;
          }
          return '-';
        }
      }, {
        key: '20047',
        name: 'careerDustProtectMeasures',
        value: data.careerDisease.careerDustProtectMeasures
      }, {
        key: '20048',
        name: 'careerRadiationName',
        value: data.careerDisease.careerRadiationName
      }, {
        key: '20049',
        name: 'careerRadiationProtectFlag',
        value: function() {
          // 兼容以前错误数据
          if (data.careerDisease.careerRadiationProtectFlag == 1 || data.careerDisease.careerRadiationProtectFlag == 3) {
            return 2;
          }
          if (data.careerDisease.careerRadiationProtectFlag == 2) {
            return 1;
          }
          return '-';
        }
      }, {
        key: '20050',
        name: 'careerRadiationProtectMeasures',
        value: data.careerDisease.careerRadiationProtectMeasures
      }, {
        key: '20051',
        name: 'careerPhysicsName',
        value: data.careerDisease.careerPhysicsName
      }, {
        key: '20052',
        name: 'careerPhysicsProtectFlag',
        value: function() {
          // 兼容以前错误数据
          if (data.careerDisease.careerPhysicsProtectFlag == 1 || data.careerDisease.careerPhysicsProtectFlag == 3) {
            return 2;
          }
          if (data.careerDisease.careerPhysicsProtectFlag == 2) {
            return 1;
          }
          return '-';
        }
      }, {
        key: '20053',
        name: 'careerPhysicsProtectMeasures',
        value: data.careerDisease.careerPhysicsProtectMeasures
      }, {
        key: '20054',
        name: 'careerChemistryName',
        value: data.careerDisease.careerChemistryName
      }, {
        key: '20055',
        name: 'careerChemistryProtect',
        value: function() {
          // 兼容以前错误数据
          if (data.careerDisease.careerChemistryProtect == 1 || data.careerDisease.careerChemistryProtect == 3) {
            return 2;
          }
          if (data.careerDisease.careerChemistryProtect == 2) {
            return 1;
          }
          return '-';
        }
      }, {
        key: '20056',
        name: 'careerChemistryProtectMeasures',
        value: data.careerDisease.careerChemistryProtectMeasures
      }, {
        key: '20057',
        name: 'careerOtherName',
        value: data.careerDisease.careerOtherName
      }, {
        key: '20058',
        name: 'careerOtherProtectFlag',
        value: function() {
          // 兼容以前错误数据
          if (data.careerDisease.careerOtherProtectFlag == 1 || data.careerDisease.careerOtherProtectFlag == 3) {
            return 2;
          }
          if (data.careerDisease.careerOtherProtectFlag == 2) {
            return 1;
          }
          return '-';
        }
      }, {
        key: '20059',
        name: 'careerOtherProtectMeasures',
        value: data.careerDisease.careerOtherProtectMeasures
      }, {
        key: '20060',
        name: '症状(多选)_20006_1',
        value: function() {
          if (bodySymptomList.length > 0)
            return bodySymptomList[0];
          return 1;
        }
      }, {
        key: '20061',
        name: '症状(多选)_20006_1',
        value: bodySymptomList[1]
      }, {
        key: '20062',
        name: '症状(多选)_20006_1',
        value: bodySymptomList[2]
      }, {
        key: '20063',
        name: '症状(多选)_20006_1',
        value: bodySymptomList[3]
      }, {
        key: '20064',
        name: '症状(多选)_20006_1',
        value: bodySymptomList[4]
      }, {
        key: '20065',
        name: '症状(多选)_20006_1',
        value: bodySymptomList[5]
      }, {
        key: '20066',
        name: '症状(多选)_20006_1',
        value: bodySymptomList[6]
      }, {
        key: '20067',
        name: '症状(多选)_20006_1',
        value: bodySymptomList[7]
      }, {
        key: '20068',
        name: '症状(多选)_20006_1',
        value: bodySymptomList[8]
      }, {
        key: '20069',
        name: '症状(多选)_20006_1',
        value: bodySymptomList[9]
      }, {
        key: '20070',
        name: '生活方式_饮食习惯(多选)_20029_1',
        value: examExerciseType[0]
      }, {
        key: '20071',
        name: '生活方式_饮食习惯(多选)_20029_2',
        value: examExerciseType[1]
      }, {
        key: '20072',
        name: '生活方式_饮食习惯(多选)_20029_3',
        value: examExerciseType[2]
      }, {
        key: '20073',
        name: '生活方式_饮酒情况_饮酒种类（多选）_20040_1',
        value: examDrinkingType[0] || '-'
      }, {
        key: '20074',
        name: '生活方式_饮酒情况_饮酒种类（多选）_20040_2',
        value: examDrinkingType[1]
      }, {
        key: '20075',
        name: '生活方式_饮酒情况_饮酒种类（多选）_20040_3',
        value: examDrinkingType[2]
      }, {
        key: '20076',
        name: '生活方式_饮酒情况_饮酒种类（多选）_20040_4',
        value: examDrinkingType[3]
      }, {
        key: '21000',
        name: 'examLips',
        value: data.examLips
      }, {
        key: '21002',
        name: 'examMissingteethLeftupper',
        value: function() {
          if (data.examMissingTeeth == 1) {
            return data.examMissingteethLeftupper;
          }
          return ' ';
        }
      }, {
        key: '21003',
        name: 'examMissingteethRightupper',
        value: function() {
          if (data.examMissingTeeth == 1) {
            return data.examMissingteethRightupper;
          }
          return ' ';
        }
      }, {
        key: '21004',
        name: 'examMissingteethLeftlower',
        value: function() {
          if (data.examMissingTeeth == 1) {
            return data.examMissingteethLeftlower;
          }
          return ' ';
        }
      }, {
        key: '21005',
        name: 'examMissingteethRightlower',
        value: function() {
          if (data.examMissingTeeth == 1) {
            return data.examMissingteethRightlower;
          }
          return ' ';
        }
      }, {
        key: '21006',
        name: 'examDentalLeftupper',
        value: function() {
          if (data.examDentalTeeth == 1) {
            return data.examDentalLeftupper;
          }
          return ' ';
        }
      }, {
        key: '21007',
        name: 'examDentalRightupper',
        value: function() {
          if (data.examDentalTeeth == 1) {
            return data.examDentalRightupper;
          }
          return ' ';
        }
      }, {
        key: '21008',
        name: 'examDentalLeftlower',
        value: function() {
          if (data.examDentalTeeth == 1) {
            return data.examDentalLeftlower;
          }
          return ' ';
        }
      }, {
        key: '21009',
        name: 'examDentalRightlower',
        value: function() {
          if (data.examDentalTeeth == 1) {
            return data.examDentalRightlower;
          }
          return ' ';
        }
      }, {
        key: '21010',
        name: 'examFalseLeftupper',
        value: function() {
          if (data.examFalseTeeth == 1) {
            return data.examFalseLeftupper;
          }
          return ' ';
        }
      }, {
        key: '21011',
        name: 'examFalseRightupper',
        value: function() {
          if (data.examFalseTeeth == 1) {
            return data.examFalseRightupper;
          }
          return ' ';
        }
      }, {
        key: '21012',
        name: 'examFalseLeftlower',
        value: function() {
          if (data.examFalseTeeth == 1) {
            return data.examFalseLeftlower;
          }
          return ' ';
        }
      }, {
        key: '21013',
        name: 'examFalseRightlower',
        value: function() {
          if (data.examFalseTeeth == 1) {
            return data.examFalseRightlower;
          }
          return ' ';
        }
      }, {
        key: '21014',
        name: 'examPharynx',
        value: data.examPharynx
      }, {
        key: '21015',
        name: 'examVisionLeft',
        value: data.examVisionLeft
      }, {
        key: '21016',
        name: 'examVisionRight',
        value: data.examVisionRight
      }, {
        key: '21017',
        name: 'examCorrectVisionLeft',
        value: data.examCorrectVisionLeft
      }, {
        key: '21018',
        name: 'examCorrectVisionRight',
        value: data.examCorrectVisionRight
      }, {
        key: '21019',
        name: 'examHearing',
        value: data.examHearing
      }, {
        key: '21020',
        name: 'examExerciseAbility',
        value: data.examExerciseAbility
      }, {
        key: '21021',
        name: 'examFundusOculi',
        value: data.examFundusOculi || '-'
      }, {
        key: '21022',
        name: 'examFundusOculiException',
        value: data.examFundusOculiException
      }, {
        key: '21023',
        name: 'examSkin',
        value: data.examSkin
      }, {
        key: '21024',
        name: 'examSkinOther',
        value: data.examSkinOther
      }, {
        key: '21025',
        name: 'examSclera',
        value: data.examSclera
      }, {
        key: '21026',
        name: 'examScleraOther',
        value: data.examScleraOther
      }, {
        key: '21027',
        name: 'examLymphGland',
        value: data.examLymphGland
      }, {
        key: '21028',
        name: 'examLymphGlandOther',
        value: data.examLymphGlandOther
      }, {
        key: '21029',
        name: 'examBarrelChest',
        value: function() {
          if (data.examBarrelChest == 2) {
            return 1;
          }
          if (data.examBarrelChest == 1) {
            return 2;
          }
          return ' ';
        }
      }, {
        key: '21030',
        name: 'examBreathSounds',
        value: data.examBreathSounds
      }, {
        key: '21031',
        name: 'examBreathSoundsOther',
        value: data.examBreathSoundsOther
      }, {
        key: '21032',
        name: 'examRale',
        value: data.examRale
      }, {
        key: '21033',
        name: 'examRaleDescribe',
        value: data.examRaleDescribe
      }, {
        key: '21034',
        name: 'examHeartRate',
        value: data.examHeartRate
      }, {
        key: '21035',
        name: 'examRhythm',
        value: data.examRhythm
      }, {
        key: '21036',
        name: 'examNoise',
        value: function() {
          if (data.examNoise == 1) {
            return 2;
          }
          if (data.examNoise == 2) {
            return 1;
          }
          return ' ';
        }

      }, {
        key: '21037',
        name: 'examNoiseDescribe',
        value: function() {
          if (data.examNoise == 2) {
            return ' ';
          }
          return data.examNoiseDescribe;
        }
      }, {
        key: '21038', //压痛
        name: 'examTenderness',
        value: function() {
          if (data.examTenderness == 1) {
            return 2;
          }
          if (data.examTenderness == 2) {
            return 1;
          }
          return ' ';
        }

      }, {
        key: '21039', //压痛描述
        name: 'examTendernessDescribe',
        value: data.examTendernessDescribe
      }, {
        key: '21040', //包块
        name: 'examBagPiece',
        value: function() {
          if (data.examBagPiece == 1) {
            return 2;
          }
          if (data.examBagPiece == 2) {
            return 1;
          }
          return ' ';
        }
      }, {
        key: '21041', //包块描述
        name: 'examBagPieceDescribe',
        value: data.examBagPieceDescribe
      }, {
        key: '21042', //肝大
        name: 'examLiver',
        value: function() {
          if (data.examLiver == 1) {
            return 2;
          }
          if (data.examLiver == 2) {
            return 1;
          }
          return ' ';
        }
      }, {
        key: '21043', //肝大描述
        name: 'examLiverDescribe',
        value: data.examLiverDescribe
      }, {
        key: '21044', //脾大
        name: 'examSplenomegaly',
        value: function() {
          if (data.examSplenomegaly == 1) {
            return 2;
          }
          if (data.examSplenomegaly == 2) {
            return 1;
          }
          return ' ';
        }
      }, {
        key: '21045', //脾大描述
        name: 'examSplenomegalyDescribe',
        value: data.examSplenomegalyDescribe
      }, {
        key: '21046', //移动性浊音
        name: 'examMobileDullness',
        value: function() {
          if (data.examMobileDullness == 1) {
            return 2;
          }
          if (data.examMobileDullness == 2) {
            return 1;
          }
          return ' ';
        }

      }, {
        key: '21047', //移动性浊音描述
        name: 'examMobileDullnessDescribe',
        value: data.examMobileDullnessDescribe
      }, {
        key: '21048', //下肢水肿
        name: 'examEdemaLower',
        value: data.examEdemaLower
      }, {
        key: '21049', //足背动脉搏动
        name: 'examDorsalisPedis',
        value: data.examDorsalisPedis || '-'
      }, {
        key: '21050',
        name: 'examDra',
        value: function() {
          if (data.examDra == 6 || !data.examDra) {
            return '-';
          }
          return data.examDra;
        }
      }, {
        key: '21051',
        name: 'examDraDescribe',
        value: data.examDraDescribe
      }, {
        key: '21053',
        name: 'exceOtherDescribe',
        value: function() {
          if (data.breast.exceFlag == 5) {
            return data.breast.exceOtherDescribe;
          }
          return ' ';
        }
      }, {
        key: '21054',
        name: 'gynaVulva',
        value: function() {
          if (data.gynaecology.gynaVulva == 1) {
            return 2;
          }
          if (data.gynaecology.gynaVulva == 2)
            return 1;
          return '-';
        }
      }, {
        key: '21055',
        name: 'gynaVulva',
        value: data.gynaecology.gynaVulvaExce
      }, {
        key: '21056',
        name: 'gynaCervical',
        value: function() {
          if (data.gynaecology.gynaCervical == 1) {
            return 2;
          }
          if (data.gynaecology.gynaCervical == 2)
            return 1;
          return '-';
        }
      }, {
        key: '21057',
        name: 'gynaCervicalExce',
        value: data.gynaecology.gynaCervicalExce
      }, {
        key: '21058',
        name: 'gynaPalace',
        value: function() {
          if (data.gynaecology.gynaPalace == 1) {
            return 2;
          }
          if (data.gynaecology.gynaPalace == 2)
            return 1;
          return '-';
        }
      }, {
        key: '21059',
        name: 'gynaPalaceExce',
        value: data.gynaecology.gynaPalaceExce
      }, {
        key: '21060',
        name: 'gynaEnclosure',
        value: function() {
          if (data.gynaecology.gynaEnclosure == 1) {
            return 2;
          }
          if (data.gynaecology.gynaEnclosure == 2)
            return 1;
          return '-';
        }
      }, {
        key: '21061',
        name: 'gynaEnclosureExce',
        value: data.gynaecology.gynaEnclosureExce
      }, {
        key: '21062',
        name: 'examBodyChecking',
        value: data.examBodyChecking
      }, {
        key: '21063',
        name: 'examAuxiliaryBloodHemoglobin',
        value: data.examAuxiliaryBloodHemoglobin
      }, {
        key: '21064',
        name: 'examAuxiliaryBloodWhitecell',
        value: data.examAuxiliaryBloodWhitecell
      }, {
        key: '21065',
        name: 'examAuxiliaryBloodPlatelet',
        value: data.examAuxiliaryBloodPlatelet
      }, {
        key: '21066',
        name: 'examAuxiliaryBloodOther',
        value: data.examAuxiliaryBloodOther
      }, {
        key: '21067',
        name: 'examAuxiliaryUrineProtein',
        value: data.examAuxiliaryUrineProtein
      }, {
        key: '21068',
        name: 'examAuxiliaryUrineSugar',
        value: data.examAuxiliaryUrineSugar
      }, {
        key: '21069',
        name: 'examAuxiliaryUrineKetone',
        value: data.examAuxiliaryUrineKetone
      }, {
        key: '21070',
        name: 'examAuxiliaryUrineBld',
        value: data.examAuxiliaryUrineBld
      }, {
        key: '21071',
        name: 'examAuxiliaryUrineOther',
        value: data.examAuxiliaryUrineOther
      }, {
        key: '21072',
        name: 'examAuxiliaryBloodGlucose1',
        value: data.examAuxiliaryBloodGlucose1
      }, {
        key: '21073',
        name: 'examAuxiliaryBloodGlucose2',
        value: data.examAuxiliaryBloodGlucose2
      }, {
        key: '21074',
        name: 'examAuxiliaryCardiogram',
        value: function() {
          if (data.examAuxiliaryCardiogram == 1) {
            return 2;
          }
          if (data.examAuxiliaryCardiogram == 2) {
            return 1;
          }
          return '-';
        }
      }, {
        key: '21075',
        name: 'examAuxiliaryCardiogramExce',
        value: function() {
          if (data.examAuxiliaryCardiogram == 1) {
            return data.examAuxiliaryCardiogramExce;
          }
          return ' ';
        }
      }, {
        key: '21076',
        name: 'gynaVagina',
        value: function() {
          if (data.gynaecology.gynaVagina == 1)
            return 2;
          if (data.gynaecology.gynaVagina == 2)
            return 1;
          return '-';
        }
      }, {
        key: '21077',
        name: 'gyanVaginaExce',
        value: data.gynaecology.gyanVaginaExce
      }, {
        key: '21081',
        name: 'gyanVaginaExce',
        value: data.breast.exceFlag || '-'
      }, {
        key: '21082',
        name: 'gyanVaginaExce',
        value: ' '
      }, {
        key: '21083',
        name: 'gyanVaginaExce',
        value: ' '
      }, {
        key: '21084',
        name: 'gyanVaginaExce',
        value: ' '
      }, {
        key: '21085',
        name: 'teeth',
        value: teeth[0]
      }, {
        key: '21086',
        name: 'gyanVaginaExce',
        value: teeth[1]
      }, {
        key: '21087',
        name: 'gyanVaginaExce',
        value: teeth[2]
      }, {
        key: '22000',
        name: 'examAuxiliaryUrineMicroalbumin',
        value: data.examAuxiliaryUrineMicroalbumin
      }, {
        key: '22001',
        name: 'examAuxiliaryOccultBlood',
        value: function() {
          if (!data.examAuxiliaryOccultBlood || data.examAuxiliaryOccultBlood == 3) {
            return '-';
          }
          return data.examAuxiliaryOccultBlood;
        }
      }, {
        key: '22002',
        name: 'examAuxiliaryGlycosylatedHemoglobin',
        value: data.examAuxiliaryGlycosylatedHemoglobin
      }, {
        key: '22003',
        name: 'examAuxiliarySurfaceAntigen',
        value: function() {
          if (!data.examAuxiliarySurfaceAntigen || data.examAuxiliarySurfaceAntigen == 3) {
            return '-';
          }
          return data.examAuxiliarySurfaceAntigen;
        }
      }, {
        key: '22004',
        name: 'examAuxiliaryLiverSgpt',
        value: data.examAuxiliaryLiverSgpt
      }, {
        key: '22005',
        name: 'examAuxiliaryLiverSgot',
        value: data.examAuxiliaryLiverSgot
      }, {
        key: '22006',
        name: 'examAuxiliaryLiverAlbumin',
        value: data.examAuxiliaryLiverAlbumin
      }, {
        key: '22007',
        name: 'examAuxiliaryLiverBilirubin',
        value: data.examAuxiliaryLiverBilirubin
      }, {
        key: '22008',
        name: 'examAuxiliaryLiverConjugated',
        value: data.examAuxiliaryLiverConjugated
      }, {
        key: '22009',
        name: 'examAuxiliaryKidneyScr',
        value: data.examAuxiliaryKidneyScr
      }, {
        key: '22010',
        name: 'examAuxiliaryKidneyNitrogen',
        value: data.examAuxiliaryKidneyNitrogen
      }, {
        key: '22011',
        name: 'examAuxiliaryKidneyPotassium',
        value: data.examAuxiliaryKidneyPotassium
      }, {
        key: '22012',
        name: 'examAuxiliaryKidneySodium',
        value: data.examAuxiliaryKidneySodium
      }, {
        key: '22013',
        name: 'examAuxiliaryLipidCholesterol',
        value: data.examAuxiliaryLipidCholesterol
      }, {
        key: '22014',
        name: 'examAuxiliaryLipidTriglyceride',
        value: data.examAuxiliaryLipidTriglyceride
      }, {
        key: '22015',
        name: 'examAuxiliaryLipidLipoprotein',
        value: data.examAuxiliaryLipidLipoprotein
      }, {
        key: '22016',
        name: 'examAuxiliaryLipidHigh',
        value: data.examAuxiliaryLipidHigh
      }, {
        key: '22017',
        name: 'examAuxiliaryChestradiograph',
        value: function() {
          if (data.examAuxiliaryChestradiograph == 1) {
            return 2;
          }
          if (data.examAuxiliaryChestradiograph == 2) {
            return 1;
          }
          return '-';
        }
      }, {
        key: '22018',
        name: 'examAuxiliaryChestradiographExce',
        value: function() {
          if (data.examAuxiliaryChestradiograph == 1) {
            return data.examAuxiliaryChestradiographExce;
          }
          return ' ';
        }
      }, {
        key: '22019',
        name: 'examAuxiliaryAbdominalUltrasonography',
        value: function() {
          if (data.examAuxiliaryAbdominalUltrasonography == 1) {
            return 2;
          }
          if (data.examAuxiliaryAbdominalUltrasonography == 2) {
            return 1;
          }
          return '-';
        }
      }, {
        key: '22020',
        name: 'examAuxiliaryAbdominalExce',
        value: data.examAuxiliaryAbdominalExce
      }, {
        key: '22021',
        name: 'examAuxiliaryAbdominalOther',
        value: function() {
          if (data.examAuxiliaryAbdominalOther == 1) {
            return 2;
          }
          if (data.examAuxiliaryAbdominalOther == 2) {
            return 1;
          }
          return '-';
        }
      }, {
        key: '22022',
        name: 'examAuxiliaryAbdominalOtherdexce',
        value: data.examAuxiliaryAbdominalOtherdexce
      }, {
        key: '22023',
        name: 'examAuxiliaryCervicalSmear',
        value: function() {
          if (data.examAuxiliaryCervicalSmear == 1) {
            return 2;
          }
          if (data.examAuxiliaryCervicalSmear == 2) {
            return 1;
          }
          return '-';
        }
      }, {
        key: '22024',
        name: 'examAuxiliaryCervicalExce',
        value: data.examAuxiliaryCervicalExce
      }, {
        key: '22025',
        name: 'examAuxiliaryOther',
        value: data.examAuxiliaryOther
      }, {
        key: '22026',
        name: 'tcmPeaceResult',
        value: function() {
          if (data.tcmConstitution.tcmPeaceResult == 2) {
            return 1;
          }
          if (data.tcmConstitution.tcmPeaceResult == 3) {
            return 2;
          }
          return '-';
        }
      }, {
        key: '22027',
        name: 'tcmDeficiencyResult',
        value: function() {
          if (data.tcmConstitution.tcmDeficiencyResult == 2) {
            return 1;
          }
          if (data.tcmConstitution.tcmDeficiencyResult == 3) {
            return 2;
          }
          return '-';
        }
      }, {
        key: '22028',
        name: 'tcmDeficiencyResult',
        value: function() {
          if (data.tcmConstitution.tcmYangResult == 2) {
            return 1;
          }
          if (data.tcmConstitution.tcmYangResult == 3) {
            return 2;
          }
          return '-';
        }
      }, {
        key: '22029',
        name: 'tcmYinResult',
        value: function() {
          if (data.tcmConstitution.tcmYinResult == 2) {
            return 1;
          }
          if (data.tcmConstitution.tcmYinResult == 3) {
            return 2;
          }
          return '-';
        }
      }, {
        key: '22030',
        name: 'tcmPhlegmResult',
        value: function() {
          if (data.tcmConstitution.tcmPhlegmResult == 2) {
            return 1;
          }
          if (data.tcmConstitution.tcmPhlegmResult == 3) {
            return 2;
          }
          return '-';
        }
      }, {
        key: '22031',
        name: 'tcmDampResult',
        value: function() {
          if (data.tcmConstitution.tcmDampResult == 2) {
            return 1;
          }
          if (data.tcmConstitution.tcmDampResult == 3) {
            return 2;
          }
          return '-';
        }
      }, {
        key: '22032',
        name: 'tcmBloodResult',
        value: function() {
          if (data.tcmConstitution.tcmBloodResult == 2) {
            return 1;
          }
          if (data.tcmConstitution.tcmBloodResult == 3) {
            return 2;
          }
          return '-';
        }
      }, {
        key: '22033',
        name: 'tcmStagnationResult',
        value: function() {
          if (data.tcmConstitution.tcmStagnationResult == 2) {
            return 1;
          }
          if (data.tcmConstitution.tcmStagnationResult == 3) {
            return 2;
          }
          return '-';
        }
      }, {
        key: '22034',
        name: 'tcmSpecialResult',
        value: function() {
          if (data.tcmConstitution.tcmSpecialResult == 2) {
            return 1;
          }
          if (data.tcmConstitution.tcmSpecialResult == 3) {
            return 2;
          }
          return '-';
        }
      }, {
        key: '22036',
        name: 'cerebroDisease',
        value: function() {
          if (data.cerebroDisease.tconOther == 1) {
            return data.cerebroDisease.tconOtherDisease;
          }
          return ' ';
        }
      }, {
        key: '22038',
        name: 'cerebroDisease',
        value: function() {
          if (data.kidneyDisease.kidnOther == 1) {
            return data.kidneyDisease.kidnOtherDescribe;
          }
          return ' ';
        }
      }, {
        key: '22040',
        name: 'heartDisease',
        value: function() {
          if (data.heartDisease.heartOther == 1) {
            return data.heartDisease.heartOtherDescribe;
          }
          return ' ';
        }
      }, {
        key: '22042',
        name: 'vascularDisease',
        value: function() {
          if (data.vascularDisease.vascOther == 1) {
            return data.vascularDisease.vascOtherDescribe;
          }
          return ' ';
        }
      }, {
        key: '22044',
        name: 'eyeDisease',
        value: function() {
          if (data.eyeDisease.eyeOther == 1) {
            return data.eyeDisease.eyeOtherDescribe;
          }
          return ' ';
        }
      }, {
        key: '22045',
        name: 'pdhNervousDisease',
        value: function() {
          if (data.pdhNervousDisease == 1) {
            return 2;
          }
          return 1;
        }
      }, {
        key: '22046',
        name: 'pdhNervousDiseaseExce',
        value: function() {
          if (data.pdhNervousDisease == 1) {
            return data.pdhNervousDiseaseExce;
          }
          return ' ';
        }
      }, {
        key: '22047',
        name: 'pdhOtherDiseases',
        value: function() {
          if (data.pdhOtherDiseases == 1) {
            return 2;
          }
          return 1;
        }
      }, {
        key: '22048',
        name: 'pdhOtherDiseasesExce',
        value: function() {
          if (data.pdhOtherDiseases == 1) {
            return data.pdhOtherDiseasesExce;
          }
          return ' ';
        }
      }, {
        key: '22049',
        name: 'cerebroDisease',
        value: cerebroDisease[0]
      }, {
        key: '22050',
        name: 'cerebroDisease',
        value: cerebroDisease[1]
      }, {
        key: '22051',
        name: 'cerebroDisease',
        value: cerebroDisease[2]
      }, {
        key: '22052',
        name: 'cerebroDisease',
        value: cerebroDisease[3]
      }, {
        key: '22053',
        name: 'cerebroDisease',
        value: cerebroDisease[4]
      }, {
        key: '22054',
        name: 'kidneyDisease',
        value: kidneyDisease[0]
      }, {
        key: '22055',
        name: 'kidneyDisease',
        value: kidneyDisease[1]
      }, {
        key: '22056',
        name: 'kidneyDisease',
        value: kidneyDisease[2]
      }, {
        key: '22057',
        name: 'kidneyDisease',
        value: kidneyDisease[3]
      }, {
        key: '22058',
        name: 'kidneyDisease',
        value: kidneyDisease[4]
      }, {
        key: '22059',
        name: 'heartDisease',
        value: heartDisease[0]
      }, {
        key: '22060',
        name: 'heartDisease',
        value: heartDisease[1]
      }, {
        key: '22061',
        name: 'heartDisease',
        value: heartDisease[2]
      }, {
        key: '22062',
        name: 'heartDisease',
        value: heartDisease[3]
      }, {
        key: '22063',
        name: 'heartDisease',
        value: heartDisease[4]
      }, {
        key: '22065',
        name: 'vascularDisease',
        value: vascularDisease[0]
      }, {
        key: '22066',
        name: 'vascularDisease',
        value: vascularDisease[1]
      }, {
        key: '22067',
        name: 'vascularDisease',
        value: vascularDisease[2]
      }, {
        key: '22068',
        name: 'eyeDisease',
        value: eyeDisease[0]
      }, {
        key: '22069',
        name: 'eyeDisease',
        value: eyeDisease[1]
      }, {
        key: '22070',
        name: 'eyeDisease',
        value: eyeDisease[2]
      }, {
        key: '23000',
        name: 'examHospitalIn',
        value: common.Util.formatDate(data.examHospitalIn, '-')
      }, {
        key: '23001',
        name: 'examHospitalOut',
        value: common.Util.formatDate(data.examHospitalOut, '-')
      }, {
        key: '23002',
        name: 'examHospitalReason',
        value: data.examHospitalReason
      }, {
        key: '23003',
        name: 'examHospitalName',
        value: data.examHospitalName
      }, {
        key: '23004',
        name: 'examHospitalNo',
        value: data.examHospitalNo
      }, {
        key: '23005',
        name: 'examHospitalIn',
        value: ' '
      }, {
        key: '23006',
        name: 'examHospitalOut',
        value: ' '
      }, {
        key: '23007',
        name: 'examHospitalReason',
        value: ' '
      }, {
        key: '23008',
        name: 'examHospitalName',
        value: ' '
      }, {
        key: '23009',
        name: 'examHospitalNo',
        value: ' '
      }, {
        key: '23010',
        name: 'examBedIn',
        value: common.Util.formatDate(data.examBedIn, '-')
      }, {
        key: '23011',
        name: 'examBedOut',
        value: common.Util.formatDate(data.examBedOut, '-')
      }, {
        key: '23012',
        name: 'examBedReason',
        value: data.examBedReason
      }, {
        key: '23013',
        name: 'examBedOrg',
        value: data.examBedOrg
      }, {
        key: '23014',
        name: 'examBedNo',
        value: data.examBedNo
      }, {
        key: '23015',
        name: 'examBedIn',
        value: ' '
      }, {
        key: '23016',
        name: 'examBedOut',
        value: ' '
      }, {
        key: '23017',
        name: 'examBedReason',
        value: ' '
      }, {
        key: '23018',
        name: 'examBedOrg',
        value: ' '
      }, {
        key: '23019',
        name: 'examBedNo',
        value: ' '
      }, {
        key: '23020',
        name: 'examDrugName',
        value: medicationUses[0].medDrugName
      }, {
        key: '23021',
        name: 'examDrugUse',
        value: medicationUses[0].medUsage
      }, {
        key: '23022',
        name: 'examDrugDosage',
        value: medicationUses[0].medConsumption
      }, {
        key: '23023',
        name: 'examDrugDate',
        value: medicationUses[0].medMedicationTime
      }, {
        key: '23024',
        name: 'examDrugDependenceDes',
        value: medicationUses[0].medMedicationCompliance
      }, {
        key: '23025',
        name: 'examDrugName',
        value: medicationUses[1].medDrugName
      }, {
        key: '23026',
        name: 'examDrugUse',
        value: medicationUses[1].medUsage
      }, {
        key: '23027',
        name: 'examDrugDosage',
        value: medicationUses[1].medConsumption
      }, {
        key: '23028',
        name: 'examDrugDate',
        value: medicationUses[1].medMedicationTime
      }, {
        key: '23029',
        name: 'examDrugDependenceDes',
        value: medicationUses[1].medMedicationCompliance
      }, {
        key: '23030',
        name: 'examDrugName',
        value: medicationUses[2].medDrugName
      }, {
        key: '23031',
        name: 'examDrugUse',
        value: medicationUses[2].medUsage
      }, {
        key: '23032',
        name: 'examDrugDosage',
        value: medicationUses[2].medConsumption
      }, {
        key: '23033',
        name: 'examDrugDate',
        value: medicationUses[2].medMedicationTime
      }, {
        key: '23034',
        name: 'examDrugDependenceDes',
        value: medicationUses[2].medMedicationCompliance
      }, {
        key: '23035',
        name: 'examDrugName',
        value: medicationUses[3].medDrugName
      }, {
        key: '23036',
        name: 'examDrugUse',
        value: medicationUses[3].medUsage
      }, {
        key: '23037',
        name: 'examDrugDosage',
        value: medicationUses[3].medConsumption
      }, {
        key: '23038',
        name: 'examDrugDate',
        value: medicationUses[3].medMedicationTime
      }, {
        key: '23039',
        name: 'examDrugDependenceDes',
        value: medicationUses[3].medMedicationCompliance
      }, {
        key: '23040',
        name: 'examDrugName',
        value: medicationUses[4].medDrugName
      }, {
        key: '23041',
        name: 'examDrugUse',
        value: medicationUses[4].medUsage
      }, {
        key: '23042',
        name: 'examDrugDosage',
        value: medicationUses[4].medConsumption
      }, {
        key: '23043',
        name: 'examDrugDate',
        value: medicationUses[4].medMedicationTime
      }, {
        key: '23044',
        name: 'examDrugDependenceDes',
        value: medicationUses[4].medMedicationCompliance
      }, {
        key: '23045',
        name: 'examDrugName',
        value: medicationUses[5].medDrugName
      }, {
        key: '23046',
        name: 'examDrugUse',
        value: medicationUses[5].medUsage
      }, {
        key: '23047',
        name: 'examDrugDosage',
        value: medicationUses[5].medConsumption
      }, {
        key: '23048',
        name: 'examDrugDate',
        value: medicationUses[5].medMedicationTime
      }, {
        key: '23049',
        name: 'examDrugDependenceDes',
        value: medicationUses[5].medMedicationCompliance
      }, {
        key: '23050',
        name: 'healthNovaccinationName',
        value: vaccineRecords[0].recoVaccineName
      }, {
        key: '23051',
        name: 'healthNovaccinationName',
        value: vaccineRecords[0].recoInouclationDate
      }, {
        key: '23052',
        name: 'healthNovaccinationOrg',
        value: vaccineRecords[0].recoInouclationSite
      }, {
        key: '23053',
        name: 'healthNovaccinationName',
        value: vaccineRecords[1].recoVaccineName
      }, {
        key: '23054',
        name: 'healthNovaccinationName',
        value: vaccineRecords[1].recoInouclationDate
      }, {
        key: '23055',
        name: 'healthNovaccinationOrg',
        value: vaccineRecords[1].recoInouclationSite
      }, {
        key: '23056',
        name: 'healthNovaccinationName',
        value: vaccineRecords[2].recoVaccineName
      }, {
        key: '23057',
        name: 'healthNovaccinationName',
        value: vaccineRecords[2].recoInouclationDate
      }, {
        key: '23058',
        name: 'healthNovaccinationOrg',
        value: vaccineRecords[2].recoInouclationSite
      }, {
        key: '23059',
        name: 'healthAssessment',
        value: function() {
          if (data.healthAssessment == 1)
            return 2;
          return 1;
        }
      }, {
        key: '23060',
        name: 'healthAsseException1',
        value: data.healthAsseException1
      }, {
        key: '23061',
        name: 'healthAsseException2',
        value: data.healthAsseException2
      }, {
        key: '23062',
        name: 'healthAsseException3',
        value: data.healthAsseException3
      }, {
        key: '23063',
        name: 'healthAsseException4',
        value: data.healthAsseException4
      }, {
        key: '23066',
        name: 'rfcRwTarget',
        value: data.riskFactor.rfcRwTarget + 'Kg'
      }, {
        key: '23067',
        name: 'rfcVaccineName',
        value: data.riskFactor.rfcVaccineName
      }, {
        key: '23068',
        name: 'rfcOtherDescribe',
        value: data.riskFactor.rfcOtherDescribe
      }, {
        key: '23069',
        name: 'healthGuide',
        value: healthGuide[0] || '-'
      }, {
        key: '23070',
        name: 'healthGuide',
        value: healthGuide[1]
      }, {
        key: '23071',
        name: 'healthGuide',
        value: healthGuide[2]
      }, {
        key: '23072',
        name: 'riskFactor',
        value: riskFactor[0] || '-'
      }, {
        key: '23073',
        name: 'riskFactor',
        value: riskFactor[1]
      }, {
        key: '23074',
        name: 'riskFactor',
        value: riskFactor[2]
      }, {
        key: '23075',
        name: 'riskFactor',
        value: riskFactor[3]
      }, {
        key: '23076',
        name: 'riskFactor',
        value: riskFactor[4]
      }, {
        key: '23077',
        name: 'riskFactor',
        value: riskFactor[5]
      }, {
        key: '23079',
        name: 'healthGuide',
        value: ' '
      }
    ];

    return dataArr;
  };

  return formTemplate;
}));
