import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Form,FormGroup,Col,FormControl,ControlLabel,Button,Radio} from 'react-bootstrap';
import Grid from '../../component/table/Table';
import Container from '../../component/container/Container';
import RefundDialog from './refundDialog';
import {alert, amount_format} from "../../lib/Util";
import DB from "./DB";
import Security from "../../lib/security";

class CalculationRefund extends Component{
    constructor(props){
        super(props);
        this.state = {
            lgshow:false,
            submitData:{
                item_list:[]
            },
            resultData:{}
        };
        this.str = '';
        this.handleInput = this.handleInput.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.getItemInfo = this.getItemInfo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static initItem(){
        return [
            {
                title: '理赔商品编号',
                key: 'item_no',
                dataIndex: 'item_no',
            },
            {
                title: '退费商品总金额',
                key: 'item_amount',
                dataIndex: 'item_amount',
                render(value){
                    return amount_format(value);
                }
            }
        ];
    }

    openDialog(){
        this.setState({
            ...this.state,
            lgshow:true
        })
    }

    getItemInfo(itemInfo){
        this.setState({
            ...this.state,
            submitData:{
                ...this.state.submitData,
                item_list:[...this.state.submitData.item_list,itemInfo]
            },
            lgshow:false
        });
    }

    handleInput(e){
        const ele = e.target,key = ele.name,v = ele.value,p = 'A9BEC16C89860ED816009949054F81C5';
        let auth_str = this.auth_str;
        if(key === 'business_sn'){
            this.auth_str = auth_str = Security.md5.encode(v + p);
        }
        this.setState({
            ...this.state,
            submitData:{
                ...this.state.submitData,
                auth_str,
                [key]:v
            }
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const p = this.state.submitData;
        DB.claimCalculationRefund(p).then((result)=>{
            this.setState({
                ...this.state,
                resultData:result
            });
        }).catch((err)=>{
            this.setState({
                ...this.state,
                resultData:{}
            });
            alert(err);
        })
    }

    render(){
        return (
            <Container title={'退费计算接口测试'} className={'claimCalculation claimsRuls'}>
                <Form horizontal={true} onSubmit={
                    this.handleSubmit
                }>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>业务流水号</Col>
                        <Col sm={10}>
                            <FormControl placeholder={'业务流水号'} name={'business_sn'} onChange={
                                e => {
                                    this.handleInput(e);
                                }
                            }/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>退费流水号</Col>
                        <Col sm={10}>
                            <FormControl placeholder={'退费流水号'} name={'refund_no'} onChange={
                                e => {
                                    this.handleInput(e);
                                }
                            }/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>理赔流水号</Col>
                        <Col sm={10}>
                            <FormControl placeholder={'理赔流水号'} name={'reim_no'} onChange={
                                e => {
                                    this.handleInput(e);
                                }
                            }/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>商品列表</Col>
                        <Col sm={10}>
                            <Grid rowKey={'item_no'} data={this.state.submitData.item_list} columns={CalculationRefund.initItem()}/>
                            <Button className={'btn btn-main'} type={'button'} onClick={
                                this.openDialog
                            } >添加商品</Button>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2}>{}</Col>
                        <Col sm={10}><Button type={'submit'} className={'btn btn-main'}>提交</Button></Col>
                    </FormGroup>
                </Form>

                <div className='showRes'>
                    <p>退费计算结果：</p>
                    <Form horizontal={true}>
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>退回赔付额度</Col>
                            <Col sm={10}>
                                <FormControl.Static>{amount_format(this.state.resultData.reim_refund_amount,true)}</FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>退回自费金额</Col>
                            <Col sm={10}>
                                <FormControl.Static>{amount_format(this.state.resultData.pay_refund_amount,true)}</FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>药品类剩余赔付额度</Col>
                            <Col sm={10}>
                                <FormControl.Static>{amount_format(this.state.resultData.reim_drug_left,true)}</FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>非药品类剩余赔付额度</Col>
                            <Col sm={10}>
                                <FormControl.Static>{amount_format(this.state.resultData.reim_nondrug_left,true)}</FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>总剩余赔付额度</Col>
                            <Col sm={10}>
                                <FormControl.Static>{amount_format(this.state.resultData.reim_total_left,true)}</FormControl.Static>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
                <RefundDialog confirmFun={
                    this.getItemInfo
                } lgshow={this.state.lgshow} />
            </Container>
        );
    }
}

ReactDOM.render(<CalculationRefund />,document.getElementById('__claimCalculation/calculationRefund__'));