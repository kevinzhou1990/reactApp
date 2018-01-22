import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component{
    constructor(props) {
        super(props);
        this.state = props;
    }
    getOptions(){
        let option = [],optionData = this.state.options;
        for(let i = 0;i < optionData.length;i++){
            option.push(
                <option key={optionData[i].name+i}
                        value={optionData[i].value}>{optionData[i].name}</option>
            );
        }
        return option;
    }
    render(){
        return (
            <select onChange={ev => this.state.changeState(ev)} className="form-control">
                {this.getOptions()}
            </select>
        );
    }
}


Select.propTypes = {
    changeState:PropTypes.func.isRequired,
    options:PropTypes.arrayOf(
        PropTypes.shape({
            name:PropTypes.string.isRequired,
            value:PropTypes.any.isRequired
        })
    )
};


export default Select;