import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import http from '../../lib/Api/http';
import ApiMap from '../../lib/Api/ApiMap';
import {
    Modal,
    Button
} from 'react-bootstrap';

// 确认删除Modal
export class ComfirmDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.comfirmDelete = this.comfirmDelete.bind(this);
    }

    comfirmDelete() {
        const parms = {
            ...ApiMap.commonData,
            policy_id: common.Util.data('insuranceRecord').policyId, // 辖区外住户detail id
        };

        http({
            url: ApiMap.policyDelete.url,
            method: ApiMap.policyDelete.method,
            data: parms
        })
        .then((res) => {
            if (res.data.ret_code === 1) {
                this.props.hide();
                this.props.getPolicyList();
            } else {
                common.alert(res.data.ret_msg);
            }
        }, (error) => {
            common.alert(error);
        });

        this.props.hide();
    }

    render() {
        const {isShow, hide} = this.props;
        return (
            <Modal show={isShow} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>确认删除</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p style={{textAlign: 'center', marginBottom: 0, padding: '15px 0'}}>是否确认删除？</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={hide}>取消</Button>
                <Button bsStyle="primary" onClick={this.comfirmDelete}>确定</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}