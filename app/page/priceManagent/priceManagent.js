import React,{Component} from 'react';
import ReactDom from 'react-dom';
import Container from '../../component/container/Container';
import Condition from '../../component/condition/Condition';
import QueryForm from './queryForm';
import Grid from '../../component/table/Table';
import PageNation from '../../component/pageNation/pageNation';
import ApiMap from '../../lib/Api/ApiMap';
import PriceMaDialog from './priceMaDialog';
import http from '../../lib/Api/http';
import { alert,createTab,downloadExcel } from '../../lib/Util';
import './goodslist.css';

class PriceMangent extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPage:1,
            pageNumber:1,
            pageCount:0,
            count:20,
            gridData:[],
            lgShow:false,
            goodsInfo:{}
        };
        this.columns = this.initDataTable();
        this.openDialog = this.openDialog.bind(this);
        this.submitHandle = this.submitHandle.bind(this);
        this.updatePrice = this.updatePrice.bind(this);
        this.exportExcel = this.exportExcel.bind(this);
    }

    submitHandle(ev){
        let fData = this.refs.QueryForm.getData(),currentPage = 1,pageCode = 1;
        let intType = ['prod_display','prod_allow_sale','prod_in_sale'];
        if(ev){
            for(let key in ev){
                if(key !== 'currentPage' || key !== 'pageCode'){
                    fData[key] = ev[key];
                }
            }
        }
        for(let key in fData){
            if(intType.indexOf(key) !== -1){
                fData[key] = parseInt(fData[key]);
            }
        }
        if(ev && ev.currentPage){
            currentPage = ev.currentPage;
            pageCode = ev.pageCode;
        }
        let condition = {
            ...ApiMap.goodsList,
            data:{
                begin:currentPage === 1 ? 0 : (currentPage-1)*this.state.count,
                count:this.state.count,
                ...fData,
                ...ApiMap.commonData
            }
        };
        http(condition).then(response => {
            let data = response.data;
            if(data.ret_code === 1){
                this.setState({
                    gridData:data.ret_data.prod_list,
                    pageNumber:Math.ceil(data.ret_data.total/this.state.count),
                    pageCount:data.ret_data.total,
                    pageCode,
                    currentPage,
                    lgShow:false
                });
            }
        }).catch(err => {
            console.log(err)
        });
    }

    //生命周期函数
    componentDidMount(){
        this.submitHandle();
    }

    //翻页处理
    handlePage(ev){
        this.submitHandle(ev);
    }

    //初始化表格
    initDataTable(){
        let that = this;
        return [
            {
                title:'商品编号',
                key:'prod_no',
                dataIndex:'prod_no',
                width:74,
                align:'center'
            },
            {
                title:'商品名称',
                key:'prod_name',
                dataIndex:'prod_name'
            },
            {
                title:'商品产地',
                key:'prod_src',
                dataIndex:'prod_src'
            },
            {
                title:'商品规格',
                key:'prod_spec',
                dataIndex:'prod_spec',
                align:'center'
            },
            {
                title:'售价',
                key:'prod_price',
                // dataIndex:'prod_price',
                align:'center',
                render(value){
                    return new Number(value.prod_price).toFixed(2)
                }
            },
            {
                title:'原价',
                key:'prod_original_price',
                // dataIndex:'prod_original_price',
                align:'center',
                render(value){
                    if(value.prod_original_price !==''&&value.prod_original_price!==null){
                        return new Number(value.prod_original_price).toFixed(2)
                    }else{
                        return ' ';
                    }

                }
            },
            {
                title:'助记码',
                key:'prod_assist_code',
                dataIndex:'prod_assist_code',
                align:'center'
            },
            {
                title:'是否在售',
                key:'prod_in_sale',
                width:74,
                align:'center',
                render(value){
                    return value.prod_in_sale === 1 ? <span className="onSale">在售</span> : <span className="stopSale">停售</span>
                }
            },
            {
                title:'是否可售',
                key:'prod_allow_sale',
                width:74,
                align:'center',
                render(value){
                    return value.prod_allow_sale === 1 ? <span className="onSale">可售</span> : <span className="stopSale">不可售</span>
                }

            },
            {
                title:'默认显示',
                key:'prod_display',
                width:74,
                align:'center',
                render(value){
                    return value.prod_display === 1 ? <span className="onSale">是</span> : <span className="stopSale">否</span>
                }

            },
            {
                title:'操作',
                key:'tag_operation',
                align:'center',
                width:120,
                render(value){
                    return (
                        <div className="optCol">
                            <a href="#" onClick={
                                () => {
                                    that.openDialog(value)
                                }
                            }>调价</a>
                            <a href="#" onClick={
                                () => that.openDetail(value.prod_id)
                            }>详情</a>
                        </div>
                    );
                }
            }
        ];
    }

    //打开调价弹窗
    openDialog(value){
        this.setState({lgShow:true,goodsInfo:value});
    }

    //打开详情
    openDetail(goodsId){
        let data = {prod_id:goodsId};
        createTab({
            uri:'app/dist/goodsData/goodsDetail.html',
            key:'goodsDetail',
            data:{name:'商品资料详情'}
        });
        common.Util.data('goodsData/goodsDetail',data);
    }

    //价格调整
    updatePrice(product){
        let target_price = product.target_price;
        const reg = /(^[-+]?[1-9]\d*(\.\d{1,2})?$)|(^[-+]?[0]{1}(\.\d{1,2})?$)/g;
        if(target_price){
            if(reg.test(target_price)){
                target_price = parseFloat(target_price)
            }else{
                alert('价格应为数字，且不超过两位小数');
                return false;
            }
        }else{
            target_price = null;
        }
        let data = {
            prod_id:product.prod_id,
            adjust_type:parseInt(product.adjust_type),
            target_price
        };
        console.log(data);
        http({
            ...ApiMap.goodsPriceCreate,
            data:{
                ...data,
                ...ApiMap.commonData
            }
        }).then(response => {
            let data = response.data;
            if(data.ret_code === 1){
                alert('申请成功，请等待审核');
                this.setState({
                    lgShow:false
                })
            }else{
                alert(data.ret_msg);
            }

        }).catch(err => {
            console.log(err)
        });
        console.log(product);
    }

    //导出
    exportExcel(){
        let fData = this.refs.QueryForm.getData(),intType = ['prod_in_sale','prod_allow_sale','prod_display'];
        for(let key in fData){
            if(intType.indexOf(key) !== -1){
                fData[key] = parseInt(fData[key]);
            }
        }
        http({
            ...ApiMap.goodsPriceExport,
            responseType: 'blob',
            data:{
                ...ApiMap.commonData,
                ...fData
            }
        }).then(response => {
            downloadExcel(response.data,'商品价格表');
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
    }
    render(){
        return (
            <Container className="priceMan p20" title="商品价格管理">
                <Condition>
                    <QueryForm submitHandle={
                        this.submitHandle
                    } ref="QueryForm" />
                    <div className="options clearfix">
                        <div className="pull-right">
                            <button className="btn btn-main" onClick={
                                this.exportExcel
                            }>导出</button>
                        </div>
                    </div>
                </Condition>
                <Grid rowKey="prod_id" columns={this.columns} data={this.state.gridData} />
                <PageNation pageCount={this.state.pageCount} getPage={
                    ev => this.handlePage(ev)
                } currentPage={this.state.currentPage} pageNumber={this.state.pageNumber} />
                <PriceMaDialog lgShow={this.state.lgShow} goodsInfo={this.state.goodsInfo} showButton={true} confim={this.updatePrice} />
            </Container>
        );
    }
}

ReactDom.render(
    <PriceMangent />,
    document.getElementById('__priceManagent/priceManagent__'));