import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ApiMap from '../../lib/Api/ApiMap';
import http from '../../lib/Api/http';
import {logger} from '../../lib/logger';
import {alert} from '../../lib/Util';
import {
  Modal,
  Button,
  Col,
  Grid,
  Row,
  FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap';

class ModifyProd extends Component {
  constructor(props) {
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.updateProd = this.updateProd.bind(this);
    this.doEntry = this.doEntry.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(){
    this.props.closeModal();
  }

  doEntry(){
    this.props.updateProd();
  }


  updateProd(){
    this.update({
      station_in_sale: this.props.station_in_sale,
      prod_id: this.props.prod_id
    }).then(result => {
      this.props.handleupdateProd(result);
      logger(result);
    }).catch(err => {
      alert(err);
    });
  }

  // 请求标签数据
  update(condition) {
    return new Promise((resolve, reject) => {
      const params = ApiMap.stationProdUpdate;
      http({
        url: params.url,
        method: params.method,
        data: {
          ...params.data,
          ...condition
        }
      }).then(result => {
        const data = result.data;
        if (data.ret_code === 1) {
          resolve(data.ret_data);
        } else {
          reject(data.ret_msg);
        }
      }).catch(err => {
        reject('请求数据失败');
        logger(err);
      });
    });
  }

  handleSelectChange(event){
    let target = event.target;
    const value = parseInt(target.value);
    this.props.handleSelectChange({
      station_in_sale: value
    });
  }

  hideModal(){
    this.props.handleHideModal();
  }

  render() {
    const {
      prod_no,
      prod_name,
      prod_src,
      prod_spec,
      show
    } = this.props;
    return (
      <Modal show={show}>
        <Modal.Header closeButton={true} onHide={this.closeModal}>
          <Modal.Title>修改</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid className={'modalbody-container'}>
            <Row className="show-grid">
              <Col xs={6} md={6}>
                <FormGroup controlId="prod_no">
                  <ControlLabel>商品编号</ControlLabel>
                  {' '}
                  <FormControl className='input-value' readOnly type="text" placeholder="商品编号" value={prod_no}/>
                </FormGroup>
              </Col>
              <Col xs={6} md={6}>
                <FormGroup controlId="prod_name">
                  <ControlLabel>商品名称</ControlLabel>
                  {' '}
                  <FormControl readOnly className='input-value' type="text" placeholder="商品名称" value={prod_name}/>
                </FormGroup>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={6} md={6}>
                <FormGroup controlId="prod_src">
                  <ControlLabel>商品产地</ControlLabel>
                  {' '}
                  <FormControl readOnly className='input-value' type="text" placeholder="商品产地" value={prod_src}/>
                </FormGroup>
              </Col>
              <Col xs={6} md={6}>
                <FormGroup controlId="prod_spec">
                  <ControlLabel>商品规格</ControlLabel>
                  {' '}
                  <FormControl readOnly className='input-value' type="text" placeholder="商品规格" value={prod_spec}/>
                </FormGroup>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={6}>
                <FormGroup controlId="prod_spec">
                  <ControlLabel>是否上架</ControlLabel>
                  {' '}
                  <FormControl componentClass="select" value={this.props.station_in_sale} onChange={this.handleSelectChange} name='station_in_sale' placeholder="是否上架">
                    <option value={2}>未上架</option>
                    <option value={1}>上架</option>
                  </FormControl>
                </FormGroup>
              </Col>
            </Row>

          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hideModal}>取消</Button>
          <Button className='btn btn-main' onClick={this.doEntry}>确认</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
ModifyProd.propTypes = {
  station_in_sale: PropTypes.number.isRequired,
  prod_no: PropTypes.string.isRequired,
  prod_name: PropTypes.string.isRequired,
  prod_src: PropTypes.string.isRequired,
  prod_spec: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  handleHideModal: PropTypes.func.isRequired,
  updateProd: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default ModifyProd;
