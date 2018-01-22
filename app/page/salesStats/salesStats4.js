import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {DatePicker} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import SalesData from '../../component/salesData';
import Gird from '../../component/table/Table';
import PageNation from '../../component/pageNation/pageNation';
// import DatePicker from "react-bootstrap-date-picker";
import http from '../../lib/Api/http';
import ApiMap from '../../lib/Api/ApiMap';
import {setInitDate, getTimestamp, addDate, downloadExcel, createTab, closeTab, getElementByAttr, toThousands} from '../../lib/Util';
import '../../lib/styles/index.css';

class SalesStats extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
              className: 'my-col-class',
              title: '名称',
              dataIndex: 'stat_name',
              key: 'a',
              render: (text, record) => {
                return (
                    <div>
                        {record.stat_at_job === 2
                        ? <span className="stat-name">{record.stat_name}<span className="job-state" href="javascript:;">已离职</span></span>
                        : record.stat_name}
                    </div>
                );
              }
            }, {
              className: 'my-col-class',
              id: '123',
              title: '订单金额(元)',
              dataIndex: 'stat_sale',
              key: 'b',
            }, {
              className: 'my-col-class',
              title: '商品数量',
              dataIndex: 'stat_prod_num',
              key: 'c',
            }, {
                className: 'my-col-class',
                title: '购买人次',
                dataIndex: 'stat_order_num',
                key: 'd',
            }, {
                className: 'my-col-class',
                title: '操作',
                dataIndex: 'e',
                key: 'e',
                render: (text, record) => <a onClick={e => this.createTab(record.stat_id, e)} href="javascript:;">详情</a>
            }
        ];
        this.state = {
            totalSale: 0,
            totalProdNum: 0,
            totalOrderNum: 0,
            total: 0,
            pageNum: 0,
            pageCount: 10,
            currentPage: 1,
            beginNum: 0,
            startTime: setInitDate().startTime,
            endTime: setInitDate().endTime,
            format: "YYYY-MM-DD",
            orgId: 0,
            tableData: []
        };

        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.handleClickSearch = this.handleClickSearch.bind(this);
        this.handleClickExport = this.handleClickExport.bind(this);
        this.handleTogglePage = this.handleTogglePage.bind(this);
    }

    componentWillMount() {
        console.log(common.Util.data('parms'))


        if (!common.Util.data('parms') || !common.Util.data('parms').orgId) {
            this.setState({
                orgId: 0
            }, () => {
                this.getShopSaleStat();
            });
        } else {
            this.setState({
                orgId: common.Util.data('parms').orgId
            }, () => {
                this.getShopSaleStat();
            });
        }
    }

    componentDidMount() {
        const aEle = document.getElementById('tab-li-__salesStats-salesStats__').getElementsByClassName('tab-i-close js-tab-close');
        function cleanParms() {
            common.Util.data('parms', {
                orgId: 0
            });
        }
        for (let i = 0; i < aEle.length; i++){
            aEle[i].addEventListener("click", cleanParms, false);
        }
    }

    // 获取销售统计
    getShopSaleStat() {
        const {startTime, endTime, pageCount, currentPage, orgId, beginNum} = this.state;
        const parms = {
            ...ApiMap.commonData,
            org_id: orgId,
            stat_start: getTimestamp(startTime),
            stat_end: getTimestamp(endTime) + 86400000,
            begin: beginNum,
            count: pageCount
        };
        if (orgId === 0) {
            delete parms.org_id;
        }

        http({
            url: ApiMap.getShopSaleStat.url,
            method: ApiMap.getShopSaleStat.method,
            data: parms
        })
        .then((res) => {
            if (res.data.ret_code === 1) {
                const resData = res.data.ret_data;
                console.log(resData);
                this.setState({
                    pageNum: Math.ceil(resData.total / pageCount),
                    totalSale: toThousands(resData.total_sale, 2),
                    totalProdNum: resData.total_prod_num,
                    totalOrderNum: resData.total_order_num,
                    orgId: resData.org_id,
                    total: resData.total,
                    tableData: resData.stat_list.map(function (item, index) {
                        item.key = (currentPage - 1) * pageCount + index + 1;
                        item.stat_sale = toThousands(item.stat_sale, 2);
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

    handleStartTimeChange(value, formattedValue) {
        this.setState({
            startTime: formattedValue
        });
    }
    handleEndTimeChange(value, formattedValue) {
        this.setState({
            endTime: formattedValue
        });
    }

    handleClickSearch() {
        const {startTime, endTime} = this.state;
        if (getTimestamp(startTime) > getTimestamp(endTime)) {
            common.alert('开始时间不能晚于结束时间');
            return;
        } else {
            this.setState({
                currentPage: 1,
            }, () => {
                this.setState({
                    beginNum: (this.state.currentPage - 1) * this.state.pageCount
                }, () => {
                    this.getShopSaleStat();
                });
            });
        }
    }

    // 导出销售统计
    handleClickExport() {
        const {startTime, endTime, orgId} = this.state;
        const parms = {
            ...ApiMap.commonData,
            org_id: orgId,
            stat_start: getTimestamp(startTime),
            stat_end: getTimestamp(endTime) + 86400000
        };
        if (orgId === 0) {
            delete parms.org_id;
        }
        http({
            url: ApiMap.shopSaleStatExport.url,
            method: ApiMap.shopSaleStatExport.method,
            data: parms,
            responseType: 'blob'
        })
        .then((res) => {
            downloadExcel(res.data, '销售统计');
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
                this.getShopSaleStat();
            });
        });
    }

    createTab(id, e) {
        common.createTab({
            uri: 'app/dist/jgssalesStats/jgssalesStats.html',
            data: {
                name: '销售统计-健管师'
            },
            key: 'jgssalesStats',
        });
        common.Util.data('parms', {
            orgId: (common.Util.data('parms') === undefined || common.Util.data('parms').orgId === undefined) ? this.state.orgId : common.Util.data('parms').orgId,
            hecadreUid: id
        });
    }

    render() {
        const {totalSale, totalProdNum, totalOrderNum, startTime, endTime, format, inputFormat, mode, pageNum, currentPage, tableData, total} = this.state;
        const columns = this.columns;
        const start = startTime && moment(new Date(getTimestamp(startTime)));
        const end = endTime && moment(new Date(getTimestamp(endTime)));
        return (
            <div className="wrap hospital">
                <div className="tb-head">销售统计</div>
                <div className="tb-content">
                    <div className="tb-wrap">
                        <div className="clearfix pdtb">
                            <div className="pull-left">
                                <div className="date-wrap">
                                    <DatePicker
                                        value={start}
                                        dateFormat={format}
                                        onChange={this.handleStartTimeChange}
                                    />
                                </div>
                                &nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;
                                <div className="date-wrap">
                                    <DatePicker
                                        value={end}
                                        dateFormat={format}
                                        onChange={this.handleEndTimeChange}
                                    />
                                </div>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button type="button" className="btn btn-main" id="js-search" onClick={this.handleClickSearch}>查询</button>
                            </div>
                            <div className="pull-right">
                                <button type="button" className="btn btn-main" id="btn-export" onClick={this.handleClickExport}>导出</button>
                            </div>
                        </div>
                        <SalesData
                            totalAmount={totalSale}
                            totalGoods={totalProdNum}
                            totalPerson={totalOrderNum}
                        />
                        <Gird
                            rowClassName='my-row-class'
                            columns={columns}
                            data={tableData}
                        />
                        {tableData.length !== 0 ? <PageNation
                            pageCount={total}
                            pageNumber={pageNum}
                            currentPage={currentPage}
                            getPage={this.handleTogglePage}
                        /> : null}
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <LocaleProvider locale={zh_CN}><SalesStats /></LocaleProvider>,
    document.getElementById('__salesStats/salesStats4__')
);