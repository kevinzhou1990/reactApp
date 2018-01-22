(function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(['lodash'], factory);
    } else if (typeof exports == 'object') {
        module.exports = factory('lodash');
    } else {
        root.Util = factory(root._);
    }
}(this, function () {
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
    formTemplate.getFormData = function (data) {
        console.log(data);
        var dataArr = [
            {
                key: '30000',
                name: 'residentName',
                value: data.residentName
            },
            {
                key: '30002',
                name: 'mentaGuardian',
                value: data.mentaGuardian
            },
            {
                key: '30003',
                name: 'mentaRelation',
                value: data.mentaRelation
            },
            {
                key: '30004',
                name: 'mentaGuardianAddress',
                value: data.mentaGuardianAddress
            },
            {
                key: '30005',
                name: 'mentaGuardianMobile',
                value: data.mentaGuardianMobile
            },
            {
                key: '30006',
                name: 'mentaAreavillage',
                value: data.mentaAreavillage
            },
            {
                key: '30007',
                name: 'mentaAreavillageMobile',
                value: data.mentaAreavillageMobile
            },
            {
                key: '30008',
                name: 'mentaResidence',
                value: data.mentaResidence
            },
            {
                key: '30009',
                name: 'mentaEmploymentSituation',
                value: data.mentaEmploymentSituation
            },
            {
                key: '30010',
                name: 'mentaInformedAgree',
                value: data.mentaInformedAgree == 2 ? '1' : '0'
            },
            {
                key: '30011',
                name: 'mentaInformedSign',
                value: data.mentaInformedSign
            },
            {
                key: '30012',
                name: 'mentaInformedDate',
                value: data.mentaInformedDate ? new Date(data.mentaInformedDate).getFullYear():''
            },
            {
                key: '30013',
                name: 'mentaInformedDate',
                value: data.mentaInformedDate ? new Date(data.mentaInformedDate).getMonth() + 1:''
            },
            {
                key: '30014',
                name: 'mentaInformedDate',
                value: data.mentaInformedDate?new Date(data.mentaInformedDate).getDate():''
            },
            {
                key: '30015',
                name: 'mentaFirstDate',
                value: data.mentaFirstDate?new Date(data.mentaFirstDate).getFullYear():''
            },
            {
                key: '30016',
                name: 'mentaFirstDate',
                value: data.mentaFirstDate?new Date(data.mentaFirstDate).getMonth() + 1:''
            },
            {
                key: '30017',
                name: 'mentaFirstDate',
                value: data.mentaFirstDate?new Date(data.mentaFirstDate).getDate():''
            },
            {
                key:'30020',
                name:'mentaPastLock',
                value:data.mentaPastLock
            },
            {
                key:'30021',
                name:'mentaOutDepartment',
                value:data.mentaOutDepartment
            },
            {
                key:'30022',
                name:'mentaFirstDrug',
                value:data.mentaFirstDrug?new Date(data.mentaFirstDrug).getFullYear():''
            },
            {
                key:'30023',
                name:'mentaFirstDrug',
                value:data.mentaFirstDrug?new Date(data.mentaFirstDrug).getMonth()+1:''
            },
            {
                key:'30024',
                name:'mentaFirstDrug',
                value:data.mentaFirstDrug?new Date(data.mentaFirstDrug).getDate():''
            },
            {
                key:'30025',
                name:'mentaHospitalization',
                value:data.mentaHospitalization
            },
            {
                key:'30026',
                name:'mentaDiagnosisCurrent',
                value:data.mentaDiagnosisCurrent
            },
            {
                key:'30027',
                name:'mentaDiagnosisHospital',
                value:data.mentaDiagnosisHospital
            },
            {
                key:'30028',
                name:'mentaDiagnosisDate',
                value:formatDate(data.mentaDiagnosisDate,'-')
            },
            {
                key:'30029',
                name:'mentaRecentTreatment',
                value:data.mentaRecentTreatment
            },/*
            {
                key:'30030',
                name:'mentaDangerousAct',
                value:data.mentaDangerousAct
            },*/
            {
                key:'30031',
                name:'dangaMildTrouble',
                value:data.dangerousAct.dangaMildTrouble
            },
            {
                key:'30032',
                name:'dangaAccident',
                value:data.dangerousAct.dangaAccident
            },
            {
                key:'30033',
                name:'dangaZhaohuo',
                value:data.dangerousAct.dangaZhaohuo
            },
            {
                key:'30034',
                name:'dangaOtherHazards',
                value:data.dangerousAct.dangaOtherHazards
            },
            {
                key:'30035',
                name:'dangaSelfInjury',
                value:data.dangerousAct.dangaSelfInjury
            },
            {
                key: '30036',
                name: 'dangaAttemptedSuicide',
                value: data.dangerousAct.dangaAttemptedSuicide
            },
            {
                key:'30037',
                name:'mentaEconomicSituation',
                value:data.mentaEconomicSituation == 1 ? 1 : 2
            },
            {
                key:'30038',
                name:'mentaDoctorGuide',
                value:data.mentaDoctorGuide
            },
            {
                key:'30039',
                name:'mentaSignDate',
                value:data.createDate?new Date(data.createDate).getFullYear():''
            },
            {
                key:'30040',
                name:'mentaSignDate',
                value:data.createDate?new Date(data.createDate).getMonth()+1:''
            },
            {
                key:'30041',
                name:'mentaSignDate',
                value:data.createDate?new Date(data.createDate).getDate():''
            },
            {
                key:'30042',
                name:'mentaSignDoctor',
                value:data.mentaSignDoctor
            },
            {
                key:'30055',
                name:'mentNone',
                value:data.mentaDangerousAct == 0 ? '√': data.mentaDangerousAct == 2 ? '√' : ''
            }
        ];
        var bodySymptomsA = [],bodySymptomsB = [];
        var key = ['30043','30044','30045','30046','30047','30048','30049','30050','30051','30052','30053','30054'];
        for (var item in data.bodySymptoms) {
            var syname = data.bodySymptoms[item].symName;
            if (data.bodySymptoms[item].symType == 1) {
                var vals = '';
                switch(data.bodySymptoms[item].symName){
                    case 'sym_go_without':
                        vals = 9;
                        break;
                    case 'sym_hallucination':
                        vals = 1;
                        break;
                    case 'sym_from_laughing':
                        vals = 10;
                        break;
                    case 'sym_excited_words':
                        vals = 6;
                        break;
                    case 'sym_changing_moods':
                        vals = 4;
                        break;
                    case 'sym_bizarre_behavior':
                        vals = 5;
                        break;
                    case 'sym_unsociable_lazy':
                        vals = 11;
                        break;
                    case 'sym_communication_difficulties':
                        vals = 2;
                        break;
                    case 'sym_worldweary':
                        vals = 8;
                        break;
                    case 'sym_wounding_destruction':
                        vals = 7;
                        break;
                    case 'sym_suspicion':
                        vals = 3;
                        break;
                    case 'sym_other':
                        if(data.bodySymptoms[item].symDescribe){
                            vals = 12;
                        }else{
                            vals = '';
                        }
                        var ps = {
                            key:'30019',
                            name:'symDescribe',
                            value:data.bodySymptoms[item].symDescribe
                        };
                        dataArr.push(ps);
                        break;
                }
                bodySymptomsA.push({key:'',name:syname,value:vals});
            }else{
                bodySymptomsB.push({key:'',name:syname,value:' '});
            }
        }
        var bodySymptoms = bodySymptomsA.concat(bodySymptomsB);
        for(var i = 0;i<bodySymptoms.length;i++){
            bodySymptoms[i].key = key[i];
            console.log(bodySymptoms[i].value+'   '+bodySymptoms[i].key);
        }
        dataArr = bodySymptoms.concat(dataArr);
        return dataArr;
    };
    return formTemplate;
}));