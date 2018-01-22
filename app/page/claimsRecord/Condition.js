import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, FormGroup, ControlLabel, Button, FormControl} from 'react-bootstrap';
import DateRange from '../../component/DateRange';
class ClaimsRecordCondition extends Component {
  constructor(props) {
    super(props);
    // input[type=text]内容改变事件
    this.handleInputChange = this.handleInputChange.bind(this);
    // input[type=date]内容改变事件
    this.handleDateChange = this.handleDateChange.bind(this);
    // 查询
    this.doSearch = this.doSearch.bind(this);
  }

  handleInputChange(e) {
    const el = e.target,
      name = el.name,
      value = el.value;
    this.props.handleFormElementChange(name, value);
  }
  handleDateChange(name, value) {
    this.props.handleFormElementChange(name, value);
  }
  doSearch() {
    this.props.handleSearch();
  }

  render() {
    return (
      <Form inline>
        <FormGroup controlId="insured_name">
          <ControlLabel className='text-right'>被保人姓名</ControlLabel>
          {' '}
          <FormControl type="text" name='insured_name' onChange={this.handleInputChange} value={this.props.insured_name} placeholder="被保人姓名"/>
        </FormGroup>
        {' '}
        <FormGroup controlId="policy_no">
          <ControlLabel className='text-right'>保单编号</ControlLabel>
          {' '}
          <FormControl type="text" name='policy_no' onChange={this.handleInputChange} value={this.props.policy_no} placeholder="保单编号"/>
        </FormGroup>
          <FormGroup controlId="has_refund">
              <ControlLabel className='text-right'>是否退费</ControlLabel>
              {' '}
              <FormControl componentClass={'select'} type="text" name='has_refund' onChange={this.handleInputChange} value={this.props.policy_no}>
                <option value={0}>全部</option>
                <option value={1}>是</option>
                <option value={2}>否</option>
              </FormControl>
          </FormGroup>
        {' '}
        <FormGroup>
          <ControlLabel className='text-right'>理赔时间</ControlLabel>
          {' '}
          <DateRange startName='reim_start' endName='reim_end'
                     endValue={this.props.reim_end} handleOnChange={this.handleDateChange}
                     startValue={this.props.reim_start}/>
        </FormGroup>
        {' '}
        <FormGroup controlId="station_in_sale">
          <Button bsClass={'btn btn-main'} onClick={this.doSearch} type='button'>查询</Button>
        </FormGroup>
      </Form>
    );
  }
}

ClaimsRecordCondition.propTypes = {
  insured_name: PropTypes.string,
  policy_no: PropTypes.number,
  reim_start: PropTypes.number,
  reim_end: PropTypes.number,
  handleFormElementChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired
};

export default ClaimsRecordCondition;
