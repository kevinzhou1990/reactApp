import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Gird from '../../component/table/Table';
import Container from '../../component/container/Container';
import {
    formatDateTime,
    amount_format
} from '../../lib/Util';
import DB from './DB';

class ClaimsRecordInfo extends Component{
  constructor(props){
    super(props);
    this.state = {
        insuranceInfo: [],
        claimsInfo: {
            balance:[],
            claimRecod:[]
        },
        drugList: []
    };
    this.insuranceInfoColumns = ClaimsRecordInfo.initInsurance();
  }

  static initInsurance(){
    return [
        {
          title:'保单编号',
          key:'policy_no',
          dataIndex:'policy_no',
          align:'center'
        },
        {
          title:'起始日期',
          key:'policy_start',
          dataIndex:'policy_start',
          align:'center',
          render(value){
            return formatDateTime(value,false)
          }
        },
        {
            title:'结束日期',
            key:'policy_end',
            dataIndex:'policy_end',
            align:'center',
            render(value){
                return formatDateTime(value,false)
            }
        },
        {
            title:'首保/续保',
            key:'policy_type',
            dataIndex:'policy_type',
            align:'center',
            render(value){
                return value === 1 ? '首保' : value === 2 ? '续保' : ''
            }
        },
        {
            title:'被保人姓名',
            key:'insured_name',
            dataIndex:'insured_name',
            align:'left'
        },
        {
            title:'被保人性别',
            key:'insured_sex',
            dataIndex:'insured_sex',
            align:'left',
            render(value){
                return value === 1 ? '男' : value === 2 ? '女' : ''
            }
        },
        {
            title:'被保险人出生年月',
            key:'insured_birth',
            dataIndex:'insured_birth',
            align:'left',
            render(value){
                return formatDateTime(value,false)
            }
        },
        {
            title:'被保人联系电话',
            key:'insured_phone',
            dataIndex:'insured_phone',
            align:'left'
        }
    ];
  }

  static initClaimsTab(){
    return [
      {
        title:'理赔日期',
        key:'reim_date',
        dataIndex:'reim_date',
        align:'center'
      },
      {
        title:'理赔总金额（元）',
        key:'day_reim_amount',
        dataIndex:'day_reim_amount',
        align:'left',
        render(value){
          return amount_format(value,true)
        }
      },
      {
        title:'实付总金额（元）',
        key:'day_pay_amount',
        dataIndex:'day_pay_amount',
        align:'left',
        render(value){
          return amount_format(value,true)
        }
      },
      {
        title:'应付总金额（元）',
        key:'day_total_amount',
        dataIndex:'day_total_amount',
        align:'left',
        render(value){
          return amount_format(value,true)
        }
      }
    ];
  }

  static initClaimsAmount(){
    return [
      {
        title:'药品类理赔总金额（元）',
        key:'day_reim_drug',
        dataIndex:'day_reim_drug',
        align:'left',
        render(value){
          return amount_format(value,true)
        }
      },
      {
        title:'非药品类理赔总金额（元）',
        key:'day_reim_nondrug',
        dataIndex:'day_reim_nondrug',
        align:'left',
        render(value){
          return amount_format(value,true)
        }
      },
      {
        title:'药品类剩余理赔金额（元）',
        key:'reim_drug_left',
        dataIndex:'reim_drug_left',
        align:'left',
        render(value){
          return amount_format(value,true)
        }
      },
      {
        title:'非药品类剩余理赔金额（元）',
        key:'reim_nondrug_left',
        dataIndex:'reim_nondrug_left',
        align:'left',
        render(value){
          return amount_format(value,true)
        }
      }
    ];
  }

  static initDetailList(){
    return [
      {
        title:'商品编号',
        key:'item_no',
        dataIndex:'item_no',
        align:'center'
      },
      {
        title:'商品名称',
        key:'item_name',
        dataIndex:'item_name',
        align:'left'
      },
      {
        title:'商品类别',
        key:'item_cat',
        dataIndex:'item_cat',
        align:'left',
        render(value){
            return value === 1 ? '药品类' : value === 2 ? '非药品类':''
        }
      },
      {
        title:'商品产地',
        key:'item_src',
        dataIndex:'item_src',
        align:'left'
      },
      {
        title:'商品规格',
        key:'item_spec',
        dataIndex:'item_spec',
        align:'left'
      },
      {
        title:'商品总金额',
        key:'item_amount',
        dataIndex:'item_amount',
        align:'left',
        render(value){
          return amount_format(value,true)
        }
      }
    ];
  }

  expendDetail(){
      const reim_list = this.state.drugList;
      let tabArr = [];
      for(let i = 0;i < reim_list.length;i++){
          const tabTemp = ClaimsRecordInfo.initDetailList();
          const tab =
          <div key={i+'detail'} className={'girdlist'}>
              <div className={'detailmsg'}>
                  <span>{formatDateTime(reim_list[i].reim_date)}</span><span>订单编号：{reim_list[i].reim_no}</span>
              </div>
              <Gird rowKey={'reim_no'} columns={tabTemp} data={reim_list[i].item_list} />
              <div className={'expednMsg clearfix'}>
                  <div className="pull-right">
                      <span>应付金额：{amount_format(reim_list[i].total_amount,true)}</span>
                      <span>实付金额：{amount_format(reim_list[i].pay_amount,true)}</span>
                      <span>理赔金额：{amount_format(reim_list[i].reim_amount,true)}</span>
                  </div>
              </div>
          </div>;
          tabArr.push(tab);
      }
      return tabArr;
  }

  getRefund(){
      const reim_list = this.state.drugList;
      let tabArr = [];
      for(let i = 0; i < reim_list.length; i ++){
          for(let j = 0; j < reim_list[i].refund_list.length;j++){
              const tabTemp = ClaimsRecordInfo.initDetailList();
              const tabContent =
                  <div className={'girdlist'} key={i+''+j+'refund'}>
                      <div className={'detailmsg'}>
                          <span>{formatDateTime(reim_list[i].refund_list[j].refund_date)}</span>
                          <span>退款单号：{reim_list[i].refund_list[j].refund_no}</span>
                      </div>
                      <Gird rowKey={'item_no'} columns={tabTemp} data={reim_list[i].refund_list[j].item_list} />
                      <div className={'expednMsg clearfix'}>
                          <div className={'pull-left'}>
                              <span>订单编号：{reim_list[i].reim_no}</span>
                          </div>
                          <div className="pull-right">
                              <span>退回自费金额：{amount_format(reim_list[i].refund_list[j].pay_refund_amount,true)}</span>
                              <span>退回理赔金额：{amount_format(reim_list[i].refund_list[j].reim_refund_amount,true)}</span>
                          </div>
                      </div>
                  </div>;
              tabArr.push(tabContent);
          }
      }
      return tabArr;
  }

  componentDidMount(){
    let q = JSON.parse(this.props.claimsRecordId);
    DB.reimDetail(q).then((result)=>{
        result.reim_date = q.reim_date;
        let insuranceInfo = {
            policy_no:result.policy_no,
            policy_start:result.policy_start,
            policy_end:result.policy_end,
            policy_type:result.policy_type,
            insured_name:result.insured_name,
            insured_sex:result.insured_sex,
            insured_birth:result.insured_birth,
            insured_phone:result.insured_phone
        },claimsInfo = {
            policy_no:result.policy_no,
            reim_date:result.reim_date,
            day_reim_amount:result.day_reim_amount,
            day_pay_amount:result.day_pay_amount,
            day_total_amount:result.day_total_amount
        },balance = {
            policy_no:result.policy_no,
            day_reim_drug:result.day_reim_drug,
            day_reim_nondrug:result.day_reim_nondrug,
            reim_drug_left:result.reim_drug_left,
            reim_nondrug_left:result.reim_nondrug_left
        };
        this.setState({
            ...this.state,
            insuranceInfo:new Array(insuranceInfo),
            drugList:result.reim_list,
            claimsInfo:{
                claimRecod:new Array(claimsInfo),
                balance:new Array(balance)
            }
        });
    }).catch((err)=>{
        console.log(err);
    });
  }

  render(){
    return (
      <Container title={'理赔详情'} className={'claimsRecord'}>
        <div className="grid-info">
          <p>保单信息</p>
          <Gird rowKey={'policy_no'} columns={this.insuranceInfoColumns} data={this.state.insuranceInfo}/>
        </div>
        <div className="grid-info">
          <p>当日统计</p>
          <Gird rowKey={'policy_no'} columns={ClaimsRecordInfo.initClaimsTab()} data={this.state.claimsInfo.claimRecod}/>
          <Gird rowKey={'policy_no'} columns={ClaimsRecordInfo.initClaimsAmount()} data={this.state.claimsInfo.balance}/>
        </div>
        <div className="grid-info">
          <p>消费详情</p>
          {this.expendDetail()}
        </div>
        <div className="grid-info">
          <p>退款信息</p>
          {this.getRefund()}
        </div>
      </Container>
    );
  }
}

ReactDOM.render(
  <ClaimsRecordInfo claimsRecordId = {common.Util.data('claimsRecord/Info')} />, document.getElementById('__claimsRecord/Info__'));
