import React,{ Component } from 'react';
import { Modal,Form,FormGroup,ControlLabel,FormControl,Col,Button} from 'react-bootstrap';
import {alert} from '../../lib/Util';
import PropTypes from 'prop-types';

class PriceCheckDialog extends Component{
    constructor(props){
        super(props);
        this.state = {
            checkShow:false,
            adjectInfo:{},
            checkType:'approval'
        };
    }

    //收到props，还未重新渲染的的状态(生命周期函数)
    componentWillReceiveProps(nextProps){
        this.setState({
            checkShow:nextProps.checkShow,
            adjectInfo:nextProps.adjectInfo,
            checkType:nextProps.checkType
        });
    }

    getApplyState(checkType){
        let status = '';
        const APPROVAL = 'approval',REJECT = 'reject'
        switch (checkType){
            default:
            case APPROVAL:
                status = <div className="pass">是否确认通过该申请？</div>;
                break;
            case REJECT:
                status = <div className="reject">是否拒绝通过该申请？</div>;
                break;
        }
        return status;
    }

    getMemo(){
        if(this.textarea.value.length > 100){
            alert('备注不能超过100个字符');
            return false;
        }
        let msg = '审核已通过';
        if(this.state.checkType !== 'approval'){
            msg = '已拒绝该申请';
        }
        this.props.confim({
            ...this.state.adjectInfo,
            audit_memo:this.textarea.value,
            adjust_status:this.state.checkType === 'approval' ? 2 : 3
        },msg)
    }

    render(){
        let lgClose = () => this.setState({ checkShow: false }),that = this;
        return (
            <Modal show={this.state.checkShow} onHide={lgClose} bsSize="large" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>{this.state.checkType === 'approval' ? '审核通过' : '拒绝通过'}</Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        {this.getApplyState(this.state.checkType)}
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>备注：</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl name="audit_memo" componentClass="textarea" inputRef={ref => { this.textarea = ref; }} />
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={lgClose}>取消</Button>
                    <Button onClick={
                        () => {
                            that.getMemo();
                        }
                    } bsStyle="primary">确定</Button>
                </Modal.Footer>;
            </Modal>
        );
    }
}

PriceCheckDialog.propTypes = {
    checkShow:PropTypes.bool.isRequired,
    adjectInfo:PropTypes.object.isRequired,
    checkType:PropTypes.oneOf(['approval','reject'])
};
export default PriceCheckDialog;