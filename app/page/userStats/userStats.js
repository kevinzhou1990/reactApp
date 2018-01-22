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
import {setInitDate, getTimestamp, addDate, downloadExcel, toThousands} from '../../lib/Util';
import '../../lib/styles/index.css';


class UserStats extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
              className: 'my-col-class',
              title: '用户姓名',
              dataIndex: 'resident_name',
              key: 'a'
            }, {
              className: 'my-col-class',
              id: '123',
              title: '订单总额（元）',
              dataIndex: 'resident_sale',
              key: 'b',
            }, {
              className: 'my-col-class',
              title: '商品数量',
              dataIndex: 'resident_prod_num',
              key: 'c',
            }, {
                className: 'my-col-class',
                title: '购买次数',
                dataIndex: 'resident_order_num',
                key: 'd',
            }, {
                className: 'my-col-class',
                title: '操作',
                dataIndex: 'e',
                key: 'e',
                render: (text, record) => <a onClick={e => this.createTab(record.resident_uid, e)} href="javascript:;">详情</a>
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
            tableData: []
        };

        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.handleClickSearch = this.handleClickSearch.bind(this);
        this.handleClickExport = this.handleClickExport.bind(this);
        this.handleTogglePage = this.handleTogglePage.bind(this);


    }

    componentWillMount() {
        this.getShopInhabitantStat();
    }
    componentDidMount() {}

    // 获取居民统计
    getShopInhabitantStat() {
        const {startTime, endTime, pageCount, currentPage, beginNum} = this.state;
        const parms = {
            ...ApiMap.commonData,
            stat_start: getTimestamp(startTime),
            stat_end: getTimestamp(endTime) + 86400000,
            begin: beginNum,
            count: pageCount
        };

        http({
            url: ApiMap.getShopInhabitantStat.url,
            method: ApiMap.getShopInhabitantStat.method,
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
                    total: resData.total,
                    tableData: resData.prod_list.map(function (item, index) {
                        item.key = (currentPage - 1) * pageCount + index + 1;
                        item.resident_sale = toThousands(item.resident_sale, 2);
                        return item;
                    })
                });
            } else {
                common.alert(res.data.ret_msg);
            }
        }, (error) => {
            console.log(error);
        });

        console.log(this.state)
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
                    this.getShopInhabitantStat();
                });
            });
        }
    }

    // 导出居民统计
    handleClickExport() {
        const {startTime, endTime} = this.state;
        const parms = {
            ...ApiMap.commonData,
            stat_start: getTimestamp(startTime),
            stat_end: getTimestamp(endTime) + 86400000
        };
        http({
            url: ApiMap.shopInhabitantStat.url,
            method: ApiMap.shopInhabitantStat.method,
            data: parms,
            responseType: 'blob'
        })
        .then((res) => {
            downloadExcel(res.data, '居民统计');
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
                this.getShopInhabitantStat();
            });
        });
    }

    createTab(id, e) {
        console.log(id);

        common.createTab({
            uri: 'app/dist/userOrders/userOrders.html',
            data: {
                name: '用户订单'
            },
            key: 'userOrders',
        });
        
        common.Util.data('user', {
            residentUid: id
        });
    }

    render() {
        const {totalSale, totalProdNum, totalOrderNum, startTime, endTime, format, pageNum, currentPage, tableData, total} = this.state;
        const columns = this.columns;
        const start = startTime && moment(new Date(getTimestamp(startTime)));
        const end = endTime && moment(new Date(getTimestamp(endTime)));
        return (
            <div className="wrap hospital">
                <div className="tb-head">用户统计</div>
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
    <LocaleProvider locale={zh_CN}><UserStats /></LocaleProvider>,
    document.getElementById('__userStats/userStats__')
);