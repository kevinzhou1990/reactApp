import React from 'react';
import PropTypes from 'prop-types';
class Link extends React.Component {
    render() {
        let link =  <a href="#" onClick = {
            e => this.handleClick(e)
        }>{this.props.pageArgument.page}</a>;
        if(this.props.pageArgument.pageCode === this.props.pageArgument.currentPage){
            link = <a href="#" className="active">{this.props.pageArgument.page}</a>;
        }
        return link;
    }
    handleClick(e){
        e.preventDefault();
        let pageArgument = {
            pageCode : this.props.pageArgument.pageCode,
            currentPage : this.props.pageArgument.pageCode
        };
        this.props.onLink(pageArgument);
    }
}

Link.propTypes = {
    pageArgument:PropTypes.shape({
        page:PropTypes.string.isRequired,
        pageCode:PropTypes.number.isRequired,
        currentPage:PropTypes.number.isRequired
    })
};
export default Link;