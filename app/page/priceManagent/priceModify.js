import React,{Component} from 'react';
import { Modal,Form,FormGroup,ControlLabel,FormControl,Col,Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { formatDateTime } from '../../lib/Util';

class PriceModify extends Component{
    constructor(props){
        super(props);
        this.state = {
            lgShow:false,
            goodsInfo:{}
        };
    }

    //收到props，还未重新渲染的的状态(生命周期函数)
    componentWillReceiveProps(nextProps){
        this.setState({
            lgShow:nextProps.lgShow,
            goodsInfo:nextProps.goodsInfo
        });
    }

    getApplyState(stateCode){
        if(this.state.goodsInfo){
            let status = '';
            switch (stateCode){
                case 1:
                    status = <div className="wait">待审核</div>;
                    break;
                case 2:
                    status = <div className="pass">已审核</div>;
                    break;
                case 3:
                    status = <div className="reject">已拒绝</div>;
                    break;
                case 4:
                    status = <div className="canceled">已取消</div>;
                    break;
                default:
                    break;
            }
            return status;
        }
    }
    render(){
        let lgClose = () => this.setState({ lgShow: false });
        return (
            <Modal show={this.state.lgShow} onHide={lgClose} bsSize="large" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>调价</Modal.Header>
                <Modal.Body>
                    {this.getApplyState(this.state.goodsInfo.adjust_status)}
                    <Form horizontal>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>商品编号：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="prod_no" defaultValue={this.state.goodsInfo.prod_no} readOnly/>
                            </Col>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>商品名称：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="prod_name" defaultValue={this.state.goodsInfo.prod_name} readOnly/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>商品产地：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="prod_src" defaultValue={this.state.goodsInfo.prod_src} readOnly/>
                            </Col>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>商品规格：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="prod_spec" defaultValue={this.state.goodsInfo.prod_spec} readOnly/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>调价类型：</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl name="adjust_type" defaultValue={this.state.goodsInfo.adjust_type} componentClass="select" disabled>
                                    <option value={1}>原价</option>
                                    <option value={2}>售价</option>
                                </FormControl>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>调价前价格：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="price_before" defaultValue={this.state.goodsInfo.price_before} readOnly/>
                            </Col>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>调价后价格：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="price_after" defaultValue={this.state.goodsInfo.price_after} placeholder="调价后价格" readOnly/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>申请人：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="create_by" defaultValue={this.state.goodsInfo.create_by} readOnly/>
                            </Col>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>申请时间：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="create_date" defaultValue={formatDateTime(this.state.goodsInfo.create_date)} placeholder="发起时间" readOnly/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>审核人：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="audit_by" defaultValue={this.state.goodsInfo.audit_by} readOnly/>
                            </Col>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>审核时间：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="audit_date" defaultValue={this.state.goodsInfo.audit_date ? formatDateTime(this.state.goodsInfo.audit_date) : ''} placeholder="审核时间" readOnly/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>审核备注：</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl componentClass="textarea" name="audit_memo" defaultValue={this.state.goodsInfo.audit_memo} readOnly/>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

PriceModify.propTypes = {
    lgShow:PropTypes.bool.isRequired,
    goodsInfo:PropTypes.object.isRequired
};
export default PriceModify;