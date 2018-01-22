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
    var formatDate = common.Util.formatDate;
    formTemplate.getFormData = function(data){
        var dataArr = [
            {
                key:'44000',
                name:'residentName',
                value:data.residentName
            },
            {
                key:'44001',
                name:'tcmSixDate',
                value:formatDate(data.tcmSixDate,'-')
            },
            {
                key:'44002',
                name:'tcmTwelveDate',
                value:formatDate(data.tcmTwelveDate,'-')
            },
            {
                key:'44003',
                name:'tcmEighteenDate',
                value:formatDate(data.tcmEighteenDate,'-')
            },
            {
                key:'44004',
                name:'tcmSixProposal1',
                value:data.tcmSixProposal1 == 1 ? '√' : ''
            },
            {
                key:'44005',
                name:'tcmSixProposal2',
                value:data.tcmSixProposal2 == 1 ? '√' : ''
            },
            {
                key:'44006',
                name:'tcmSixProposal3',
                value:data.tcmSixProposal3 == 1 ? '√' : ''
            },
            {
                key:'44007',
                name:'tcmSixProposalSec',
                value:data.tcmSixProposalSec == 1 ? '√' : ''
            },
            {
                key:'44008',
                name:'tcmSixProposal',
                value:data.tcmSixProposal
            },
            {
                key:'44009',
                name:'tcmTwelveProposal1',
                value:data.tcmTwelveProposal1== 1 ? '√' : ''
            },
            {
                key:'44010',
                name:'tcmTwelveProposal2',
                value:data.tcmTwelveProposal2== 1 ? '√' : ''
            },
            {
                key:'44011',
                name:'tcmTwelveProposal3',
                value:data.tcmTwelveProposal3== 1 ? '√' : ''
            },
            {
                key:'44012',
                name:'tcmTwelveProposalSec',
                value:data.tcmTwelveProposalSec== 1 ? '√' : ''
            },
            {
                key:'44013',
                name:'tcmTwelveProposal',
                value:data.tcmTwelveProposal
            },
            {
                key:'44014',
                name:'tcmEighteenProposal1',
                value:data.tcmEighteenProposal1== 1 ? '√' : ''
            },
            {
                key:'44015',
                name:'tcmEighteenProposal2',
                value:data.tcmEighteenProposal2== 1 ? '√' : ''
            },
            {
                key:'44016',
                name:'tcmEighteenProposal3',
                value:data.tcmEighteenProposal3== 1 ? '√' : ''
            },
            {
                key:'44017',
                name:'tcmEighteenProposalSec',
                value:data.tcmEighteenProposalSec== 1 ? '√' : ''
            },
            {
                key:'44018',
                name:'tcmEighteenProposal',
                value:data.tcmEighteenProposal
            },
            {
                key:'44019',
                name:'tcmSixNext',
                value:formatDate(data.tcmSixNext,'-')
            },
            {
                key:'44020',
                name:'tcmTwelveNext',
                value:formatDate(data.tcmTwelveNext,'-')
            },
            {
                key:'44021',
                name:'tcmEighteenNext',
                value:formatDate(data.tcmEighteenNext,'-')
            },
            {
                key:'44022',
                name:'tcmSixDoctor',
                value:data.tcmSixDoctor
            },
            {
                key:'44023',
                name:'tcmSixDoctor',
                value:data.tcmTwelveDoctor
            },
            {
                key:'44024',
                name:'tcmEighteenDoctor',
                value:data.tcmEighteenDoctor
            }
        ];
        return dataArr;
    };
    return formTemplate;
}));