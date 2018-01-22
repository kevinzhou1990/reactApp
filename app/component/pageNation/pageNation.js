//分页展示组件
import React from 'react';
import Link from './link';
import PropTypes from 'prop-types';
import './pagenation.css';
class PageNation extends React.Component{
    constructor(props) {
        super(props);
        // this.state = props;
        this.state = {
            ...props,
            pageCodes:0
        }
    }
    getPageNumber(ev){
        let pageCodes = parseInt(ev.target.value);
        this.setState({
            pageCodes
        });
    }
    goPage(ev){
        ev.preventDefault();
        const p = this.state.pageCodes ? this.state.pageCodes : this.state.currentPage;
        this.props.getPage({
            pageCode : p,
            currentPage : p
        });
    }
    getLinkList(){
        let list = [
            <Link key="firstpage" pageArgument={
                {
                    page:'首页',
                    pageCode:1,
                    currentPage:parseInt(this.props.currentPage)
                }
            } onLink={ev => this.props.getPage(ev)} />,
            <Link key="prePage" pageArgument={
                {
                    page:'上一页',
                    pageCode:this.props.currentPage - 1 === 0 ? 1 : this.props.currentPage - 1,
                    currentPage:parseInt(this.props.currentPage)
                }
            } onLink={ev => this.props.getPage(ev)} />
        ];
        const pageNumber = this.props.pageNumber;
        let pages = 5,strNo = 1;
        if(this.props.currentPage >= 3 && pageNumber >= 5){
            strNo = this.props.currentPage - 2;
            pages = this.props.currentPage + 2;
        }
        pages = pageNumber < pages ? pageNumber:pages;
        for(strNo;strNo <= pages;strNo++){
            list.push(
                <Link key={"page"+strNo} pageArgument={
                    {
                        page:(strNo).toString(),
                        pageCode:strNo,
                        currentPage:parseInt(this.props.currentPage)
                    }
                } onLink={ev => this.props.getPage(ev)} />
            );
        }
        list = [
            ...list,
            <Link key="nextPage" pageArgument={
                {
                    page:'下一页',
                    pageCode:(this.props.currentPage+1 >= this.props.pageNumber ? this.props.pageNumber : this.props.currentPage+1),
                    currentPage:this.props.currentPage
                }
            } onLink={ev => this.props.getPage(ev)} />,
            <Link key="lastPage" pageArgument={
                {
                    page:'末页',
                    pageCode:this.props.pageNumber,
                    currentPage:this.props.currentPage
                }
            } onLink={ev => this.props.getPage(ev)} />,
            <span key='msg'>{'共 '+this.props.pageCount+' 条'+' '+this.props.pageNumber+' 页'}</span>,
            <span key={'info'}>到第</span>,
            <input key={'input'} type="text" className="pageInput" onChange={
                ev => this.getPageNumber(ev)
            }/>,
            <span key={'pages'}>页</span>,
            <a key={'confirm'} href="#" className="btn-main" onClick={
                ev => this.goPage(ev)
            }>确定</a>
        ];
        return list;
    }
    render(){
        return (
            <div className="pd20 clearfix">
                <div className="pageNation">{this.getLinkList()}</div>
            </div>
        );
    }
}

PageNation.propTypes={
    getPage:PropTypes.func.isRequired,//回调函数，用来获取数据
    pageNumber:PropTypes.number.isRequired,//总页数
    currentPage:PropTypes.number.isRequired,//当前页数
    pageCount:PropTypes.number.isRequired//总条数
};
export default PageNation;