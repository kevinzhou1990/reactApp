import React from 'react';
import {Row, Col} from 'react-bootstrap';
import './prod.css';

class Prod extends React.Component {
  render() {
    return (
      <Row className='guestorderList-prod'>
        <Col sm={2} className='guestorderList-prod-img'>
          <img src=''/>
        </Col>
        <Col sm={10}>
          <div>安贝优婴幼儿液体钙，促进宝宝健康成长</div>
          <div>¥<span className='guestorderList-prod-price'>199.00</span></div>
        </Col>
      </Row>
    );
  }
}

export default Prod;
