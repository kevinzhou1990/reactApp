import React, {Component} from 'react';
import DatePicker from "react-bootstrap-date-picker";
import {logger} from '../../lib/logger';
import PropTypes from 'prop-types';
import {Form, FormGroup, ControlLabel, Button, FormControl} from 'react-bootstrap';
import './conditionStyle.css';

class Condition extends Component {

  constructor(props) {
    super(props);
    this.state = {
      guest_order_no: '',
      create_start: undefined,
      create_end: undefined,
      receipt_name: '',
      receipt_contact: '',
      guest_order_status: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleCreateStart = this.handleCreateStart.bind(this);
    this.handleCreateEnd = this.handleCreateEnd.bind(this);
  }

  handleSubmit() {
    logger(this.state);
    this.props.handleSubmit(this.state);
  }

  getData() {
    return this.state;
  }

  handleCreateStart(value, formattedValue){
    this.setState({
      create_start: +new Date(formattedValue)
    });
  }

  handleCreateEnd(value, formattedValue){
    this.setState({
      create_end: +new Date(formattedValue)
    });
  }

  handleSelectChange(event) {
    const target = event.target;
    const name = target.name;
    const value = parseInt(target.value) || 0;
    this.setState({[name]: value});
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({[name]: target.value});
  }

  render() {
    const create_start = this.state.create_start && (new Date(this.state.create_start)).toISOString();
    const create_end = this.state.create_end && (new Date(this.state.create_end)).toISOString();
    return (
      <Form inline>
        <FormGroup controlId="order_no">
          <ControlLabel>订单编号</ControlLabel>
          {' '}
          <FormControl type="text" name='order_no' onChange={this.handleInputChange} value={this.state.order_no} placeholder="订单编号"/>
        </FormGroup>
        {' '}
        <FormGroup controlId="order_status">
          <ControlLabel>订单状态</ControlLabel>
          {' '}
          <FormControl componentClass="select" value={this.state.order_status} onChange={this.handleSelectChange} name='order_status' placeholder="状态">
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
          <DatePicker name='create_start' onChange={this.handleCreateStart} value={create_start} dateFormat='YYYY/MM/DD'/> {'-'}
          <DatePicker name='create_end' onChange={this.handleCreateEnd} value={create_end} dateFormat='YYYY/MM/DD'/>
        </FormGroup>
        {' '}
        <FormGroup controlId="receipt_name">
          <ControlLabel>收货人</ControlLabel>
          {' '}
          <FormControl type="text" name='receipt_name' onChange={this.handleInputChange} value={this.state.receipt_name} placeholder="收货人"/>
        </FormGroup>
        {' '}
        <FormGroup controlId="receipt_contact">
          <ControlLabel>联系电话</ControlLabel>
          {' '}
          <FormControl type="text" name='receipt_contact' onChange={this.handleInputChange} value={this.state.receipt_contact} placeholder="联系电话"/>
        </FormGroup>
        {' '}
        <FormGroup controlId="pay_type">
          <ControlLabel>支付方式</ControlLabel>
          {' '}
          <FormControl className='shopOrderSelectwidth' componentClass="select" value={this.state.pay_type} onChange={this.handleSelectChange} name='pay_type' placeholder="状态">
            <option>请选择</option>
            <option value={1}>微信</option>
            <option value={2}>支付宝</option>
            <option value={3}>专干端扫码支付, 未支付时不返回</option>
          </FormControl>
        </FormGroup>
        {' '}
        <FormGroup>
          <Button bsClass={'btn btn-main'} onClick={this.handleSubmit} type='button'>查询</Button>
        </FormGroup>
      </Form>
    );
  }
}

export default Condition;
