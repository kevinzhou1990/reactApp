import React from 'react';
import ReactDom from 'react-dom';
import Container from '../../component/container/Container';
import Condition from '../../component/condition/Condition';
import Table from '../../component/table/Table';
import PageNation from "../../component/pageNation/pageNation";
import http from '../../lib/Api/http';
import ApiMap from '../../lib/Api/ApiMap';
import Dialog from './FilterCrowdDialog';
import './goodsTag.css';

class FilterCrowd extends React.Component{
    constructor(props){//组件被创建和插入DOM中调用
        super(props);
        this.state = {
            currentPage: 1,
            pageNumber: 10,
            pageCount:0,
            pageCode:1,
            gridData:[],
            lgShow:false
        };
        this.columns = this.initTableCol();
        this.getPage = this.getPage.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    //初始化表格列
    initTableCol(){
        let that = this;
        return [
            {
                title:'编号',
                key:'crowd_no',
                dataIndex:'crowd_no',
                width:100,
                align:'center'
            },
            {
                title:'筛选人群分类',
                key:'crowd_text',
                dataIndex:'crowd_text',
                align:'left'
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
                                    that.openDialog('update',value);
                                }
                            }>修改</a>
                            <a href="#" onClick={
                                () => that.openDialog('detail',value)
                            }>详情</a>
                            <a href="#" className="dels" onClick={
                                () => that.openDialog('del',value)
                            }>删除</a>
                        </div>
                    );
                }
            }
        ];
    }

    //获取列表
    getTagList(condition){
        let data = {
            ...ApiMap.commonData,
            ...condition
        };
        http({
            ...ApiMap.shopCrowd,
            data
        }).then((response) => {
            let data = response.data;
            if(data.ret_code === 1){
                let pageNumber = Math.ceil(data.ret_data.total/20);
                this.setState({
                    pageNumber:pageNumber,
                    gridData:data.ret_data.crowd_list,
                    pageCount:data.ret_data.total,
                    lgShow:false
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    //表单查询提交
    queryWidthKey(event){
        event.preventDefault();
        let q = this.keyWord.value,condition = {
            begin:0,count:20,q
        };
        this.setState({lgShow:false,currentPage:1,pageCode:1});
        this.getTagList(condition);
    }


    componentWillMount(){}//生命周期

    //生命周期，组件被解析载入的时候调用
    componentDidMount(){
        let condition = {
            begin:0,count:20
        };
        this.getTagList(condition);
    }

    //弹窗更新列表
    updateState(){
        let condition = {
            begin:0,count:20
        };
        this.getTagList(condition);
        this.setState({
            currentPage:1,
            pageCode:1
        });
    }

    //分页回调
    getPage(ev){
        let count = 20,
            begin = ev.pageCode === 1 ? 0 : (ev.pageCode - 1)*count,
            q = this.keyWord.value,
            condition={begin,count,q};
        this.setState({
            currentPage:ev.currentPage,
            pageCode:ev.pageCode
        });
        this.getTagList(condition);
    }

    //打开弹出窗
    openDialog(action,value){
        this.setState({lgShow:true,dType:action,defaultValue:value});
    }

    render(){
        return (
            <Container className="p20" title={'筛选人群分类管理'}>
                <div className="goodsTaglist">
                    <Condition>
                        <div className="pull-left">
                            <form id="js_search" className="form-inline" onSubmit={event => this.queryWidthKey(event)}>
                                <label htmlFor="">筛选人群分类</label>
                                <input type="text" className="form-control" name="q" ref={
                                    (input) => this.keyWord = input
                                }/>
                                <button type="submit" className="btn btn-main">查询</button>
                            </form>
                        </div>
                        <div className="pull-right">
                            <button className="btn btn-main" onClick={
                                ()=> this.openDialog('new')
                            }>新增</button>
                        </div>
                    </Condition>
                    <Table rowKey="crowd_id" columns={this.columns} data={this.state.gridData} />
                    <PageNation pageCount={this.state.pageCount} getPage={this.getPage} pageNumber={this.state.pageNumber} currentPage={this.state.currentPage}/>
                    <Dialog lgShow={this.state.lgShow} dType={this.state.dType}
                            defaultValue={this.state.defaultValue} update={this.updateState}/>
                </div>
            </Container>
        );
    }
}

ReactDom.render(
    <FilterCrowd />,
    document.getElementById('__filterCrowd/filterCrowd__')
);