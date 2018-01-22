import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Container from '../../component/container/Container';
import {Form,FormGroup,Col,FormControl,ControlLabel,Button,Radio} from 'react-bootstrap';
import Grid from '../../component/table/Table';
import ItemDialog from './itemDialog';
import Security from '../../lib/security';
import DB from './DB';
import {amount_format,alert} from '../../lib/Util';

class Calculation extends Component{
    constructor(props){
        super(props);
        this.state = {
            lgShow:false,
            submitData:{
                item_list:[]
            },
            serverData:{}
        };
        this.handleInput = this.handleInput.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.getDialogValue = this.getDialogValue.bind(this);
    }

    handleInput(e){
        e.preventDefault();
        const ele = e.target,key = ele.name,v = ele.value,p = 'A9BEC16C89860ED816009949054F81C5';
        let auth_str = '';
        if(key === 'business_sn'){
            auth_str = Security.md5.encode(v + p);
            this.setState({
                ...this.state,
                submitData:{
                    ...this.state.submitData,
                    auth_str,
                    [key]:v
                }
            })
        }else{
            this.setState({
                ...this.state,
                submitData:{
                    ...this.state.submitData,
                    [key]:v
                }
            })
        }
    }

    handleRadio(e){
        const radio = e.target,key = radio.name;
        this.setState({
            ...this.state,
            submitData:{
                ...this.state.submitData,
                [key]:parseInt(radio.value)
            }
        });
    }

    openDialog(){
        this.setState({
            lgShow:true
        });
    }

    static initItem() {
        return [
            {
                title: '理赔商品编号',
                key: 'item_no',
                dataIndex: 'item_no',
            },
            {
                title: '商品种类',
                key: 'item_cat',
                dataIndex: 'item_cat',
                render(value){
                    return value === 1 ? '药品' : value === 2 ? '非药品' : '';
                }
            },
            {
                title: '商品总金额',
                key: 'item_amount',
                dataIndex: 'item_amount',
                render(value){
                    return amount_format(value);
                }
            }
        ];
    }

    getDialogValue(goodsInfo){
        this.setState({
            ...this.state,
            submitData:{
                ...this.state.submitData,
                item_list:[...this.state.submitData.item_list,goodsInfo]
            },
            lgShow:false
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const p = this.state.submitData;
        DB.claimCalculation(p).then((result)=>{
            if(typeof result !== 'string'){
                this.setState({
                    ...this.state,
                    serverData:result
                });
            }
        }).catch((err)=>{
            this.setState({
                ...this.state,
                serverData:{}
            });
            alert(err);
        })
    }

    render(){
        return (
            <Container title={'理赔计算接口测试'} className={'claimCalculation claimsRuls'}>
                <Form horizontal={true} onSubmit={
                    e => {
                        this.handleSubmit(e)
                    }
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
                        <Col sm={2} componentClass={ControlLabel}>是否疾病</Col>
                        <Col sm={10}>
                            <Radio name='is_sickness'
                                   value={1} inline={true} onClick={
                                (e)=>{
                                    this.handleRadio(e);
                                }
                            }
                            >是</Radio>
                            <Radio name='is_sickness'
                                   value={2} inline={true} onClick={
                                (e)=>{
                                    this.handleRadio(e)
                                }
                            }>否</Radio>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>身份证号码</Col>
                        <Col sm={10}>
                            <FormControl placeholder={'身份证号码'} name={'person_id'} onChange={
                                e => {
                                    this.handleInput(e);
                                }
                            }/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>商品列表</Col>
                        <Col sm={10}>
                            <Grid rowKey={'item_no'} data={this.state.submitData.item_list} columns={Calculation.initItem()}/>
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
                    <p>理赔计算结果：</p>
                    <Form horizontal={true}>
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>理赔金额</Col>
                            <Col sm={10}>
                                <FormControl.Static>{amount_format(this.state.serverData.reim_amount,true)}</FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>自费金额</Col>
                            <Col sm={10}>
                                <FormControl.Static>{amount_format(this.state.serverData.pay_amount,true)}</FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>药品类剩余赔付额度</Col>
                            <Col sm={10}>
                                <FormControl.Static>{amount_format(this.state.serverData.reim_drug_left,true)}</FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>非药品类剩余赔付额度</Col>
                            <Col sm={10}>
                                <FormControl.Static>{amount_format(this.state.serverData.reim_nondrug_left,true)}</FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>总剩余赔付额度</Col>
                            <Col sm={10}>
                                <FormControl.Static>{amount_format(this.state.serverData.reim_total_left,true)}</FormControl.Static>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>

                <ItemDialog lgShow={this.state.lgShow} confirmFun={
                    this.getDialogValue
                } />
            </Container>
        );
    }
}

ReactDOM.render(<Calculation/>,document.getElementById('__claimCalculation/calculation__'));