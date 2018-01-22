import React,{Component} from 'react';
import { Modal,Form,FormGroup,ControlLabel,FormControl,Col,Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {alert} from '../../lib/Util';

class PriceMaDialog extends Component{
    constructor(props){
        super(props);
        this.state = {
            lgShow:false,
            goodsInfo:{
                ...props.goodsInfo,
                adjust_type:1
            },
            showPrice:props.goodsInfo.prod_original_price
        };
    }

    //收到props，还未重新渲染的的状态(生命周期函数)
    componentWillReceiveProps(nextProps){
        this.setState({
            lgShow:nextProps.lgShow,
            goodsInfo:{
                ...nextProps.goodsInfo,
                adjust_type:1
            },
            showPrice:nextProps.goodsInfo.prod_original_price,
            showButton:nextProps.showButton
        });
    }
    checkValue(){
        const ajectTypeTag = parseInt(this.adjectType.value);
        const reg = /^\+?[0-9]\d*.[0-9]{0,2}$/g;
        if(ajectTypeTag !== 1){
            if(reg.test(this.state.goodsInfo.target_price)&&this.state.goodsInfo.target_price > 0){
                this.props.confim(this.state.goodsInfo);
            }else{
                alert('调价后价格应为数字，且不能为空');
            }
        }else{
            this.props.confim(this.state.goodsInfo);
        }
    }
    //根据状态获取底部按钮
    getButton(){
        let lgClose = () => this.setState({ lgShow: false }),that = this;
        let button =
            <Modal.Footer>
                <Button onClick={lgClose}>取消</Button>
                <Button onClick={
                    () => {
                        that.checkValue()
                    }
                } bsStyle="primary">确定</Button>
            </Modal.Footer>;
        if(this.state.showButton){
            return button;
        }
    }

    //更改不同调价类型
    changeType(ev){
        let showPrice = this.state.goodsInfo.prod_original_price?this.state.goodsInfo.prod_original_price:'';
        if(parseInt(ev.target.value) !== 1){
            showPrice = this.state.goodsInfo.prod_price?this.state.goodsInfo.prod_price:'';
        }
        this.setState({
            ...this.state,
            goodsInfo:{
                ...this.state.goodsInfo,
                adjust_type:ev.target.value
            },
            showPrice
        });
    }

    //获取调整后的价格
    setTargetPrice(ev){
        const pirce = ev.target.value;
        this.setState({
            goodsInfo:{
                ...this.state.goodsInfo,
                target_price:pirce
            }
        });
    }
    getApplyState(stateCode){
        if(this.state.showButton){
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
                                <ControlLabel>助记码：</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl name="prod_assist_code" defaultValue={this.state.goodsInfo.prod_assist_code} readOnly/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>调价类型：</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl name="adjust_type"
                                             inputRef={ref => { this.adjectType = ref; }}
                                             onChange={
                                    ev => this.changeType(ev)
                                }
                                             defaultValue={this.state.goodsInfo.adjust_type}
                                             componentClass="select"
                                             disabled={!this.state.showButton}>
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
                                <FormControl name={this.state.goodsInfo.adjust_type === 1 ? 'prod_original_price' : 'prod_price'}
                                             value={
                                                 this.state.showPrice
                                             } readOnly/>
                            </Col>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>调价后价格：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="target_price" onChange={ev => {
                                    this.setTargetPrice(ev)
                                }} placeholder="调价后价格" readOnly={!this.state.showButton}/>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                {this.getButton()}
            </Modal>
        );
    }
}

PriceMaDialog.propTypes = {
    lgShow:PropTypes.bool.isRequired,
    goodsInfo:PropTypes.object.isRequired
};
export default PriceMaDialog;