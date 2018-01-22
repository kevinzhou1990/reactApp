import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Form, 
    FormGroup,
  ControlLabel,
  Button,
  FormControl,
  Checkbox
} from 'react-bootstrap';

class OperateForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.toggleHecadre = this.toggleHecadre.bind(this);
    this.toggleInhabitant = this.toggleInhabitant.bind(this);
  }

  toggleHecadre(e) {
    this.props.selectHecadre(e.target.value);
  }

  toggleInhabitant(e) {
    this.props.selectInhabitant(e.target.value);
  }

  render() {
    const {healthManagerModal, patchDelete, handleClickSearch, allHecadreList} = this.props;
    return (
      <Form inline className="clearfix">
        <div className="pull-left">
            <FormGroup>
                {/* <ControlLabel>管辖者</ControlLabel> */}
                {' '}
                <FormControl
                    componentClass="select"
                    value={this.state.station_in_sale}
                    name='station_in_sale'
                    placeholder="管辖者"
                    onChange={this.toggleHecadre}>
                    <option value="">管辖者</option>
                    {allHecadreList.map((item, index) =>
                      <option value={item.hecadre_uid} key={index}>{item.hecadre_name}</option>
                    )}
                </FormControl>
            </FormGroup>
            {' '}
            <FormGroup controlId="station_in_sale">
                {/* <ControlLabel>居民数量</ControlLabel> */}
                {' '}
                <FormControl
                    componentClass="select"
                    value={this.state.station_in_sale}
                    name='station_in_sale'
                    placeholder="居民数量"
                    onChange={this.toggleInhabitant}>
                    <option value="0">居民数量</option>
                    <option value="2">无居民</option>
                    <option value="1">有居民</option>
                </FormControl>
            </FormGroup>
            {' '}
            <FormGroup controlId="station_in_sale">
                <Button bsClass={'btn btn-main'} type='button' onClick={handleClickSearch}>查询</Button>
            </FormGroup>
        </div>
        <div className="pull-right">
            <FormGroup controlId="station_in_sale">
                <Button bsClass={'btn btn-main'} type='button' onClick={healthManagerModal}>重新分配管理师</Button>
            </FormGroup>
            {' '}
            {/* <FormGroup controlId="station_in_sale">
                <Button bsClass={'btn btn-main'} type='button' onClick={patchDelete}>删除</Button>
            </FormGroup> */}
        </div>
      </Form>
    );
  }
}

OperateForm.propTypes = {
};

export default OperateForm;