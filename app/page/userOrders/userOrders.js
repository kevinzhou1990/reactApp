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
import {setInitDate, getTimestamp, addDate, orderStatus, payType, downloadExcel, formatDateTime, converson, toThousands} from '../../lib/Util';
import '../../lib/styles/index.css';
import { Modal } from 'react-bootstrap';


class UserOrders extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
              className: 'my-col-class',
              title: '订单编号',
              dataIndex: 'order_no',
              key: 'a'
            }, {
              className: 'my-col-class',
              title: '订单时间',
              dataIndex: 'create_date',
              key: 'b',
            }, {
              className: 'my-col-class',
              title: '订单金额（元）',
              dataIndex: 'order_amount',
              key: 'c',
            }, {
                className: 'my-col-class',
                title: '支付方式',
                dataIndex: 'pay_type',
                key: 'd',
            }, {
                className: 'my-col-class',
                title: '实付金额（元）',
                dataIndex: 'pay_amount',
                key: 'e',
            }, {
                className: 'my-col-class',
                title: '商品数量',
                dataIndex: 'prod_num',
                key: 'f',
            }, {
              className: 'my-col-class',
              title: '推荐人',
              dataIndex: 'create_hecadre',
              key: 'g'
            }, {
                className: 'my-col-class',
                title: '送货人',
                dataIndex: 'ship_hecadre',
                key: 'h'
            }, {
                className: 'my-col-class',
                title: '操作',
                dataIndex: 'oper',
                key: 'i',
                render: (text, record) => <a onClick={e => this.viewDetails(record.order_id, e)} href="javascript:;">详情</a>,
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
            residentUid: "",
            orderNo: "",
            showModal: false,
            details: {
                "prod_list": []
            },
            tableData: []
        };

        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.handleChangeOrderNo = this.handleChangeOrderNo.bind(this);
        this.handleClickExport = this.handleClickExport.bind(this);
        this.handleClickSearch = this.handleClickSearch.bind(this);
        this.handleTogglePage = this.handleTogglePage.bind(this);
        this.close = this.close.bind(this);
    }

    componentWillMount() {
        console.log(common.Util.data('user'));
        this.setState({
            residentUid: common.Util.data('user').residentUid
        }, () => {
            console.log(this.state);
            this.getShopInhabitantOrderList();
        });
    }
    componentDidMount() {}

    // 获取居民订单列表
    getShopInhabitantOrderList() {
        const {startTime, endTime, pageCount, currentPage, beginNum, orderNo, residentUid} = this.state;
        const parms = {
            ...ApiMap.commonData,
            resident_uid: residentUid,
            order_no: orderNo,
            create_start: getTimestamp(startTime),
            create_end: getTimestamp(endTime) + 86400000,
            begin: beginNum,
            count: pageCount,
        };

        http({
            url: ApiMap.getShopInhabitantOrderList.url,
            method: ApiMap.getShopInhabitantOrderList.method,
            data: parms
        })
        .then((res) => {
            if (res.data.ret_code === 1) {
                const resData = res.data.ret_data;
                this.setState({
                    pageNum: Math.ceil(resData.total / pageCount),
                    total: resData.total,
                    tableData: resData.order_list.map(function (item, index) {
                        item.key = (currentPage - 1) * pageCount + index + 1;
                        item.create_date = formatDateTime(item.create_date);
                        item.pay_type = payType(item.pay_type);
                        item.order_amount = toThousands(item.order_amount, 2);
                        item.pay_amount = toThousands(item.pay_amount, 2);
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

    handleChangeOrderNo(ev) {
        this.setState({
            orderNo: ev.target.value
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
                    this.getShopInhabitantOrderList();
                });
            });
        }
    }

    // 导出居民订单列表
    handleClickExport() {
        const {startTime, endTime, orderNo, residentUid} = this.state;
        const parms = {
            ...ApiMap.commonData,
            resident_uid: residentUid,
            order_no: orderNo,
            create_start: getTimestamp(startTime),
            create_end: getTimestamp(endTime) + 86400000
        };
        http({
            url: ApiMap.shopInhabitantOrderExport.url,
            method: ApiMap.shopInhabitantOrderExport.method,
            data: parms,
            responseType: 'blob'
        })
        .then((res) => {
            downloadExcel(res.data, '居民订单列表');
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
                this.getShopInhabitantOrderList();
            });
        });
    }

    close() {
        this.setState({
            showModal: false
        });
    }

    // 查看详情
    viewDetails(num, e) {
        //console.log(Math.random(), num);
        const parms = {
            ...ApiMap.commonData,
            order_id: num
        };

        http({
            url: ApiMap.getShopOrder.url,
            method: ApiMap.getShopOrder.method,
            data: parms
        })
        .then((res) => {
            if (res.data.ret_code === 1) {
                const resData = res.data.ret_data;
                this.setState({
                    showModal: true,
                    details: resData
                });
            } else {
                common.alert(res.data.ret_msg);
            }
        }, (error) => {
            console.log(error);
        });
    }

    render() {
        const {startTime, endTime, format, pageNum, currentPage, tableData, showModal, details, orderNo, total} = this.state;
        const columns = this.columns;
        const start = startTime && moment(new Date(getTimestamp(startTime)));
        const end = endTime && moment(new Date(getTimestamp(endTime)));
        return (
            <div className="wrap hospital">
                <div className="tb-head">用户订单</div>
                <div className="tb-content">
                    <div className="tb-wrap">
                        <div className="clearfix pdtb">
                            <div className="pull-left">
                                <div className="clearfix" style={{display: 'inline-block', verticalAlign: 'middle', height: '34px', marginRight: '20px'}}>
                                    <label className="pull-left" style={{lineHeight: '34px', marginRight: '6px'}}>订单编号</label>
                                    <input type="text" className="form-control pull-left" style={{width: '180px'}} value={orderNo} onChange={this.handleChangeOrderNo} />
                                </div>
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
                <Modal show={showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>详情</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{paddingBottom: '20px'}}>
                            <div className="clearfix" style={{padding: '15px', borderBottom: '1px solid #e5e5e5'}}>
                                <div className="pull-left">
                                    <h5 style={{margin: 0, paddingTop: '10px', fontSize: '16px'}}>基本信息</h5>
                                </div>
                                <div className="pull-right" style={{verticalAlign: 'middle'}}>
                                    <span className="btn-state">{orderStatus(details.order_status)}</span>
                                </div>
                            </div>
                            <div className="details-form-group clearfix">
                                <div className="col-sm-3 control-label">订单编号:</div>
                                <div className="col-sm-7">{details.order_no}</div>
                            </div>
                            <div className="details-form-group clearfix">
                                <div className="col-sm-3 control-label">订单时间:</div>
                                <div className="col-sm-7">{formatDateTime(details.create_date)}</div>
                            </div>
                            <div className="details-form-group clearfix">
                                <div className="col-sm-3 control-label">订单金额（元）:</div>
                                <div className="col-sm-7">{details.order_amount}</div>
                            </div>
                            <div className="details-form-group clearfix">
                                <div className="col-sm-3 control-label">支付方式:</div>
                                <div className="col-sm-7">{payType(details.pay_type)}</div>
                            </div>
                            <div className="details-form-group clearfix">
                                <div className="col-sm-3 control-label">商品数量:</div>
                                <div className="col-sm-7">{details.prod_num}</div>
                            </div>
                            <div className="details-form-group clearfix">
                                <div className="col-sm-3 control-label">用户姓名:</div>
                                <div className="col-sm-7">{details.receipt_name}</div>
                            </div>
                            <div className="details-form-group clearfix">
                                <div className="col-sm-3 control-label">联系电话:</div>
                                <div className="col-sm-7">{details.receipt_contact}</div>
                            </div>
                            <div className="details-form-group clearfix">
                                <div className="col-sm-3 control-label">地址:</div>
                                <div className="col-sm-7">{details.receipt_address}</div>
                            </div>
                            <div className="details-form-group clearfix">
                                <div className="col-sm-3 control-label">推荐人:</div>
                                <div className="col-sm-7">{details.create_hecadre}</div>
                            </div>
                            <div className="details-form-group clearfix">
                                <div className="col-sm-3 control-label">送货人:</div>
                                <div className="col-sm-7">{details.ship_hecadre}</div>
                            </div>
                            <div style={{padding: '15px', borderBottom: '1px solid #e5e5e5'}}>
                                <h5 style={{margin: 0, paddingTop: '10px', fontSize: '16px'}}>订单商品</h5>
                            </div>
                            <div>
                                <div className="list-title clearfix">
                                    <span>商品名称</span>
                                    <span>商品数量</span>
                                    <span>商品金额</span>
                                </div>
                                <ul className="prod-list">
                                    {
                                        details.prod_list.map((item) => <li key={item.prod_id} className="clearfix">
                                            <div className="prod-col tal clearfix">
                                                <img className="pull-left" src={item.prod_imgs.length !== 0 ? converson(item.prod_imgs[0]) : ''} />
                                                <div className="pull-left">
                                                    <p title={item.prod_name}>{item.prod_name}</p>
                                                    <span>￥ {toThousands(item.prod_price, 2)}</span>
                                                </div>
                                            </div>
                                            <div className="prod-col lh60">× {item.prod_num}</div>
                                            <div className="prod-col lh60">￥ {toThousands(item.prod_num * item.prod_price, 2)}</div>
                                        </li>)
                                    }
                                </ul>
                                <div className="list-total clearfix">
                                    <span>合计 ￥{toThousands(details.order_amount, 2)}</span>
                                    <span>共{details.prod_num}件商品</span>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </Modal>
            </div>
        );
    }
}

ReactDOM.render(
    <LocaleProvider locale={zh_CN}><UserOrders /></LocaleProvider>,
    document.getElementById('__userOrders/userOrders__')
);