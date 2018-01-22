import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    Checkbox
} from 'react-bootstrap';
import OperateForm from './Form';
import {HealthManagerModal, AddrModifyModal, ComfirmModifyModal, appendAddrModifyModal} from './Modal';
import Gird from '../../component/table/Table';
import PageNation from '../../component/pageNation/pageNation';
import http from '../../lib/Api/http';
import ApiMap from '../../lib/Api/ApiMap';
import {formatDateTime, common, confirm} from '../../lib/Util';
import './style.css';
import { fail } from 'assert';


class AddrAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            needModifyItem: {},
            isAllChecked: false,
            showHealthManagerModal: false,
            showAddrModifyModal: false,
            showComfirmModifyModal: false,
            total: 0,
            pageNum: 0,
            currentPage: 1,
            beginNum: 0,
            pageCount: 10,
            allHecadreList: [],
            queryHecadreList: [],
            hasResident: 0,
            tableData: [],
            
        };

        this.handleHealthManagerModal = this.handleHealthManagerModal.bind(this);
        this.handleAddrModifyModal = this.handleAddrModifyModal.bind(this);
        this.closeHealthManagerModal = this.closeHealthManagerModal.bind(this);
        this.closeAddrModifyModal = this.closeAddrModifyModal.bind(this);
        this.patchDelete = this.patchDelete.bind(this);
        this.handleComfirmModifyModal = this.handleComfirmModifyModal.bind(this);
        this.closeComfirmModifyModal = this.closeComfirmModifyModal.bind(this);
        this.handleTogglePage = this.handleTogglePage.bind(this);
        this.handleClickSearch = this.handleClickSearch.bind(this);
        this.getAddrList = this.getAddrList.bind(this);
    }

    componentWillMount() {
        const self = this;
        console.log(this.state);
        this.columns = [
            {
                className: 'my-col-class',
                title: '',
                dataIndex: 'prod_num',
                key: 'g',
                render: (text, record) => <Checkbox checked={record.isChecked} onChange={(e) => self.toggleIsChecked(e, record)} />
            }, {
              className: 'my-col-class',
              title: '辖区外地址',
              dataIndex: 'nongrid_address',
              key: 'a'
            }, {
              className: 'my-col-class',
              id: '123',
              title: '居民数量',
              dataIndex: 'resident_count',
              key: 'b',
            }, {
              className: 'my-col-class',
              title: '管辖者',
              dataIndex: 'nongrid_owner',
              key: 'c',
            }, {
                className: 'my-col-class',
                title: '创建者',
                dataIndex: 'nongrid_creator',
                key: 'd',
            }, {
                className: 'my-col-class',
                title: '创建时间',
                dataIndex: 'create_date',
                key: 'e',
            }, {
                className: 'my-col-class',
                title: '操作',
                dataIndex: 'prod_num',
                key: 'f',
                render: (text, record) => {
                    return (
                        <div>
                            <a onClick={e => this.handleAddrModifyModal(record)} href="javascript:;">修改地址</a>
                            {record.resident_count ? null : <a onClick={e => this.handleComfirmModifyModal(record)} href="javascript:;">删除</a>}
                        </div>
                    );
                }
            }
        ];

        this.getAddrList();
        this.getstationHecadreListbyperm();
    }
    componentDidMount() {}

    handleHealthManagerModal() {
        const checkedLen = this.state.tableData.filter(function(item){ return item.isChecked; }).length;
        console.log(checkedLen);
        if (checkedLen) {
            this.setState({
                showHealthManagerModal: true
            });
        } else {
            this.setState({
                showHealthManagerModal: false
            });
        }
    }
    closeHealthManagerModal() {
        this.setState({
            showHealthManagerModal: false
        });
    }

    handleAddrModifyModal(item){
        appendAddrModifyModal(item, this.getAddrList);
        this.setState({
            needModifyItem: item,
        });

        common.Util.data('parms', {
            detailId: item.detail_id
        });
    }
    closeAddrModifyModal(){
        this.setState({
            needModifyItem: {},
            showAddrModifyModal: false
        });
    }

    // 批量删除
    patchDelete() {
        const checkedLen = this.state.tableData.filter(function(item){ return item.isChecked; }).length;
        console.log(checkedLen);
        if (checkedLen) {
            this.setState({
                showComfirmModifyModal: true
            });
        } else {
            this.setState({
                showComfirmModifyModal: false
            });
        }
    }

    handleComfirmModifyModal(item){
        this.setState({
            showComfirmModifyModal: true
        });

        common.Util.data('parms', {
            detailId: item.detail_id
        });
    }

    closeComfirmModifyModal() {
        this.setState({
            showComfirmModifyModal: false
        });
    }

    // 切换是否选中
    toggleIsChecked(e, item) {
        this.state.tableData[item.key].isChecked = e.target.checked;
        this.setState({
            tableData: this.state.tableData
        }, () => {
            console.log(this.state);
        });
        this.checkAll();
    }

    // 切换是否全选
    toggleIsAllChecked(e) {
        //修改里面每个任务的状态
        this.state.tableData.forEach(function(item){
            item.isChecked = e.target.checked;
        });

        //修改isAllChecked里面的值
        this.setState({
            tableData: this.state.tableData,
            isAllChecked: e.target.checked
        }, () => {
            console.log(this.state);
        });
    }

    // 检查是否全选
    checkAll() {
        if (this.state.tableData.every(function(item){ return item.isChecked; })) {
            this.setState({
                isAllChecked: true
            });
        } else {
            this.setState({
                isAllChecked: false
            });
        }
    }

    // 获取地址列表
    getAddrList() {
        const {pageCount, beginNum, hasResident, queryHecadreList, total} = this.state;
        var parms = {
            ...ApiMap.commonData,
            hecadre_list: queryHecadreList,
            has_resident: parseInt(hasResident),
            begin: beginNum,
            count: pageCount,
        };
        
        if (hasResident == 0) {
            delete parms.has_resident;
        }

        http({
            url: ApiMap.stationNongridList.url,
            method: ApiMap.stationNongridList.method,
            data: parms
        })
        .then((res) => {
            if (res.data.ret_code === 1) {
                const resData = res.data.ret_data;
                this.setState({
                    pageNum: Math.ceil(resData.total / pageCount),
                    total: resData.total,
                    tableData: resData.nongrid_list.map(function (item, index) {
                        item.nongrid_owner = item.nongrid_owner.hecadre_name;
                        item.nongrid_creator = item.nongrid_creator.hecadre_name;
                        item.create_date = formatDateTime(item.create_date);
                        item.isChecked = false;
                        item.key = index;
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

    // 获取健管师列表
    getstationHecadreListbyperm() {
        // const {pageCount, currentPage, beginNum, hasResident, queryHecadreList} = this.state;
        const parms = {
            ...ApiMap.commonData,
        };

        http({
            url: ApiMap.stationHecadreListbyperm.url,
            method: ApiMap.stationHecadreListbyperm.method,
            data: parms
        })
        .then((res) => {
            if (res.data.ret_code === 1) {
                const resData = res.data.ret_data;
                this.setState({
                    allHecadreList: resData
                });
            } else {
                common.alert(res.data.ret_msg);
            }
        }, (error) => {
            common.alert(error);
        });
    }
    
    // 点击查询
    handleClickSearch() {
        this.setState({
            currentPage: 1,
        }, () => {
            this.setState({
                beginNum: (this.state.currentPage - 1) * this.state.pageCount
            }, () => {
                this.getAddrList();
            });
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
                this.getAddrList();
            });
        });
    }

    // 选取管辖者
    selectHecadre(h) {
        this.state.queryHecadreList.length = 0;
        if (h){
            this.state.queryHecadreList.push(parseInt(h));
        }
        this.setState({
            queryHecadreList: this.state.queryHecadreList
        }, () => {
            console.log(this.state);
        });
    }

    // 选取居民数量
    selectInhabitant(h) {
        this.setState({
            hasResident: h
        }, () => {
            console.log(this.state);
        });
    }

    render() {
        const {pageNum, currentPage, tableData, showHealthManagerModal, showAddrModifyModal, showComfirmModifyModal, allHecadreList, total, needModifyItem} = this.state;
        const columns = this.columns;
        return (
            <div className="wrap hospital">
                <div className="tb-head">辖区外地址管理</div>
                <div className="tb-content">
                    <div className="tb-wrap">
                        <div className="clearfix pdtb">
                            <OperateForm
                            selectHecadre={this.selectHecadre.bind(this)}
                            selectInhabitant={this.selectInhabitant.bind(this)}
                            allHecadreList={allHecadreList}
                            healthManagerModal={this.handleHealthManagerModal}
                            patchDelete={this.patchDelete}
                            handleClickSearch= {this.handleClickSearch} />
                        </div>
                        <div className="table-box">
                            <Checkbox className="all-checkbox" checked={this.state.isAllChecked} onChange={(e) => this.toggleIsAllChecked(e)} />
                            <Gird
                                rowClassName='my-row-class'
                                columns={columns}
                                data={tableData}
                            />
                        </div>
                        {tableData.length !== 0 ? <PageNation
                            pageCount={total}
                            pageNumber={pageNum}
                            currentPage={currentPage}
                            getPage={this.handleTogglePage}
                        /> : null}
                    </div>
                </div>
                <HealthManagerModal
                allHecadreList={allHecadreList}
                tableData={tableData}
                getAddrList={this.getAddrList}
                isShow={showHealthManagerModal}
                hide={this.closeHealthManagerModal} />
                {/* <AddrModifyModal
                needModifyItem={needModifyItem}
                getAddrList={this.getAddrList}
                isShow={showAddrModifyModal}
                hide={this.closeAddrModifyModal} /> */}
                <ComfirmModifyModal
                getAddrList={this.getAddrList}
                isShow={showComfirmModifyModal}
                hide={this.closeComfirmModifyModal} />
            </div>
        );
    }
}

ReactDOM.render(
    <AddrAdmin />,
    document.getElementById('__jurisdictionOutsideAddrAdmin/addrAdmin__')
);