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
                key: '27000',
                name: 'residentName',
                value: data.residentName
            },
            {
                key: '27001',
                name: 'residentSex',
                value: data.residentSex
            },
            {
                key: '27002',
                name: 'residentAge',
                value: data.residentAge
            },
            {
                key: '27003',
                name: 'inpatientMedicalNo',
                value: data.inpatientMedicalNo
            },
            {
                key: '27004',
                name: 'address',
                value: data.address
            },
            {
                key: '27005',
                name: 'residentMobile',
                value: data.residentMobile
            },
            {
                key: '27006',
                name: 'referralDate',
                value: new Date(data.referralDate).getFullYear()
            },
            {
                key: '27007',
                name: 'referralDate',
                value: new Date(data.referralDate).getMonth()+1
            },
            {
                key: '27008',
                name: 'referralDate',
                value: new Date(data.referralDate).getDate()
            },
            {
                key: '27010',
                name: 'rotationHospital',
                value: data.toOrganization
            },
            {
                key: '27011',
                name: 'rotationDoctor',
                value: data.rotationDoctor
            },
            {
                key: '27012',
                name: 'referralDoctor',
                value: data.referralDoctor
            },
            {
                key: '27013',
                name: 'fromDate',
                value: new Date(data.referralDate).getFullYear()
            },
            {
                key: '27014',
                name: 'fromDate',
                value: new Date(data.referralDate).getMonth()+1
            },
            {
                key: '27015',
                name: 'fromDate',
                value: new Date(data.referralDate).getDate()
            },
            {
                key: '27500',
                name: 'rotationHospital',
                value: data.rotationHospital
            },
            {
                key: '27501',
                name: 'residentName',
                value: data.residentName
            },
            {
                key: '27502',
                name: 'diagnosisResult',
                value: data.diagnosisResult
            },
            {
                key: '27503',
                name: 'inpatientMedicalNo',
                value: data.inpatientMedicalNo
            },
            {
                key: '27504',
                name: 'inspectionResults',
                value: data.inspectionResults
            },
            {
                key: '27505',
                name: 'treatmentOutcome',
                value: data.treatmentOutcome
            },
            {
                key: '27506',
                name: 'fromDoctor',
                value: data.fromDoctor
            },
            {
                key: '27507',
                name: 'fromDoctorMobile',
                value: data.fromDoctorMobile
            },
            {
                key: '27508',
                name: 'fromHospital',
                value: data.fromHospital
            },
            {
                key: '27510',
                name: 'referralDate',
                value: new Date(data.referralDate).getFullYear()
            },
            {
                key: '27511',
                name: 'referralDate',
                value: new Date(data.referralDate).getMonth()+1
            },
            {
                key: '27512',
                name: 'referralDate',
                value: new Date(data.referralDate).getDate()
            }
        ];
        return dataArr;
    };
    return formTemplate;
}));