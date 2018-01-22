import React,{ Component } from 'react';
import ReactDom from 'react-dom';
import Container from '../../component/container/Container';
import Condition from '../../component/condition/Condition';
import { Form,Clearfix,FormGroup,ControlLabel,FormControl,Button } from 'react-bootstrap';
import Grid from '../../component/table/Table';
import PageNation from '../../component/pageNation/pageNation';
import ApiMap from '../../lib/Api/ApiMap';
import http from '../../lib/Api/http';
import PriceModify from './priceModify';
import './goodslist.css';
import { alert,formatDateTime,downloadExcel,trim } from '../../lib/Util';

class PriceRecord extends Component{
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
                // dataIndex:'create_date',
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
                // dataIndex:'audit_date',
                align:'left',
                render(value){
                    return formatDateTime(value.audit_date)
                }
            },
            {
                title:'操作',
                key:'tag_operation',
                align:'center',
                width:80,
                render(value){
                    let opts = <div className="optCol"><a href="#" onClick={
                            () => that.openDialog(value)
                        }>详情</a></div>;
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

    //打开详情弹窗
    openDialog(value){
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
        let fd = document.getElementById('record_query'),fdAta = {},cd;
        let ev = pageArgument || {currentPage:1,pageCode:1};
        if(ev){
            cd = {
                begin:ev.pageCode === 1 ? 0 : (ev.pageCode - 1) * this.state.count,
                count:this.state.count
            };
        }
        for(let i = 0;i<fd.elements.length;i++){
            if(fd.elements[i].type === 'text' || fd.elements[i].type === 'select-one'){
                fdAta[fd.elements[i].name] = trim(fd.elements[i].value);
            }
        }
        fdAta.adjust_status = 2;
        this.getGridData({
            ...fdAta,
            ...cd,
            ...ev
        });
    }

    //获取数据
    getGridData(condition){
        console.log(condition);
        let api = ApiMap.goodsAdjustPriceList;
        http({
            ...api,
            data:{
                ...ApiMap.commonData,
                ...condition
            }
        }).then(response => {
            let data = response.data;
            this.setState({
                gridData:data.ret_data.adjust_list,
                pageNumber:Math.ceil(data.ret_data.total/this.state.count),
                currentPage:condition.currentPage ? condition.currentPage : 1,
                lgShow:false,
                pageCount:data.ret_data.total
            });
        }).catch(err => {
            console.log(err);
        });
    }

    //翻页处理
    handlePage(ev){
        this.handleSubmit(ev);
    }

    //导出
    exportExcel(){
        http({
            ...ApiMap.goodsPriceAdjustExport,
            data:{
                ...ApiMap.commonData,
                adjust_status:2,
                prod_name:this.prod_name.value,
                create_by:this.create_by.value,
                audit_by:this.audit_by.value

            }
        }).then(response => {
            downloadExcel(response.data,'调价记录表');
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
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
            <Container className = "p20" title={'商品调价记录'}>
                <Condition>
                    <div>
                        <Form id="record_query" onSubmit = {
                            ev => this.handleSubmitEvent(ev)
                        } inline>
                            <FormGroup>
                                <ControlLabel>商品名称：</ControlLabel>
                                <FormControl type="text" name="prod_name" placeholder="商品名称" inputRef={ref => { this.prod_name = ref}} />
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
ReactDom.render(
    <PriceRecord/>,document.getElementById('__priceManagent/priceRecord__')
);