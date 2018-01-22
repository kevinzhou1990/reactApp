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
import {setInitDate, getTimestamp, formatDateTime, addDate, orderStatus, downloadExcel, converson, getElementByAttr, toThousands, payType} from '../../lib/Util';
import '../../lib/styles/index.css';
import { Modal } from 'react-bootstrap';


class JGSSalesStats extends Component {
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
              id: '123',
              title: '订单时间',
              dataIndex: 'create_date',
              key: 'b',
            }, {
              className: 'my-col-class',
              title: '实付金额（元）',
              dataIndex: 'pay_amount',
              key: 'c',
            }, {
                className: 'my-col-class',
                title: '支付方式',
                dataIndex: 'pay_type',
                key: 'd',
            }, {
                className: 'my-col-class',
                title: '商品数量',
                dataIndex: 'prod_num',
                key: 'e',
            }, {
                className: 'my-col-class',
                title: '收货人',
                dataIndex: 'receipt_name',
                key: 'f',
            }, {
                className: 'my-col-class',
                title: '联系电话',
                dataIndex: 'receipt_contact',
                key: 'g',
            }, {
              className: 'my-col-class',
              title: '地址',
              dataIndex: 'receipt_address',
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
            showModal: false,
            details: {
                "prod_list": []
            },
            tableData: []
        };

        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.handleClickSearch = this.handleClickSearch.bind(this);
        this.handleClickExport = this.handleClickExport.bind(this);
        this.handleTogglePage = this.handleTogglePage.bind(this);
        this.close = this.close.bind(this);
    }

    componentWillMount() {
        console.log(common.Util.data('parms'));
        
        this.setState({
            hecadreUid: common.Util.data('parms').hecadreUid,
            orgId: common.Util.data('parms').orgId
        }, () => {
            console.log(this.state);
            this.getShopHecadreSaleStat();
        });
    }
    componentDidMount() {
        const aEle = document.getElementById('tab-li-__jgssalesStats__').getElementsByClassName('tab-i-close js-tab-close');
        function cleanParms() {
            common.Util.data('parms', {});
        }
        for (let i = 0; i < aEle.length; i++){
            aEle[i].addEventListener("click", cleanParms, false);
        }
    }

    // 获取健管师销售统计
    getShopHecadreSaleStat() {
        const {startTime, endTime, pageCount, currentPage, beginNum, hecadreUid, orgId} = this.state;
        const parms = {
            ...ApiMap.commonData,
            hecadre_uid: hecadreUid,
            org_id: orgId,
            stat_start: getTimestamp(startTime),
            stat_end: getTimestamp(endTime) + 86400000,
            begin: beginNum,
            count: pageCount
        };

        http({
            url: ApiMap.getShopHecadreSaleStat.url,
            method: ApiMap.getShopHecadreSaleStat.method,
            data: parms
        })
        .then((res) => {
            if (res.data.ret_code === 1) {
                const resData = res.data.ret_data;
                this.setState({
                    pageNum: Math.ceil(resData.total / pageCount),
                    totalSale: toThousands(resData.total_sale, 2),
                    totalProdNum: resData.total_prod_num,
                    totalOrderNum: resData.total_order_num,
                    total: resData.total,
                    tableData: resData.order_list.map(function (item, index) {
                        item.key = (currentPage - 1) * pageCount + index + 1;
                        item.create_date = formatDateTime(item.create_date);
                        item.pay_amount = toThousands(item.pay_amount, 2);
                        item.pay_type = payType(item.pay_type);
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
                    this.getShopHecadreSaleStat();
                });
            });
        }
    }

    // 导出健管师销售统计
    handleClickExport() {
        const {startTime, endTime, hecadreUid, orgId} = this.state;
        const parms = {
            ...ApiMap.commonData,
            hecadre_uid: hecadreUid,
            org_id: orgId,
            stat_start: getTimestamp(startTime),
            stat_end: getTimestamp(endTime) + 86400000
        };
        http({
            url: ApiMap.shopHecadreSaleStatExport.url,
            method: ApiMap.shopHecadreSaleStatExport.method,
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
                this.getShopHecadreSaleStat();
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
        // console.log(Math.random(), num);
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
                common.alert(res.ret_msg);
            }
        }, (error) => {
            common.alert(error);
        });
    }

    render() {
        const {totalSale, totalProdNum, totalOrderNum, startTime, endTime, format, pageNum, currentPage, tableData, showModal, details, total} = this.state;
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
                                <div className="col-sm-3 control-label">收货人:</div>
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
                                                <img className="pull-left" src={converson(item.prod_imgs[0])} />
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
        )
    }
}

ReactDOM.render(
    <LocaleProvider locale={zh_CN}><JGSSalesStats /></LocaleProvider>,
    document.getElementById('__jgssalesStats/jgssalesStats__')
);