import React, {Component} from 'react';
import Gird from '../../component/table/Table';
import PageNation from '../../component/pageNation/pageNation';
import http from '../../lib/Api/http';
import ApiMap from '../../lib/Api/ApiMap';
import {sexTypeMap, ownerInsuredRelMap, insuredCredTypeMap, formatDateTime} from '../../lib/Util';
import {ComfirmDeleteModal} from './Modal';

class IRTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showComfirmDeleteModal: false
        };

        this.columns = [
            {
              className: 'my-col-class',
              title: '保单编号',
              dataIndex: 'policy_no',
              key: 'a'
            }, {
              className: 'my-col-class',
              title: '被保险人姓名',
              dataIndex: 'insured_name',
              key: 'b',
            }, {
              className: 'my-col-class',
              title: '被保险人联系电话',
              dataIndex: 'insured_phone',
              key: 'c',
            }, {
                className: 'my-col-class',
                title: '被保险人证件类型',
                dataIndex: 'insured_cred_type',
                key: 'd',
            }, {
                className: 'my-col-class',
                title: '被保险人证件号码',
                dataIndex: 'insured_cred_no',
                key: 'e',
            }, {
                className: 'my-col-class',
                title: '起始日期',
                dataIndex: 'policy_start',
                key: 'f',
            }, {
                className: 'my-col-class',
                title: '结束日期',
                dataIndex: 'policy_end',
                key: 'g',
            }, {
                className: 'my-col-class',
                title: '首保/续保',
                dataIndex: 'policy_type',
                key: 'h',
            }, {
                className: 'my-col-class',
                title: '操作',
                dataIndex: '',
                key: 'k',
                render: (text, record) => {
                    return (
                        <div>
                            <a onClick={e => this.createTab(record.policy_id, e)} href="javascript:;">详情</a>
                            <a onClick={e => this.handleComfirmDeleteModal(record.policy_id, e)} href="javascript:;">删除</a>
                        </div>
                    );
                }
            }
        ];

        this.handleComfirmDeleteModal = this.handleComfirmDeleteModal.bind(this);
        this.closeComfirmDeleteModal = this.closeComfirmDeleteModal.bind(this);
    }

    handleComfirmDeleteModal(id){
        this.setState({
            showComfirmDeleteModal: true
        });

        common.Util.data('insuranceRecord', {
            policyId: id
        });
    }
    closeComfirmDeleteModal() {
        this.setState({
            showComfirmDeleteModal: false
        });
    }

    createTab(id, e) {
        console.log(id);

        common.createTab({
            uri: 'app/dist/insuranceRecord/Details.html',
            data: {
                name: '投保详情'
            },
            key: 'insuranceRecord-Details',
        });
        
        common.Util.data('insuranceRecord', {
            policyId: id
        });
    }

    render() {
        const columns = this.columns;
        const {showComfirmDeleteModal} = this.state;
        const {total, pageNum, currentPage, tableData, handleTogglePage, getPolicyList} = this.props;
        return (
            <div>
                <Gird
                    rowClassName='my-row-class'
                    columns={columns}
                    data={tableData}
                />
                {tableData.length !== 0 ? <PageNation
                    pageCount={total}
                    pageNumber={pageNum}
                    currentPage={currentPage}
                    getPage={handleTogglePage}
                /> : null}
                <ComfirmDeleteModal
                    getPolicyList={getPolicyList}
                    isShow={showComfirmDeleteModal}
                    hide={this.closeComfirmDeleteModal} />
            </div>
        );
    }
}

export default IRTable;