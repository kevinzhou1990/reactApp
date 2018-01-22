import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Gird from '../../component/table/Table';
import Container from '../../component/container/Container';
import Condition from '../../component/condition/Condition';
import PageNation from '../../component/pageNation/pageNation';
import ConditionForm from './Condition';
import {
    alert,
    amount_format,
    createTab,
    downloadExcel
} from '../../lib/Util';
import DB from './DB';

class ClaimsRecord extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '理赔时间',
        key: 'reim_date',
        dataIndex: 'reim_date',
      },
      {
        title: '保单编号',
        key: 'policy_no',
        dataIndex: 'policy_no'
      },{
        title: '被保人姓名',
        key: 'insured_name',
        dataIndex: 'insured_name'
      }, {
        title: '被保人联系电话',
        key: 'insured_phone',
        dataIndex: 'insured_phone'
      },
      {
        title: '理赔总金额（元）',
        key: 'reim_amount',
        dataIndex: 'reim_amount',
        render(value) {
          return amount_format(value,true);
        }
      },
      {
        title: '是否有退款',
        key: 'has_refund',
        dataIndex: 'has_refund',
        render(value) {
            return value === 1 ? '是' : value === 2 ? '否' : '';
        }
      },
      {
        key: 'Operations',
        title: '操作',
        render: (value, row) => {
          return (
            <div className='optCol'>
              <a href="#" className={'onSale'} onClick={(e) => {
                ClaimsRecord.showClaimsInfo(e, row);
              }}>详情</a>
            </div>
          );
        }
      }
    ];
    this.state = {
      indexViewData: {
        girdData: [],
        pageNumber: 1,
        total: 0,
        currentPage: 1,
        search_data: {
          insured_name: undefined,
          policy_no: undefined,
          reim_start: null,
          reim_end: null,
          has_refund:0,
          begin: 0,
          count: 20
        }
      }
    };
    // 翻页
    this.handleGetPage = this.handleGetPage.bind(this);
    // 导出
    this.handleExport = this.handleExport.bind(this);

    // 查询条件
    this.doFormElementChange = this.doFormElementChange.bind(this);
    // 查询事件
    this.doSearch = this.doSearch.bind(this);
  }

  // 翻页查询
  handleGetPage({currentPage}) {
    const indexViewData = this.state.indexViewData;
    const search_data = {
      ...indexViewData.search_data,
      has_refund:parseInt(indexViewData.search_data.has_refund),
      begin: (currentPage - 1) * indexViewData.search_data.count
    };

    DB.adminOpinsReimList(search_data).then((result) => {
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
  handleExport() {
    let search_data = this.state.indexViewData.search_data;
    for(let i in search_data){
      if(search_data[i] === null){
        search_data[i] = null
      }
    }
    DB.exportData(search_data).then((result) => {
      downloadExcel(result,'理赔记录表');
    })
      // downloadExcel();
  }
  doFormElementChange(name, value) {
    const indexViewData = this.state.indexViewData,
      search_data = indexViewData.search_data;
    this.setState({
      indexViewData: {
        ...indexViewData,
        search_data: {
          ...search_data,
          [name]: value
        }
      }
    });
  }
  doSearch() {
    const indexViewData = this.state.indexViewData;
    const search_data = {
      ...indexViewData.search_data,
      has_refund:parseInt(indexViewData.search_data.has_refund),
      begin: 0
    };
    if((search_data.reim_start&&search_data.reim_end) || (search_data.reim_start === null && search_data.reim_end === null)){
      DB.adminOpinsReimList(search_data).then((result) => {
            let pageNumber = Math.ceil(result.total / search_data.count) || 1;
            this.setState({
                indexViewData: {
                    ...indexViewData,
                    girdData: result.reim_list.map((item,no) =>{
                        item.reim_id = no;
                        return item;
                    }),
                    total: result.total,
                    pageNumber,
                    currentPage: 1,
                    search_data
                }
            });
      }).catch(err => {
        alert(err);
      });
    }else{
      alert('理赔时间必须选择开始时间和结束时间');
    }
  }
  static showClaimsInfo(e,rows){
    e.preventDefault();
    createTab({
      uri:'app/dist/claimsRecord/Info.html',
      key:'claimsRecordInfo',
      data:{name:'理赔详情'}
    });
    const info = {policy_no:rows.policy_no,reim_date:rows.reim_date};
    common.Util.data('claimsRecord/Info',JSON.stringify(info));
  }

  componentDidMount(){
    this.doSearch();
  }

  render() {
    return (
      <Container className='p20 claimsRecord' title={'理赔记录'}>
        <Condition>
            <ConditionForm {...this.state.indexViewData.search_data} handleFormElementChange={this.doFormElementChange} handleSearch={this.doSearch}/>
            <div className={'clearfix fileOpt'}>
              <button className={'btn btn-main pull-right'}
                onClick={this.handleExport}
              >导出</button>
            </div>
        </Condition>
        <Gird rowKey='reim_id' columns={this.columns} data={this.state.indexViewData.girdData}/>
        <PageNation pageCount={this.state.indexViewData.total} getPage={this.handleGetPage} currentPage={this.state.indexViewData.currentPage} pageNumber={this.state.indexViewData.pageNumber}/>
      </Container>
    );
  }
}

ReactDOM.render(
  <ClaimsRecord/>, document.getElementById('__claimsRecord/List__'));
