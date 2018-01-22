(function(root,factory){
    if(typeof define == 'function' && define.amd){
        define(['lodash'],factory);
    }else if(typeof exports == 'object'){
        module.exports = factory('lodash');
    }else{
        root.Util = factory(root._);
    }
}(this,function(){
    var formTemplate = {};
    function formatDate(dateStr, splitType) {
        if (!dateStr) return '';
        splitType = splitType || '  ';
        var date = new Date(dateStr);
        var arr = [];
        arr.push(date.getFullYear());
        arr.push(date.getMonth() + 1);
        arr.push(date.getDate());
        return arr.join(splitType);
    }
    formTemplate.getFormData = function(data){
      var dataArr = [
          {
              key: '26000',
              name: 'residentName',
              value: data.residentName
          },
          {
              key: '26001',
              name: 'residentSex',
              value: data.residentSex
          },
          {
              key: '26002',
              name: 'residentAge',
              value: data.residentAge
          },
          /*{
              key: '26003',
              name: 'residentNo',
              value: data.residentNo
          },*/
          {
              key: '26004',
              name: 'address',
              value: data.address
          },
          {
              key: '26005',
              name: 'residentMobile',
              value: data.residentMobile
          },
          {
              key: '26006',
              name: 'transDate',
              value: new Date(data.transDate).getFullYear()
          },
          {
              key: '26007',
              name: 'transDate',
              value: new Date(data.transDate).getMonth()+1
          },
          {
              key: '26008',
              name: 'transDate',
              value: new Date(data.transDate).getDate()
          },
          {
              key: '26010',
              name: 'toHospital',
              value: data.toHospital
          },
          {
              key: '26011',
              name: 'toDepartment',
              value: data.toDepartment
          },
          {
              key: '26012',
              name: 'toDoctor',
              value: data.toDoctor
          },
          {
              key: '26013',
              name: 'fromDoctor',
              value: data.fromDoctor
          },
          {
              key: '26014',
              name: 'fromDate',
              value: new Date(data.fromDate).getFullYear()
          },
          {
              key: '26015',
              name: 'fromDate',
              value: new Date(data.fromDate).getMonth()+1
          },
          {
              key: '26016',
              name: 'fromDate',
              value: new Date(data.fromDate).getDate()
          },
          {
              key: '26500',
              name: 'transHospital',
              value: data.toHospital
          },
          {
              key: '26501',
              name: 'residentName',
              value: data.residentName
          },
          {
              key: '26502',
              name: 'residentSex',
              value: data.residentSex
          },
          {
              key: '26503',
              name: 'residentAge',
              value: data.residentAge
          },
          {
              key: '26504',
              name: 'initialImpression',
              value: data.initialImpression
          },
          {
              key: '26505',
              name: 'currentStatus',
              value: data.currentStatus
          },
          {
              key: '26506',
              name: 'pastIllness',
              value: data.pastIllness
          },
          {
              key: '26507',
              name: 'treatmentCourse',
              value: data.treatmentCourse
          },
          {
              key: '26508',
              name: 'fromDoctor',
              value: data.fromDoctor
          },
          {
              key: '26509',
              name: 'fromDoctorPhone',
              value: data.fromDoctorPhone
          },
          {
              key: '26510',
              name: 'fromHospital',
              value: data.fromHospital
          },
          {
              key: '26511',
              name: 'fromDate',
              value: new Date(data.fromDate).getFullYear()
          },
          {
              key: '26512',
              name: 'fromDate',
              value: new Date(data.fromDate).getMonth()+1
          },
          {
              key: '26513',
              name: 'fromDate',
              value: new Date(data.fromDate).getDate()
          }
      ];
      return dataArr;
    };
    return formTemplate;
}));