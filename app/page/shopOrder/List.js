import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
// import _ from 'lodash';
import Gird from '../../component/table/Table';
import Container from '../../component/container/Container';
import Condition from '../../component/condition/Condition';
import PageNation from '../../component/pageNation/pageNation';
import {alert, createTab, formatDateTime, payType, downloadExcel, amount_format} from '../../lib/Util';
import ConditionForm from './ConditionForm';
// import {logger} from '../../lib/logger';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import DB from './DB';

let common = window.common;
class OrderList extends Component {

  constructor(props) {
    super(props);
    // list 列参数
    this.columns = [
      {
        title: '订单编号',
        key: 'order_no',
        dataIndex: 'order_no'
      }, {
        title: '订单状态',
        key: 'order_status',
        dataIndex: 'order_status',
        render: (value, row) => {
          if (row.order_status === 1) {
            return '待付款';
          }
          if (row.order_status === 2) {
            return '待发货';
          }
          if (row.order_status === 3) {
            return '待收货';
          }
          if (row.order_status === 4) {
            return '已收货';
          }
          if (row.order_status === 5) {
            return '已取消';
          }
          return ' ';
        }
      }, {
        title: '订单时间',
        key: 'create_date',
        dataIndex: 'create_date',
        render: (value, row) => {
          return formatDateTime(row.create_date);
        }
      }, {
        title: '订单金额',
        key: 'order_amount',
        dataIndex: 'order_amount',
        render: (value) => {
          return amount_format(value);
        }
      }, {
        title: '支付方式',
        key: 'pay_type',
        dataIndex: 'pay_type',
        render: (value, row) => {
          return payType(row.pay_type);
        }
      }, {
        title: '实付金额',
        key: 'pay_amount',
        dataIndex: 'pay_amount',
        render: (value) => {
          return amount_format(value);
        }
      }, {
        title: '商品数量',
        key: 'prod_num',
        dataIndex: 'prod_num'
      }, {
        title: '收货人',
        key: 'receipt_name',
        dataIndex: 'receipt_name'
      }, {
        title: '联系电话',
        key: 'receipt_contact',
        dataIndex: 'receipt_contact'
      }, {
        title: '地址',
        key: 'receipt_address',
        dataIndex: 'receipt_address'
      }, {
        title: '推荐人',
        key: 'create_hecadre',
        dataIndex: 'create_hecadre'
      }, {
        title: '送货人',
        key: 'ship_hecadre',
        dataIndex: 'ship_hecadre'
      }, {
        key: 'Operations',
        title: '操作',
        render: (value, row) => {
          return (
            <div className='optCol'>
              <a href="#" onClick={(e) => {
                this.showInfo(e, row);
              }}>详情</a>
            </div>
          );
        }
      }
    ];

    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGetPage = this.handleGetPage.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.handleExport = this.handleExport.bind(this);

    this.handleIndexSearch = this.handleIndexSearch.bind(this);
    this.handleIndexCreateStart = this.handleIndexCreateStart.bind(this);
    this.handleIndexCreateEnd = this.handleIndexCreateEnd.bind(this);
    this.handleIndexSelectChange = this.handleIndexSelectChange.bind(this);
    this.handleIndexInputChange = this.handleIndexInputChange.bind(this);

    this.handleIndexDateChange = this.handleIndexDateChange.bind(this);
    this.state = {
      indexViewData: {
        girdData: [],
        pageNumber: 1,
        total: 0,
        currentPage: 1,
        search_data: {
          order_no: '',
          receipt_name: '',
          receipt_contact: '',
          pay_type: 0,
          create_start: null,
          create_end: null,
          begin: 0,
          count: 20
        }
      }
    };
  }

  handleExport() {
    const search_data = this.state.indexViewData.search_data;
    DB.exportData(search_data).then(result => {
      downloadExcel(result, '订单管理');
    });
  }

  // 显示商品详情
  showInfo(e, data) {
    createTab({
      uri: 'app/dist/shopOrder/Info.html',
      data: {
        name: '订单详情'
      },
      key: 'shopOrderInfo'
    });
    common.Util.data('shopOrder/Info', data.order_id);
  }

  componentDidMount() {
    this.handleIndexSearch();
  }

  render() {

    const indexViewData = this.state.indexViewData;
    const conViewData = {
      order_no: indexViewData.search_data.order_no,
      receipt_name: indexViewData.search_data.receipt_name,
      receipt_contact: indexViewData.search_data.receipt_contact,
      pay_type: indexViewData.search_data.pay_type,
      create_start: indexViewData.search_data.create_start,
      create_end: indexViewData.search_data.create_end,
      handleSearch: this.handleIndexSearch,
      handleCreateStart: this.handleIndexCreateStart,
      handleCreateEnd: this.handleIndexCreateEnd,
      handleSelectChange: this.handleIndexSelectChange,
      handleInputChange: this.handleIndexInputChange,
      handleDateChange: this.handleIndexDateChange
    };
    return (
      <Container className='p20' title={'订单管理'}>
        <Condition>
          <div className='pull-left'>
            <ConditionForm {...conViewData}/>
          </div>
          <div className='pull-right'>
            <button className='btn btn-main' onClick={this.handleExport}>导出</button>
          </div>
        </Condition>
        <Gird rowKey='order_id' columns={this.columns} data={indexViewData.girdData}/>
        <PageNation pageCount={indexViewData.total} getPage={this.handleGetPage} currentPage={indexViewData.currentPage} pageNumber={indexViewData.pageNumber}/>
      </Container>
    );
  }

  // 翻页查询
  handleGetPage({currentPage}) {
    const indexViewData = this.state.indexViewData;
    const search_data = {
      ...indexViewData.search_data,
      begin: (currentPage - 1) * indexViewData.search_data.count
    };

    DB.shopOrderList(search_data).then((result) => {
      let pageNumber = Math.ceil(result.total / search_data.count) || 1;
      this.setState({
        indexViewData: {
          ...indexViewData,
          girdData: result.order_list,
          total: result.total,
          currentPage,
          pageNumber,
          search_data: search_data
        }
      });
    }).catch(err => {
      alert(err);
    });
  }

  handleIndexSearch() {
    // const condition = this.state.indexViewData.search_data;
    const indexViewData = this.state.indexViewData;
    const search_data = {
      ...indexViewData.search_data,
      begin: 0
    };
    DB.shopOrderList(search_data).then((result) => {
      let pageNumber = Math.ceil(result.total / search_data.count) || 1;
      this.setState({
        indexViewData: {
          ...indexViewData,
          girdData: result.order_list,
          total: result.total,
          pageNumber,
          currentPage: 1,
          search_data
        }
      });
    }).catch(err => {
      alert(err);
    });
  }
  handleIndexCreateStart(value, formattedValue) {
    this.setState({
      indexViewData: {
        ...this.state.indexViewData,
        search_data: {
          ...this.state.indexViewData.search_data,
          create_start: (+ new Date(formattedValue)) || null
        }
      }
    });
  }
  handleIndexCreateEnd(value, formattedValue) {
    this.setState({
      indexViewData: {
        ...this.state.indexViewData,
        search_data: {
          ...this.state.indexViewData.search_data,
          create_end: (+ new Date(formattedValue)) || null
        }
      }
    });
  }
  handleIndexSelectChange(selectData) {
    this.setState({
      indexViewData: {
        ...this.state.indexViewData,
        search_data: {
          ...this.state.indexViewData.search_data,
          ...selectData
        }
      }
    });
  }
  handleIndexInputChange(inputData) {
    this.setState({
      indexViewData: {
        ...this.state.indexViewData,
        search_data: {
          ...this.state.indexViewData.search_data,
          ...inputData
        }
      }
    });
  }

  handleIndexDateChange(name, value){
    this.setState({
      indexViewData: {
        ...this.state.indexViewData,
        search_data: {
          ...this.state.indexViewData.search_data,
          [name]: (+new Date(value)) || null
        }
      }
    });
  }
}
ReactDOM.render(
  < OrderList/>, document.getElementById('__shopOrder/List__'));
