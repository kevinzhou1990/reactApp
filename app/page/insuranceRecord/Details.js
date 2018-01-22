import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Gird from '../../component/table/Table';
import http from '../../lib/Api/http';
import ApiMap from '../../lib/Api/ApiMap';
import {sexTypeMap, policyTypeMap, ownerInsuredRelMap, insuredCredTypeMap, formatDateTime} from '../../lib/Util';

class IRDetails extends Component {
    constructor(props) {
        super(props);

        this.columns = {
            policy: [
                {
                    className: 'my-col-class',
                    title: '保单编号',
                    dataIndex: 'policy_no',
                    key: 'a'
                }, {
                    className: 'my-col-class',
                    title: '起始日期',
                    dataIndex: 'policy_start',
                    key: 'b'
                }, {
                    className: 'my-col-class',
                    title: '结束日期',
                    dataIndex: 'policy_end',
                    key: 'c'
                }, {
                    className: 'my-col-class',
                    title: '首保/续保',
                    dataIndex: 'policy_type',
                    key: 'd'
                }, {
                    className: 'my-col-class',
                    title: '出单人员',
                    dataIndex: 'insurer_name',
                    key: 'e'
                }, {
                    className: 'my-col-class',
                    title: '所属站点',
                    dataIndex: 'station_name',
                    key: 'f'
                }, {
                    className: 'my-col-class',
                    title: '备注',
                    dataIndex: 'policy_comment',
                    key: 'g'
                }
            ],
            insured: [
                {
                    className: 'my-col-class',
                    title: '被保险人姓名',
                    dataIndex: 'insured_name',
                    key: 'a'
                }, {
                    className: 'my-col-class',
                    title: '被保险人性别',
                    dataIndex: 'insured_sex',
                    key: 'b'
                }, {
                    className: 'my-col-class',
                    title: '被保险人证件类型',
                    dataIndex: 'insured_cred_type',
                    key: 'c'
                }, {
                    className: 'my-col-class',
                    title: '被保险人证件号码',
                    dataIndex: 'insured_cred_no',
                    key: 'd'
                }, {
                    className: 'my-col-class',
                    title: '被保险人出生年月',
                    dataIndex: 'insured_birth',
                    key: 'e'
                }, {
                    className: 'my-col-class',
                    title: '被保险人联系电话',
                    dataIndex: 'insured_phone',
                    key: 'f'
                }
            ],
            owner: [
                {
                    className: 'my-col-class',
                    title: '投保人姓名',
                    dataIndex: 'owner_name',
                    key: 'a'
                }, {
                    className: 'my-col-class',
                    title: '投保人联系电话',
                    dataIndex: 'owner_phone',
                    key: 'b'
                }, {
                    className: 'my-col-class',
                    title: '投保人与被保险人关系',
                    dataIndex: 'owner_insured_rel',
                    key: 'c'
                }
            ]
        };

        this.state = {
            policyId: '',
            policyData: [],
            insuredData: [],
            ownerData: []
        };

        this.getPolicyDetails = this.getPolicyDetails.bind(this);
    }

    componentWillMount() {
        console.log(common.Util.data('insuranceRecord'));
        this.setState({
            policyId: common.Util.data('insuranceRecord').policyId
        }, () => {
            console.log(this.state);
            this.getPolicyDetails();
        });
    }


    // 获取保单详情
    getPolicyDetails() {
        const {policyId} = this.state;
        const parms = {
            ...ApiMap.commonData,
            policy_id: policyId
        };

        http({
            url: ApiMap.getPolicyDetails.url,
            method: ApiMap.getPolicyDetails.method,
            data: parms
        })
        .then((res) => {
            if (res.data.ret_code === 1) {
                const resData = res.data.ret_data;
                console.log(resData);
                this.setState({
                    policyData: [{
                        policy_no: resData.policy_no,
                        policy_start: formatDateTime(resData.policy_start, false),
                        policy_end: formatDateTime(resData.policy_end, false),
                        policy_type: policyTypeMap[resData.policy_type],
                        insurer_name: resData.insurer_name,
                        station_name: resData.station_name,
                        policy_comment: resData.policy_comment,
                        key: 1
                    }],
                    insuredData: [{
                        insured_name: resData.insured_name,
                        insured_sex: sexTypeMap[resData.insured_sex],
                        insured_cred_type: insuredCredTypeMap[resData.insured_cred_type],
                        insured_cred_no: resData.insured_cred_no,
                        insured_birth: formatDateTime(resData.insured_birth, false),
                        insured_phone: resData.insured_phone,
                        key: 1
                    }],
                    ownerData: [{
                        owner_name: resData.owner_name,
                        owner_phone: resData.owner_phone,
                        owner_insured_rel: ownerInsuredRelMap[resData.owner_insured_rel],
                        key: 1
                    }]
                });
            } else {
                common.alert(res.data.ret_msg);
            }
        }, (error) => {
            common.alert(error);
        });
    }

    render() {
        const {policyData, insuredData, ownerData} = this.state;
        const columns = this.columns;
        return (
            <div className="wrap hospital">
                <div className="tb-head">投保详情</div>
                <div className="tb-content">
                    <div className="tb-wrap">
                        <div>
                            <h3 className="ir-title">保单信息</h3>
                            <Gird
                                rowClassName='my-row-class'
                                columns={columns.policy}
                                data={policyData}
                            />
                        </div>
                        <div>
                            <h3 className="ir-title">被保险人信息</h3>
                            <Gird
                                rowClassName='my-row-class'
                                columns={columns.insured}
                                data={insuredData}
                            />
                        </div>
                        <div>
                            <h3 className="ir-title">投保人信息</h3>
                            <Gird
                                rowClassName='my-row-class'
                                columns={columns.owner}
                                data={ownerData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <IRDetails />,
    document.getElementById('__insuranceRecord/Details__')
);