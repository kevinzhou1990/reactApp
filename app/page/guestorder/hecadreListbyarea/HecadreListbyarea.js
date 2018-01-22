import React, {Component} from 'react';
// import _ from 'lodash';
import PropTypes from 'prop-types';
import {Modal, Button, Col, Grid, Row} from 'react-bootstrap';
import {logger} from '../../../lib/logger';
import Gird from '../../../component/table/Table';
// import {alert} from '../../../lib/Util';
import Condition from './ConditionForm';
import PageNation from '../../../component/pageNation/pageNation';


class HecadreListbyarea extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '',
        dataIndex: 'hecadre_uid',
        key: 'hecadre_uid',
        align: 'center',
        render: (value, row) =>{
          debugger;
          logger(row.hecadre_uid === this.props.hecadre_uid)
          return <input
                  type='radio'
                  checked={row.hecadre_uid === this.props.hecadre_uid}
                  value={row.hecadre_uid}
                  onClick={(e) => {this.handleRadioCheck(e);}}
                  name='hecadre_uid'/>;
        }
      }, {
        title: '姓名',
        dataIndex: 'hecadre_name',
        key: 'hecadre_name'
      }, {
        title: '性别',
        dataIndex: 'hecadre_sex',
        key: 'hecadre_sex'
      }, {
        title: '单位',
        dataIndex: 'hecadre_station',
        key: 'hecadre_station'
      }, {
        title: '科室',
        dataIndex: 'hecadre_department',
        key: 'hecadre_department'
      }, {
        title: '职务',
        dataIndex: 'hecadre_title',
        key: 'hecadre_title'
      }, {
        title: '全/兼职',
        dataIndex: 'hecadre_worktype',
        key: 'hecadre_worktype'
      }
    ];
    this.checkValue = '';
    this.handleRadioCheck = this.handleRadioCheck.bind(this);
    this.hideHecadreModal = this.hideHecadreModal.bind(this);
    this.assignHecadre = this.assignHecadre.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleGetPage = this.handleGetPage.bind(this);
  }

  assignHecadre(){
    this.props.assignHecadre({
      hecadre_uid: this.props.hecadre_uid,
      guest_order_id: this.props.guest_order_id
    });
  }

  handleRadioCheck(e){
    // this.checkValue = parseInt(e.target.value);
    const hecadre_uid = parseInt(e.target.value);
    this.props.handleRadioCheck(hecadre_uid);
    logger(this.checkValue);
  }

  handleGetPage(pageArgs){
    this.props.handleGetPage(pageArgs);
  }

  handleSelectChange(){
    this.props.handleSelectChange();
  }

  hideHecadreModal() {
    this.props.hideHecadreModal();
  }



  render() {
    return (
      <Modal bsSize='large' show={this.props.show}>
        <Modal.Header>
          <Modal.Title>指定健管师</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid className={'modalbody-container'}>
            <Row className="show-grid padding-align">
              <Col xs={12} md={12}>
                <Condition {...this.props}/>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={12} md={12}>
                <Gird rowKey='hecadre_uid' columns={this.columns} data={this.props.girdData}/>
                <PageNation pageCount={this.props.pageCount} getPage={this.handleGetPage} currentPage={this.props.currentPage} pageNumber={this.props.pageNumber}/>
              </Col>
            </Row>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hideHecadreModal}>取消</Button>
          <Button className='btn btn-main' onClick={this.assignHecadre}>确认</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


Condition.propTypes = {
  show: PropTypes.bool.isRequired,
  begin: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  guest_order_id: PropTypes.number.isRequired,
  hecadre_uid: PropTypes.number.isRequired,
  girdData: PropTypes.array.isRequired,
  assignHecadre: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  hideHecadreModal: PropTypes.func.isRequired,
  handleGetPage: PropTypes.func.isRequired,
  handleRadioCheck: PropTypes.func.isRequired
};

export default HecadreListbyarea;
