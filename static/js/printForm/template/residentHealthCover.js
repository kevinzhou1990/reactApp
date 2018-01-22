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
                key:'28001',
                name:'resdientName',
                value:data.resdientName
            },
            {
                key:'28002',
                name:'residentAddress',
                value:data.residentAddress
            },
            {
                key:'28003',
                name:'residentHouseholdAddr',
                value:data.residentHouseholdAddr
            },
            {
                key:'28004',
                name:'residentMobile',
                value:data.residentMobile
            },
            {
                key:'28005',
                name:'streetName',
                value:data.streetName
            },
            {
                key:'28006',
                name:'villageName',
                value:data.villageName
            },
            {
                key:'28007',
                name:'docUnit',
                value:data.docUnit
            },
            {
                key:'28008',
                name:'docCreateBy',
                value:data.docCreateBy
            },
            {
                key:'28009',
                name:'docDoctor',
                value:data.docDoctor
            },
            {
                key:'28010',
                name:'docCreateDate',
                value:new Date(data.docCreateDate).getFullYear()
            },
            {
                key:'28011',
                name:'docCreateDate',
                value:new Date(data.docCreateDate).getMonth()+1
            },
            {
                key:'28012',
                name:'docCreateDate',
                value:new Date(data.docCreateDate).getDate()
            }
        ];
        return dataArr;
    };
    return formTemplate;
}));