import React from 'react';
import ReactDom from 'react-dom';
import Container from '../../component/container/Container';
import Condition from '../../component/condition/Condition';
import Grid from '../../component/table/Table';
import http from '../../lib/Api/http';
import {alert,downloadExcel,createTab,confirm} from '../../lib/Util';
import PageNation from '../../component/pageNation/pageNation';
import ApiMap from '../../lib/Api/ApiMap';
import QueryForm from './queryForm';
import './goodslist.css';

class GoodsData extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pageNumber:1,
            pageCode:1,
            currentPage:1,
            pageCount:0,
            count:20,
            gridData : [],
            cats:[],
            crowds:[],
            prod_crowds:[],
            tags:[]
        };
        this.getPage = this.getPage.bind(this);
        this.submitHandle = this.submitHandle.bind(this);
        this.columns = this.initTableCol();
        this.delGoods = this.delGoods.bind(this);
    }

    initTableCol(){
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
                title:'商品分类',
                key:'prod_cat.cat_text',
                dataIndex:'prod_cat.cat_text'
            },
            {
                title:'商品标签',
                key:'prod_tags.tag_text',
                render(value){
                    let tags = [],prod_tag = value.prod_tags;
                    for(let i = 0;i<prod_tag.length;i++){
                        tags.push(prod_tag[i].tag_text);
                    }
                    return (
                        <div>{tags.join('/')}</div>
                    );
                }
            },
            {
                title:'档案人群分类',
                key:'prod_crowds',
                render(value){
                    let tags = [],prod_tag = value.doc_crowds;
                    for(let i = 0;i<prod_tag.length;i++){
                        tags.push(prod_tag[i].crowd_text);
                    }
                    return (
                        <div>{tags.join('/')}</div>
                    );
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
                width:180,
                render(value){
                    return (
                        <div className="optCol">
                            <a href="#" onClick={
                                ()=>{
                                    GoodsData.newTab('update',value.prod_id);
                                }
                            }>修改</a>
                            <a href="#" onClick={
                                ()=>{
                                    GoodsData.newTab('detail',value.prod_id);
                                }
                            }>详情</a>
                            <a href="#" className="stopSale" onClick={
                                ()=>{
                                    that.delGoods(value)
                                }
                            }>删除</a>
                        </div>
                    );
                }
            }
        ];
    }

    componentDidMount(){
        const data = this.refs.QueryFrom.getData();
        let condition = {
            ...data
        };
        http({
            data:ApiMap.commonData,
            ...ApiMap.shopProdmeta
        }).then(
            response => {
                let data = response.data;
                if(data.ret_code === 1){
                    this.setState({cats: data.ret_data.cats, crowds: data.ret_data.doc_crowds, tags: data.ret_data.tags,prod_crowds:data.ret_data.prod_crowds});
                }
            }
        ).catch(err => {
            console.log(err);
        });
        this.submitHandle(condition);
    }

    //表单提交处理
    submitHandle(ev){
        let count = this.state.count,
            begin = ev.begin || 0;
        let condition = {begin,count};
        const intKey = [
            'prod_valid_month',
            'prod_pkg_unit',
            'prod_cat',
            'prod_country_flag',
            'prod_in_sale',
            'prod_allow_sale',
            'prod_display'
        ];
        // const floatKey = ['prod_price','prod_original_price'];
        for(let key in ev){
            if(ev[key]){
                if(key === 'prod_cats' || key === 'prod_tags' || key === 'prod_tags' || key === 'prod_crowds' || key === 'doc_crowds'){
                    condition[key] = ev[key].split(',');
                    for(let i in condition[key]){
                        condition[key][i] = parseInt(condition[key][i]) || 0;
                    }
                }else{
                    if(intKey.indexOf(key)!== -1){
                        condition[key] = parseInt(ev[key]);
                    }else{
                        condition[key] = ev[key];
                    }
                }
            }
        }
        this.getGridData(condition);
    }

    getGridData(condition){
        let data = {
            ...ApiMap.commonData,
            ...condition
        };
        http({
            data,
            ...ApiMap.goodsList
        }).then(response => {
            let data = response.data,pageNumber = 0,currentPage = condition.currentPage || 1,gridData = [];
            if(data.ret_code === 1){
                pageNumber = Math.ceil(data.ret_data.total/this.state.count);
                gridData = data.ret_data.prod_list;
                this.setState({pageNumber,gridData,pageCount:data.ret_data.total})
            }
        }).catch(err => {
            console.log(err);
        });
    }

    //新增页面
    static newTab(type,goodsId){
        const NEW = 'new',UPDATE = 'update',DETAIL = 'detail';
        let data = {prod_id:goodsId};
        switch (type){
            default:
            case NEW:
                createTab({
                    uri:'app/dist/goodsData/newGoodsData.html',
                    key:'newGoodsData',
                    data:{name:'新增商品'}
                });
                break;
            case UPDATE:
                createTab({
                    uri:'app/dist/goodsData/goodsUpdate.html',
                    key:'goodsUpdate',
                    data:{name:'商品资料修改'}
                });
                common.Util.data('goodsData/goodsUpdate',data);
                break;
            case DETAIL:
                createTab({
                    uri:'app/dist/goodsData/goodsDetail.html',
                    key:'goodsDetail',
                    data:{name:'商品资料详情'}
                });
                common.Util.data('goodsData/goodsDetail',data);
                break;
        }
    }

    //删除商品资料
    delGoods(value){
        confirm('是否删除该商品？',()=>{
            http({
                ...ApiMap.goodsDelete,
                data:{
                    ...ApiMap.commonData,
                    prod_id:value.prod_id
                }
            }).then(response=>{
                let delData = response.data;
                if(delData.ret_code === 1){
                    const data = this.refs.QueryFrom.getData();
                    this.submitHandle({
                        begin: 0,
                        count:this.state.count,
                        ...data
                    });
                    this.setState({currentPage:1});
                    alert('删除成功');
                }else{
                    alert(delData.ret_msg);
                }
            }).catch(err=>{
                console(err);
            })
        });
    }

    //导出商品资料
    exportExcel(){
        let data = this.refs.QueryFrom.getData();
        const intKey = ['prod_in_sale','prod_tags','prod_allow_sale','prod_display','prod_cats','doc_crowds','prod_crowds'];
        for(let item in data){
            if(intKey.indexOf(item)!==-1){
                if(item === 'prod_cats' ||
                    item === 'doc_crowds' ||
                    item === 'prod_crowds' || item === 'prod_tags'){
                    data[item] = new Array(data[item]);
                    data[item] = data[item].map(no=>{
                        return parseInt(no);
                    })
                }else{
                    data[item] = parseInt(data[item])
                }
            }
        }
        http({
            ...ApiMap.goodsExport,
            data:{
                ...ApiMap.commonData,
                ...data
            }
        }).then(response=>{
            console.log(response);
            downloadExcel(response.data,'商品资料')
        }).catch(err=>{
            console.log(err);
        });
    }

    //分页回调
    getPage(ev){
        const data = this.refs.QueryFrom.getData();
        this.submitHandle({
            begin: ev.currentPage === 1 ? 0 : (ev.pageCode - 1) * this.state.count,
            count:this.state.count,
            ...data
        });
        this.setState({
            currentPage:ev.currentPage,
            pageCode:ev.pageCode
        });
    }
    render(){
        return (
            <Container className="p20" title={'商品资料管理'}>
                <div className="goodsDataList">
                    <Condition>
                        <QueryForm cats = {this.state.cats} crowds = {this.state.crowds} prod_crowds={this.state.prod_crowds} tags = {this.state.tags}
                                   submitHandle={this.submitHandle} ref="QueryFrom"/>
                        <div className="options clearfix">
                            <div className="pull-right">
                                <button className="btn btn-main" onClick={
                                    ()=>{
                                        this.exportExcel();
                                    }
                                }>导出</button>
                                <button className="btn btn-main" onClick={()=>{
                                    GoodsData.newTab('new');
                                }}>新增</button>
                            </div>
                        </div>
                    </Condition>
                    <Grid rowKey="prod_id" columns={this.columns} data={this.state.gridData}/>
                    <PageNation pageCount={this.state.pageCount} getPage={this.getPage}
                                pageNumber={this.state.pageNumber} currentPage={this.state.currentPage}/>
                </div>
            </Container>
        );
    }
}

ReactDom.render(
    <GoodsData/>,
    document.getElementById('__goodsData/goodsData__'));
