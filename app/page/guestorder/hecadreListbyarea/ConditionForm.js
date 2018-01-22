import React, {Component} from 'react';
import _ from 'lodash';
import {logger} from '../../../lib/logger';
import ApiMap from '../../../lib/Api/ApiMap';
import http from '../../../lib/Api/http';
import {alert} from '../../../lib/Util';
import PropTypes from 'prop-types';
import {Form, FormGroup, ControlLabel, Button, FormControl} from 'react-bootstrap';
class Condition extends Component {

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSearch() {
    logger(this.state);
    this.props.handleSearch(this.state);
  }

  getData() {
    return _.pick(this.state, ['province_area_id', 'city_area_id', 'district_area_id', 'street_area_id', 'station_id']);
  }

  handleSelectChange(event) {
    const target = event.target;
    const name = target.name;
    const value = parseInt(target.value) || 0;
    this.props.handleSelectChange({[name]: value});
    // this.setState({[name]: value});
  }



  render() {
    return (
      <Form inline>
        <FormGroup controlId="province_area_id">
          <ControlLabel>选择社区卫生站</ControlLabel>
          {' '}
          <FormControl componentClass="select" value={this.props.province_area_id} onChange={this.handleSelectChange} name='province_area_id' placeholder="省">
            <option>请选择</option>
            {this.props.province.map(item => {
              return (
                <option key={item.area_id} value={item.area_id}>{item.area_name}</option>
              );
            })
          }
            <option>省</option>
          </FormControl>
        </FormGroup>
        {' '}
        <FormGroup controlId="city_area_id">
          <FormControl componentClass="select" value={this.props.city_area_id} onChange={this.handleSelectChange} name='city_area_id' placeholder="市">
            <option>请选择</option>
            {this.props.city.map(item => {
              return (
                <option key={item.area_id} value={item.area_id}>{item.area_name}</option>
              );
            })
          }
          </FormControl>
        </FormGroup>
        {' '}
        <FormGroup controlId="district_area_id">
          <FormControl componentClass="select" value={this.props.district_area_id} onChange={this.handleSelectChange} name='district_area_id' placeholder="区/县">
            <option>请选择</option>
            {this.props.district.map(item => {
              return (
                <option key={item.area_id} value={item.area_id}>{item.area_name}</option>
              );
            })
          }
          </FormControl>
        </FormGroup>
        {' '}
        <FormGroup controlId="street_area_id">
          <FormControl componentClass="select" value={this.props.street_area_id} onChange={this.handleSelectChange} name='street_area_id' placeholder="街道">
            <option>请选择</option>
            {
              this.props.street.map(item => {
                return (
                  <option key={item.area_id} value={item.area_id}>{item.area_name}</option>
                );
              })
            }
          </FormControl>
        </FormGroup>
        {' '}
        <FormGroup controlId="station_id">
          <FormControl componentClass="select" value={this.props.station_id} onChange={this.handleSelectChange} name='station_id' placeholder="单位">
            <option>请选择</option>
            {
              this.props.station.map(item => {
                return (
                  <option key={item.station_id} value={item.station_id}>{item.station_name}</option>
                );
              })
            }
          </FormControl>
        </FormGroup>
        {' '}
        <FormGroup>
          <Button bsClass={'btn btn-main'} onClick={this.handleSearch} type='button'>查询</Button>
        </FormGroup>
      </Form>
    );
  }
}

Condition.propTypes = {
  province_area_id: PropTypes.number,
  city_area_id: PropTypes.number,
  district_area_id: PropTypes.number,
  street_area_id: PropTypes.number,
  station_id: PropTypes.number,
  province: PropTypes.array.isRequired,
  city: PropTypes.array.isRequired,
  district: PropTypes.array.isRequired,
  street: PropTypes.array.isRequired,
  station: PropTypes.array.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired
};

export default Condition;
