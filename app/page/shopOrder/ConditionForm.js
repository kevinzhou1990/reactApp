import React, {Component} from 'react';
// import {DatePicker} from 'antd';
import PropTypes from 'prop-types';
// import {logger} from '../../lib/logger';
import {Form, FormGroup, ControlLabel, Button, FormControl} from 'react-bootstrap';
import DateRange from '../../component/DateRange';
import {payTypeMap} from '../../lib/Util';

import './conditionStyle.css';

class ConditionForm extends Component {

  constructor(props) {
    super(props);
    this.doSearch = this.doSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleCreateStart = this.handleCreateStart.bind(this);
    this.handleCreateEnd = this.handleCreateEnd.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  doSearch() {
    this.props.handleSearch();
  }

  handleCreateStart(value, formattedValue) {
    this.props.handleCreateStart(value, formattedValue);
  }

  handleCreateEnd(value, formattedValue) {
    this.props.handleCreateEnd(value, formattedValue);
  }

  handleDateChange(name, value) {
    this.props.handleDateChange(name, value);
  }

  handleSelectChange(event) {
    const target = event.target;
    const name = target.name;
    const value = parseInt(target.value) || 0;
    this.props.handleSelectChange({[name]: value});
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value.trim();
    this.props.handleSelectChange({[name]: value});
  }

  render() {
    // const create_start = this.props.create_start && moment(this.props.create_start);
    // const create_end = this.props.create_end && moment(this.props.create_end);
    return (
      <Form inline>
        <FormGroup controlId="order_no">
          <ControlLabel>订单编号</ControlLabel>
          {' '}
          <FormControl type="text" name='order_no' onChange={this.handleInputChange} value={this.props.order_no} placeholder="订单编号"/>
        </FormGroup>
        {' '}
        <FormGroup controlId="order_status">
          <ControlLabel>订单状态</ControlLabel>
          {' '}
          <FormControl componentClass="select" value={this.props.order_status} onChange={this.handleSelectChange} name='order_status' placeholder="状态">
            <option>请选择</option>
            <option value='1'>待付款</option>
            <option value='2'>待发货</option>
            <option value='3'>待收货</option>
            <option value='4'>已收货</option>
            <option value='5'>已取消</option>
          </FormControl>
        </FormGroup>
        {' '}
        <FormGroup>
          <ControlLabel>订单时间</ControlLabel>
          {' '}
          <DateRange startName='create_start' endName='create_end' endValue={this.props.create_end} handleOnChange={this.handleDateChange} startValue={this.props.create_start}/>
        </FormGroup>
        {' '}
        <FormGroup controlId="receipt_name">
          <ControlLabel>收货人</ControlLabel>
          {' '}
          <FormControl type="text" name='receipt_name' onChange={this.handleInputChange} value={this.props.receipt_name} placeholder="收货人"/>
        </FormGroup>
        {' '}
        <FormGroup controlId="receipt_contact">
          <ControlLabel>联系电话</ControlLabel>
          {' '}
          <FormControl type="text" name='receipt_contact' onChange={this.handleInputChange} value={this.props.receipt_contact} placeholder="联系电话"/>
        </FormGroup>
        {' '}
        <FormGroup controlId="pay_type">
          <ControlLabel>支付方式</ControlLabel>
          {' '}
          <FormControl className='shopOrderSelectwidth' componentClass="select" value={this.props.pay_type} onChange={this.handleSelectChange} name='pay_type' placeholder="状态">
            <option>请选择</option>
            <option value={1}>{payTypeMap[1]}</option>
            <option value={2}>{payTypeMap[2]}</option>
            <option value={3}>{payTypeMap[3]}</option>
          </FormControl>
        </FormGroup>
        {' '}
        <FormGroup>
          <Button bsClass={'btn btn-main'} onClick={this.doSearch} type='button'>查询</Button>
        </FormGroup>
      </Form>
    );
  }
}
ConditionForm.propTypes = {
  order_no: PropTypes.string.isRequired,
  receipt_name: PropTypes.string.isRequired,
  receipt_contact: PropTypes.string.isRequired,
  pay_type: PropTypes.number.isRequired,
  create_start: PropTypes.number,
  create_end: PropTypes.number,
  handleSearch: PropTypes.func.isRequired,
  handleCreateStart: PropTypes.func.isRequired,
  handleCreateEnd: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired
};
export default ConditionForm;
