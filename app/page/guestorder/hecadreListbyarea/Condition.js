import React, {Component} from 'react';
import _ from 'lodash';
import {logger} from '../../../lib/logger';
import ApiMap from '../../../lib/Api/ApiMap';
import http from '../../../lib/Api/http';
import {alert} from '../../../lib/Util';
// import PropTypes from 'prop-types';
import {Form, FormGroup, ControlLabel, Button, FormControl} from 'react-bootstrap';
const EventEmitter = require('events');
class Condition extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // province_area_id: '',
      // city_area_id: '',
      // district_area_id: '',
      // street_area_id: '',
      // station_id: '',
      province: [],
      city: [],
      district: [],
      street: [],
      station: props.station_list
    };
    this.city = {}; //city 列表
    this.district = {}; //district 列表
    this.street = {}; //street 列表
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleProviceChange = this.handleProviceChange.bind(this);
    this.handleDistrictChange = this.handleDistrictChange.bind(this);
    this.getData = this.getData.bind(this);
    this.props.conditionRef(this);
    this.event = new EventEmitter();
  }

  handleSubmit() {
    logger(this.state);
    this.props.handleSubmit(this.state);
  }

  getData() {
    return _.pick(this.state, ['province_area_id', 'city_area_id', 'district_area_id', 'street_area_id', 'station_id']);
  }

  handleSelectChange(event) {
    const target = event.target;
    const name = target.name;
    const value = parseInt(target.value) || 0;
    // this.setState({[name]: value});
    this.props.handleConditionChange({[name]: value});
  }

  // 获取行政区域
  fetchArealist(condition) {
    return new Promise((resolve, reject) => {
      http({
        url: ApiMap.getArealist.url,
        method: ApiMap.getArealist.method,
        data: {
          ...ApiMap.getArealist.data,
          ...condition
        }
      }).then(result => {
        logger(result);
        const data = result.data;
        if (data.ret_code === 1) {
          resolve(data.ret_data);
        } else {
          reject(data.ret_msg);
        }
      }).catch(err => {
        reject('查询省市县失败');
        logger(err);
      });
    });
  }

  handleAreaChange(id, areaType, areaId){
    if (!id) {
      this.setState({[areaType]: [], [areaId]: ''});
    } else if (this.city[id]) {
      this.setState({[areaType]: this.city[id], [areaId]: ''});
    } else {
      //获取市
      this.fetchArealist({area_id_higher: id}).then(data => {
        // 存入缓存
        this.city[id] = data;
        this.setState({[areaType]: data, [areaId]: ''});
      });
    }
  }

  handleProviceChange(id) {
    if (!id) {
      this.setState({city: [], city_area_id: ''});
    } else if (this.city[id]) {
      this.setState({city: this.city[id], city_area_id: ''});
    } else {
      //获取市
      this.fetchArealist({area_id_higher: id}).then(data => {
        // 存入缓存
        this.city[id] = data;
        this.setState({city: data, city_area_id: ''});
      });
    }
  }

  handleCityChange(id) {
    if (!id) {
      this.setState({district: [], district_area_id: ''});
    } else if (this.district[id]) {
      this.setState({district: this.district[id], district_area_id: ''});
    } else {
      //获取市
      this.fetchArealist({area_id_higher: id}).then(data => {
        // 存入缓存
        this.district[id] = data;
        this.setState({district: data, district_area_id: ''});
      });
    }
  }

  handleDistrictChange(id) {
    if (!id) {
      this.setState({street: [], street_area_id: ''});
    } else if (this.street[id]) {
      this.setState({street: this.street[id], street_area_id: ''});
    } else {
      //获取市
      this.fetchArealist({area_id_higher: id}).then(data => {
        // 存入缓存
        this.street[id] = data;
        this.setState({street: data, street_area_id: ''});
      });
    }
  }

  componentDidMount() {
    this.event.on('proviceChange', this.handleProviceChange);
    this.event.on('cityChange', this.handleCityChange);
    this.event.on('districtChange', this.handleDistrictChange);
    // 获取省
    this.fetchArealist().then(result => {
      this.setState({province: result});
    }).catch(err => {
      alert(err);
    });

  }

  componentDidUpdate(prevProps, prevState) {
    // 区域级联
    if (prevState.province_area_id !== this.props.province_area_id) {
      this.event.emit('proviceChange', this.props.province_area_id);
    }
    if (prevState.city_area_id !== this.props.city_area_id) {
      this.event.emit('cityChange', this.state.city_area_id);
    }
    if (prevState.district_area_id !== this.state.district_area_id) {
      this.event.emit('districtChange', this.state.district_area_id);
    }

  }

  render() {
    return (
      <Form inline>
        <FormGroup controlId="province_area_id">
          <ControlLabel>选择社区卫生站</ControlLabel>
          {' '}
          <FormControl componentClass="select" value={this.props.province_area_id} onChange={this.handleSelectChange} name='province_area_id' placeholder="省">
            <option>请选择</option>
            {this.state.province.map(item => {
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
            {this.state.city.map(item => {
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
            {this.state.district.map(item => {
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
              this.state.street.map(item => {
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
              this.state.station.map(item => {
                return (
                  <option key={item.station_id} value={item.station_id}>{item.station_name}</option>
                );
              })
            }
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
