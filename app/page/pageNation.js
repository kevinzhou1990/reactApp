import React from 'react';
import ReactDOM from 'react-dom';
import PageNation from "../component/pageNation/pageNation";

class V extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentPage: 1,
            pageNumber: 10,
            pageCode:1
        };
        this.getPage = this.getPage.bind(this);
    }
    getPage(ev){
        console.log(ev);
        this.setState({
            currentPage:ev.currentPage,
            pageCode:ev.pageCode
        })
        console.log(this.state.currentPage)
    }


    render(){
        return (
            <PageNation getPage={this.getPage}
             pageNumber={this.state.pageNumber} currentPage={this.state.currentPage}/>
        );
    }
}

ReactDOM.render(
    <V />
    , document.getElementById('__pageNation__'));
