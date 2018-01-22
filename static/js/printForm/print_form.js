(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS之类的
    module.exports = factory(require('jquery'));
  } else {
    // 浏览器全局变量(root 即 window)
    root.Util = factory(root.jQuery);
  }
}(this, function($) {

  var printForm = {};

  // 表单字典
  var settings = {
    10: 'residentHealthCover', //健康档案封面
    20: 'personalInformation', //个人基本信息
    30: 'healthChecklist', //健康体检表
    31: 'healthChecklist',//精简健康体检表
    40: 'acceptanceRecordForm', //接诊记录
    50: 'consultationRecord', //会诊记录
    60: 'two-wayTurnOut', //双向转诊(转出)
    70: 'two-wayTurnBack', //双向转诊(回转)
    80: 'residentHealthFileInformationCard', //居民健康档案信息卡
    90: 'prenatalInspectionServiceRecords', //孕妇第1次产前检查服务记录表
    100: 'morePrenatalInspectionServiceRecords', //第2~5次产前随访记录表
    110: 'postpartumVisitRecord', //产后访视记录表
    120: 'postpartumHealthCheklist', //产后42天健康检查记录表
    130: 'newborns', //新生儿家庭访视表
    139: 'childHealthCheckRecords', //1~30月儿童健康检查记录表
    140: 'moreChildHealthCheckRecords', //3~6岁儿童健康检查记录表
    160: 'boyGrowth', //男童生长发育检测图
    170: 'girlGrowth', //女童生长发育监测图
    180: 'vaccinationCard', //预防接种卡
    190: 'childHealthManagementService', //6～18月龄儿童中医药健康管理服务记录表
    200: 'moreChildHealthManagementService', //24～36月龄儿童中医药健康管理服务记录表
    210: 'hypertensivePatients', //高血压患者健康管理服务
    220: 'visitDiabeticPatients', //2型糖尿病患者随访服务记录表
    230: 'tuberculosisPatients', //肺结核患者第一次入户随访记录表
    240: 'moreTuberculosisPatients', //肺结核患者随访服务记录表
    250: 'patientsWithMentalDisorders', //严重精神障碍患者个人信息补
    260: 'visitPatientsWithMentalDisorders', //严重精神障碍患者随访服务记录表
    270: 'coronaryHeartDisease', //冠心病专项档案
    280: 'visitCoronaryHeartDisease', //五华区冠心病人随访表
    290: 'tumorDisease', //五华区肿瘤病例随访表
    300: 'strokeDisease', //脑卒中病例随访表
    420: 'generalFollowUp', //一般随访表
    430: 'maternalBasic', //孕妇基本档案
    //440: 'healthChecklistExt',                     //体检扩展表
    450: 'pregnantWomen', //孕产妇结题
    460: 'archives', //添加历史&院外档案
    500: 'healthAdvice' //健康建议
  };

  printForm.getFormData = function(args) {
    var deferred = $.Deferred();
    var doc_type_name = settings[args['doc_type']];
    common.fetch({
      url: '/hca/web/management/resident/getdoc',
      demoUrl: '../static/rss/' + doc_type_name + '.json',
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      cache: false,
      data: JSON.stringify(args),
      success: function(data) {
    	  console.log(data);
        if (data.ret_code === 1) {
          require(['js/printForm/template/' + doc_type_name], function(printFormDataTemplate) {
            var formData = printFormDataTemplate.getFormData(data.ret_data);
            console.log(formData.length);
            var result = [];
            var index = 0;
            while (index < formData.length) {
              var value = formData[index].value;
              if (typeof value === 'function') {
                value = value();
              }
              value = value || ' ';
              result.push(formData[index].key + value);
              index++;
            }
            deferred.resolve(result.join('|'));
          });
        } else {
          deferred.reject(data.ret_msg || '查询信息错误！');
        }
      },
      error: function(err) {
        deferred.reject('当前网络不可用，请检查你的网络设置');
        console.log(err);
      }
    });

    return deferred.promise();
  };

  return printForm;

}));