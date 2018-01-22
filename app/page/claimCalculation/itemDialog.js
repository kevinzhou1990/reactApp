import React,{Component} from 'react';
import { Modal,Button,FormGroup,ControlLabel,FormControl,Form,Col,Radio  } from 'react-bootstrap';
import PropTypes from 'prop-types';

class ItemDialog extends Component{
    constructor(props){
        super(props);
        this.state = {
            lgShow:false
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            lgShow:nextProps.lgShow
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const fm = e.target;
        let goodsInfo = {};
        for(let ele of fm){
            const key = ele.name,v = ele.value;
            if(key){
                if(ele.type === 'radio'){
                    if(ele.checked){
                        goodsInfo[key] = parseInt(v);
                    }
                }
                if(ele.type === 'text'){
                    goodsInfo[key] = v;
                }
                if(ele.name === 'item_amount'){
                    goodsInfo[key] = parseFloat(v);
                }
            }
        }
        this.setState({lgShow:false});
        this.props.confirmFun(goodsInfo);
    }

    render(){
        let lgClose = () => this.setState({ lgShow: false });
        return (
            <Modal show={this.state.lgShow} onHide={lgClose} bsSize="large" aria-labelledby="contained-modal-title-lg" id={'itemContent'}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>新增理赔商品</Modal.Title>
                    <Modal.Body>
                        <div className={'claimsRuls'}>
                            <Form horizontal={true} onSubmit={
                                e => {
                                    this.handleSubmit(e)
                                }
                            }>
                                <FormGroup>
                                    <Col sm={2} componentClass={ControlLabel}>商品编号</Col>
                                    <Col sm={10}>
                                        <FormControl name={'item_no'} placeholder={'理赔商品编号'}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col sm={2} componentClass={ControlLabel}>商品种类</Col>
                                    <Col sm={10}>
                                        <Radio name={'item_cat'} value={1} inline={true}>药品</Radio>
                                        <Radio name={'item_cat'} value={2} inline={true}>非药品</Radio>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col sm={2} componentClass={ControlLabel}>商品总金额</Col>
                                    <Col sm={10}>
                                        <FormControl name={'item_amount'} placeholder={'商品总金额'}/>
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup>
                                    <Col sm={2} componentClass={ControlLabel}>商品总金额</Col>
                                    <Col sm={10}>
                                        <Radio name={'item_reimable'} value={1} inline={true}>可理赔</Radio>
                                        <Radio name={'item_reimable'} value={2} inline={true}>不可理赔</Radio>
                                    </Col>
                                </FormGroup>*/}
                                <div className={'center'}>
                                    <Button type={'submit'} className={'btn btn-main'}>确认</Button>
                                    <Button type={'button'} onClick={lgClose}>取消</Button>
                                </div>
                            </Form>
                        </div>
                    </Modal.Body>
                </Modal.Header>
            </Modal>
        );
    };
}

ItemDialog.propTypes = {
    lgShow:PropTypes.bool.isRequired,
    confirmFun:PropTypes.func.isRequired
};
export default ItemDialog;