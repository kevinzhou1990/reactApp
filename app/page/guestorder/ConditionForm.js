import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Form, FormGroup, ControlLabel, Button, FormControl} from 'react-bootstrap';
import DateRange from '../../component/DateRange';
import {logger} from '../../lib/logger';



class Condition extends Component {

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleCreateStart = this.handleCreateStart.bind(this);
    this.handleCreateEnd = this.handleCreateEnd.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleSearch() {
    this.props.handleSearch(this.state);
  }

  handleDateChange(name, value) {
    this.props.handleDateChange(name, value);
  }

  handleCreateStart(value, formattedValue) {
    this.props.handleCreateStart(value, formattedValue);
  }

  handleCreateEnd(value, formattedValue) {
    this.props.handleCreateEnd(value, formattedValue);
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
    // this.setState({[name]: target.value});
    this.props.handleInputChange({[name]: value});
  }

  render() {
    const create_start = this.props.create_start && moment(this.props.create_start);
    const create_end = this.props.create_end && moment(this.props.create_end);
    return (
      <Form inline>
        <FormGroup controlId="guest_order_no">
          <ControlLabel>意向单号</ControlLabel>
          {' '}
          <FormControl type="text" name='guest_order_no' onChange={this.handleInputChange} value={this.props.guest_order_no} placeholder="意向单号"/>
        </FormGroup>
        {' '}
        <FormGroup>
          <ControlLabel>提交时间</ControlLabel>
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
        <FormGroup controlId="guest_order_status">
          <ControlLabel>状态</ControlLabel>
          {' '}
          <FormControl componentClass="select" value={this.props.guest_order_status} onChange={this.handleSelectChange} name='guest_order_status' placeholder="状态">
            <option>请选择</option>
            <option value={1}>待指定</option>
            <option value={2}>待处理</option>
            <option value={3}>已处理</option>
            <option value={4}>已取消</option>
            <option value={5}>已拒绝</option>
          </FormControl>
        </FormGroup>
        {' '}
        <FormGroup controlId="station_in_sale">
          <Button bsClass={'btn btn-main'} onClick={this.handleSearch} type='button'>查询</Button>
        </FormGroup>
      </Form>
    );
  }
}
Condition.propTypes = {
  create_start: PropTypes.number,
  create_end: PropTypes.number,
  guest_order_no: PropTypes.string.isRequired,
  receipt_name: PropTypes.string.isRequired,
  receipt_contact: PropTypes.string.isRequired,
  guest_order_status: PropTypes.number.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleCreateStart: PropTypes.func.isRequired,
  handleCreateEnd: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired
};
export default Condition;
