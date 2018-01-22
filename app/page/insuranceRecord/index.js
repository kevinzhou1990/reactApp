import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';
import Form from './Form';
import http from '../../lib/Api/http';
import ApiMap from '../../lib/Api/ApiMap';
import {sexTypeMap, ownerInsuredRelMap, insuredCredTypeMap, formatDateTime, policyTypeMap} from '../../lib/Util';

class InsuranceRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            pageNum: 0,
            currentPage: 1,
            beginNum: 0,
            pageCount: 10,
            policyNo: '',
            insuredName: '',
            insuredCredNo: '',
            ownerName: '',
            tableData: []
        };

        this.getPolicyList = this.getPolicyList.bind(this);
        this.handleTogglePage = this.handleTogglePage.bind(this);
        this.clickSearchReset = this.clickSearchReset.bind(this);
        this.handleChangeInputValue = this.handleChangeInputValue.bind(this);
    }

    componentWillMount() {
        this.getPolicyList();
    }

    getPolicyList() {
        const {pageCount, currentPage, beginNum, policyNo, insuredName, insuredCredNo, ownerName} = this.state;
        const parms = {
            ...ApiMap.commonData,
            policy_no: policyNo,
            insured_name: insuredName,
            insured_cred_no: insuredCredNo,
            owner_name: ownerName,
            begin: beginNum,
            count: pageCount,
        };

        if (!policyNo) delete parms.policy_no;
        if (!insuredName) delete parms.insured_name;
        if (!insuredCredNo) delete parms.insured_cred_no;
        if (!ownerName) delete parms.owner_name;

        http({
            url: ApiMap.getPolicyList.url,
            method: ApiMap.getPolicyList.method,
            data: parms
        })
        .then((res) => {
            if (res.data.ret_code === 1) {
                const resData = res.data.ret_data;
                console.log(resData);
                this.setState({
                    pageNum: Math.ceil(resData.total / pageCount),
                    total: resData.total,
                    tableData: resData.policy_list.map(function (item, index) {
                        item.key = (currentPage - 1) * pageCount + index + 1;
                        item.insured_cred_type = insuredCredTypeMap[item.insured_cred_type];
                        item.policy_start = formatDateTime(item.policy_start, false);
                        item.policy_end = formatDateTime(item.policy_end, false);
                        item.policy_type = policyTypeMap[item.policy_type];
                        return item;
                    })
                });
            } else {
                common.alert(res.data.ret_msg);
            }
        }, (error) => {
            common.alert(error);
        });
    }

    handleTogglePage(ev) {
        console.log(this.state.currentPage);
        console.log(ev);
        this.setState({
            currentPage: ev.currentPage,
        }, () => {
            this.setState({
                beginNum: (this.state.currentPage - 1) * this.state.pageCount
            }, () => {
                this.getPolicyList();
            });
        });
    }

    clickSearchReset() {
        this.setState({
            currentPage: 1,
            beginNum: 0
        });
    }

    handleChangeInputValue(key, value) {
        this.setState({
            [key]: value
        }, () => {
            console.log(this.state);
        });
    }

    render() {
        const {total, pageNum, currentPage, tableData, policyNo, insuredName, insuredCredNo, ownerName} = this.state;
        return (
            <div className="wrap hospital">
                <div className="tb-head">投保记录</div>
                <div className="tb-content">
                    <div className="tb-wrap">
                        <Form
                            policyNo={policyNo}
                            insuredName={insuredName}
                            insuredCredNo={insuredCredNo}
                            ownerName={ownerName}
                            clickSearchReset={this.clickSearchReset}
                            getPolicyList={this.getPolicyList}
                            handleChangeInputValue={this.handleChangeInputValue} />
                        <Table
                            total={total}
                            pageNum={pageNum}
                            currentPage={currentPage}
                            tableData={tableData}
                            getPolicyList={this.getPolicyList}
                            handleTogglePage={this.handleTogglePage} />
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <InsuranceRecord />,
    document.getElementById('__insuranceRecord/index__')
);

