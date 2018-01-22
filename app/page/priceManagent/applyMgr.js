import React,{ Component } from 'react';
import ReactDom from 'react-dom';
import Container from '../../component/container/Container';
import Condition from '../../component/condition/Condition';
import { Form,Clearfix,FormGroup,ControlLabel,FormControl,Button } from 'react-bootstrap';
import Grid from '../../component/table/Table';
import PageNation from '../../component/pageNation/pageNation';
import ApiMap from '../../lib/Api/ApiMap';
import http from '../../lib/Api/http';
import {alert, confirm, downloadExcel, formatDateTime,trim} from '../../lib/Util';
import PriceModify from './priceModify';
import './goodslist.css';

class ApplyMgr extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPage:1,
            pageNumber:1,
            count:20,
            gridData:[],
            lgShow:false,
            goodsInfo:{},
            pageCount:0
        };
        this.columns = this.initTable();
        this.handlePage = this.handlePage.bind(this);
        this.exportExcel = this.exportExcel.bind(this);
    }

    //初始化表格
    initTable(){
        let that = this;
        return [
            {
                title:'编号',
                key:'adjust_no',
                dataIndex:'adjust_no',
                align:'left'
            },
            {
                title:'商品名称',
                key:'prod_name',
                dataIndex:'prod_name',
                align:'left'
            },
            {
                title:'商品产地',
                key:'prod_src',
                dataIndex:'prod_src',
                align:'left'
            },
            {
                title:'商品规格',
                key:'prod_spec',
                dataIndex:'prod_spec',
                align:'left'
            },
            {
                title:'调价类型',
                key:'adjust_type',
                align:'center',
                render(value){
                    return value.adjust_type === 1 ? <span>原价</span> : <span>售价</span>
                }
            },
            {
                title:'调整前价格',
                key:'price_before',
                // dataIndex:'price_before',
                align:'left',
                render(value){
                    if(value.price_before!==''&&value.price_before!==null){
                        return new Number(value.price_before).toFixed(2);
                    }else{
                        return '';
                    }
                }
            },
            {
                title:'调整后价格',
                key:'price_after',
                // dataIndex:'price_after',
                align:'left',
                render(value){
                    if(value.price_after!==''&&value.price_after!==null){
                        return new Number(value.price_after).toFixed(2);
                    }else{
                        return '';
                    }
                }
            },
            {
                title:'发起人',
                key:'create_by',
                dataIndex:'create_by',
                align:'left',
            },
            {
                title:'申请时间',
                key:'create_date',
                align:'left',
                render(value){
                    return formatDateTime(value.create_date)
                }
            },
            {
                title:'审核人',
                key:'audit_by',
                dataIndex:'audit_by',
                align:'left',
            },
            {
                title:'审核时间',
                key:'audit_date',
                align:'left',
                render(value){
                    return value.audit_date ? formatDateTime(value.audit_date) : ''
                }
            },
            {
                title:'状态',
                key:'adjust_status',
                align:'center',
                render(value){
                    let states = value.adjust_status,stateTxt = '';
                    switch (states){
                        case 1:
                            stateTxt = <span className="stopSale">待审核</span>;
                            break;
                        case 2:
                            stateTxt = <span className="onSale">已审核</span>;
                            break;
                        case 3:
                            stateTxt = <span className="invalid">已拒绝</span>;
                            break;
                        case 4:
                            stateTxt = <span className="invalid">已取消</span>;
                            break;
                        default:
                            stateTxt = <span className="invalid">{''}</span>;
                            break;
                    }
                    return stateTxt;
                }
            },
            {
                title:'操作',
                key:'tag_operation',
                align:'center',
                width:200,
                render(value){
                    let states = value.adjust_status,opts;
                    if(states === 1){
                        opts = <div className="optCol"><a href="#" onClick={
                            () => {
                                that.cancelApply(value)
                            }
                        } className="cancel">取消申请</a><a href="#" onClick={
                            () => that.openDialog(value)
                        }>详情</a></div>
                    }else{
                        opts = <div className="optCol"><a href="#" onClick={
                            () => that.openDialog(value)
                        }>详情</a></div>
                    }
                    return opts;
                }
            }
        ];
    }

    //表单提交事件拦截
    handleSubmitEvent(e){
        e.preventDefault();
        this.handleSubmit();
    }

    //取消申请
    cancelApply(value){
        confirm('是否取消当前调价申请？',() => {
            console.log(ApiMap.commonData);
            http({
                ...ApiMap.goodsPriceCancel,
                data:{
                    ...ApiMap.commonData,
                    adjust_id:value.adjust_id
                }
            }).then(response => {
                console.log(response.data);
                let data = response.data;
                if(data.ret_code === 1){
                    alert('取消成功');
                    this.handleSubmit({currentPage:1,pageCode:1});
                }else{
                    alert(data.ret_msg);
                }
            }).catch(err => {
                console.log(err);
            })
        })
    }

    //打开详情弹窗
    openDialog(value){
        console.log(ApiMap.commonData);
        http({
            ...ApiMap.goodsPriceAancel,
            data:{
                ...ApiMap.commonData,
                adjust_id:value.adjust_id
            }
        }).then(response => {
            let data = response.data;
            if(data.ret_code === 1){
                this.setState({
                    lgShow:true,
                    goodsInfo:data.ret_data
                });
            }else{
                alert(data.ret_msg);
            }
        }).catch(err => {console.log(err)});
    }

    //处理表单数据
    handleSubmit(pageArgument){
        let fd = document.getElementById('queryApply'),fdAta = {},cd;
        let ev = pageArgument || {currentPage:1,pageCode:1};
        if(ev){
            cd = {
                begin:ev.pageCode === 1 ? 0 : (ev.pageCode - 1) * this.state.count,
                count:this.state.count
            };
        }
        for(let i = 0;i<fd.elements.length;i++){
            if(fd.elements[i].type === 'text' || fd.elements[i].type === 'select-one'){
                fdAta[fd.elements[i].name] = trim(fd.elements[i].value)
            }
        }
        this.getGridData({
            ...fdAta,
            ...cd,
            ...ev
        });
    }

    //获取数据
    getGridData(condition){
        condition.adjust_status = parseInt(condition.adjust_status);
        let api = ApiMap.goodsAdjustPriceList,data = {
            ...condition,
            ...ApiMap.commonData
        };
        console.log(ApiMap.commonData);
        http({
            ...api,
            data
        }).then(response => {
            let data = response.data;
            if(data.ret_code === 1){
                this.setState({
                    gridData:data.ret_data.adjust_list,
                    pageNumber:Math.ceil(data.ret_data.total/this.state.count),
                    currentPage:condition.currentPage ? condition.currentPage : 1,
                    lgShow:false,
                    pageCount:data.ret_data.total
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }
    //导出
    exportExcel(){
        http({
            ...ApiMap.goodsPriceAdjustExport,
            data:{
                ...ApiMap.commonData,
                adjust_status:parseInt(this.adjust_status.value)||0,
                prod_name:this.prod_name.value,
                create_by:this.create_by.value,
                audit_by:this.audit_by.value
            }
        }).then(response => {
            downloadExcel(response.data,'调价申请表');
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
    }
    //翻页处理
    handlePage(ev){
        this.handleSubmit(ev);
    }

    //生命周期
    componentDidMount(){
        this.handleSubmit({
            begin:0,
            count:this.state.count
        })
    }
    render(){
        return (
            <Container className = "p20" title={'调价申请'}>
                <Condition>
                    <div>
                        <Form id="queryApply" onSubmit = {
                            ev => this.handleSubmitEvent(ev)
                        } inline>
                            <FormGroup>
                                <ControlLabel>商品名称：</ControlLabel>
                                <FormControl type="text" name="prod_name" placeholder="商品名称" inputRef={ref => { this.prod_name = ref}} />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>状态：</ControlLabel>
                                <FormControl componentClass="select" name="adjust_status" inputRef={ref => { this.adjust_status = ref}}>
                                    <option value={0}>{'请选择'}</option>
                                    <option value={1}>待审核</option>
                                    <option value={2}>已审核</option>
                                    <option value={3}>已拒绝</option>
                                    <option value={4}>已取消</option>
                                </FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>发起人：</ControlLabel>
                                <FormControl type="text" name="create_by" placeholder="发起人" inputRef={ref => { this.create_by = ref}} />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>审核人：</ControlLabel>
                                <FormControl type="text" name="audit_by" placeholder="审核人" inputRef={ref => { this.audit_by = ref}}/>
                            </FormGroup>
                            <FormGroup>
                                <Button className="btn btn-main" type="submit">查询</Button>
                            </FormGroup>
                        </Form>
                    </div>
                    <Clearfix>
                        <div className="pull-right">
                            <Button className="btn btn-main" onClick={
                                this.exportExcel
                            }>导出</Button>
                        </div>
                    </Clearfix>
                </Condition>
                <Grid rowKey="adjust_id" data={this.state.gridData} columns={this.columns}/>
                <PageNation pageCount={this.state.pageCount} currentPage={this.state.currentPage} pageNumber={this.state.pageNumber} getPage={this.handlePage} />
                <PriceModify lgShow={this.state.lgShow} goodsInfo={this.state.goodsInfo}/>
            </Container>
        );
    }
}

ReactDom.render(<ApplyMgr />,
    document.getElementById('__priceManagent/applyMgr__'));