import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Container from '../../component/container/Container';
import Prod from '../prod/Prod';
import {logger} from '../../lib/logger';
import {Row, ControlLabel, Col} from 'react-bootstrap';
import ApiMap from '../../lib/Api/ApiMap';
import http from '../../lib/Api/http';
import {payType, formatDateTime, orderStatus, alert, amount_format} from '../../lib/Util';
import './style.css';
const math = require('mathjs');
const common = window.common;
class ShopOrderInfo extends Component {
  constructor(props) {

    super(props);
    this.state = {
      order_no: '',
      create_date: undefined,
      order_amount: 0,
      receipt_name: '',
      receipt_contact: '',
      receipt_address: '',
      create_hecadre: '',
      ship_hecadre: '',
      order_status: '',
      pay_type: '',
      pay_amount: '',
      pay_date: '',
      prod_list: []
    };
  }

  fetchProd() {
    const {url, method, data} = ApiMap.shopOrderInfo;
    const {order_id} = this.props;
    return http({
      url: url,
      method: method,
      data: {
        ...data,
        order_id: order_id
      }
    }).then(result => {
      return result.data;
    }).catch(err => {
      alert('查询订单详情失败。');
      logger(err);
    });
  }

  componentDidMount() {
    logger('componentDidMount');
    this.fetchProd().then(data => {
      if (data.ret_code === 1) {
        this.setState({
          ...data.ret_data
        });
      } else {
        alert(data.ret_msg || '查询订单详情失败。');
        logger(data.ret_msg || '查询订单详情失败。');
      }
    });
  }

  render() {
    return (
      <Container className='flex-auto gird-align' title={'订单管理>>详情'}>
        <Row className='border-bottom'>
          <Col sm={6}>
            <ControlLabel>基本信息</ControlLabel>
          </Col>
          <Col sm={6}>
            <ControlLabel className='pull-right price_color'>{orderStatus(this.state.order_status)}</ControlLabel>
          </Col>
        </Row>
        <div className='prod-baseInfo'>
          <Row className='flex-auto-item'>
            <Col sm={3}>
              <ControlLabel>订单编号：</ControlLabel>
              {this.state.order_no}
            </Col>
            <Col sm={3}>
              <ControlLabel>订单时间：</ControlLabel>
              {formatDateTime(this.state.create_date)}
            </Col>
            <Col sm={3}>
              <ControlLabel>订单金额（元）：</ControlLabel>
              {amount_format(this.state.order_amount)}
            </Col>
            <Col sm={3}>
              <ControlLabel>商品数量：</ControlLabel>
              {this.state.prod_num}
            </Col>
          </Row>
          <Row className='flex-auto-item'>
            <Col sm={3}>
              <ControlLabel>收货人：</ControlLabel>
              {this.state.receipt_name}
            </Col>
            <Col sm={3}>
              <ControlLabel>联系电话：</ControlLabel>
              {this.state.receipt_contact}
            </Col>
            <Col sm={3}>
              <ControlLabel>推荐人：</ControlLabel>
              {this.state.create_hecadre}
            </Col>
            <Col sm={3}>
              <ControlLabel>送货人：</ControlLabel>
              {this.state.ship_hecadre}
            </Col>
          </Row>
          <Row className='flex-auto-item'>
            <Col sm={12}>
              <ControlLabel>地址：</ControlLabel>
              {this.state.receipt_address}
            </Col>
          </Row>
        </div>

        <Row className='border-bottom gird-align'>
          <Col sm={12}>
            <ControlLabel>订单商品</ControlLabel>
          </Col>
        </Row>
        <Row className='text-center'>
          <Col sm={4}>
            商品名称
          </Col>
          <Col sm={4}>
            商品数量
          </Col>
          <Col sm={4}>
            金额
          </Col>
        </Row>
        <div className='prod-item-cnt'>
          {
            this.state.prod_list.map(prod => {
              const prod_imgs = prod.prod_imgs || [];
              const prod_imgs_src = prod_imgs.length > 0
                ? prod_imgs[0]
                : undefined;
              return (
                <Row key={prod.prod_id} className='prod-item'>
                  <Col sm={4}>
                    <Prod prod_imgs_src={prod_imgs_src} prod_price={amount_format(prod.prod_price)} prod_name={prod.prod_name}/>
                  </Col>
                  <Col sm={4} className='guestorder-prod text-center'>
                    {'x'}{prod.prod_num}
                  </Col>
                  <Col sm={4} className='guestorder-prod text-center'>
                    {'¥'}<span className='price_color'>{amount_format(math.eval(prod.prod_num + '*' + prod.prod_price))}</span>
                  </Col>
                </Row>
              );
            })
          }
        </div>
        <Row className='text-center'>
          <Col sm={4}></Col>
          <Col sm={4}>
            {'共'}<span className="price_color">{_.reduce(_.map(this.state.prod_list, (prod) => {
                return prod.prod_num;
              }), (sum, item) => {
                return sum + item;
              })}
            </span>{'件商品'}
          </Col>
          <Col sm={4}>
            {'合计¥'}<span className="price_color">{_.reduce(_.map(this.state.prod_list, (prod) => {
                return amount_format(math.eval(prod.prod_num + '*' + prod.prod_price));
              }), (sum, item) => {
                return amount_format(math.eval(sum + '+' + item));
              })}</span>
          </Col>
        </Row>
        <Row className='border-bottom gird-align'>
          <Col sm={12}>
            <ControlLabel>支付信息</ControlLabel>
          </Col>
        </Row>
        <Row className='prod-payType'>
          <Col sm={4}>
            <ControlLabel>支付方式：</ControlLabel>
            {payType(this.state.pay_type)}
          </Col>
          <Col sm={4}>
            <ControlLabel>实付金额：</ControlLabel>
            {amount_format(this.state.pay_amount)}
          </Col>
          <Col sm={4}>
            <ControlLabel>支付时间：</ControlLabel>
            {formatDateTime(this.state.pay_date)}
          </Col>
        </Row>
      </Container>
    );
  }
}
ReactDOM.render(
  <ShopOrderInfo order_id={common.Util.data('shopOrder/Info')}/>, document.getElementById('__shopOrder/Info__'));
