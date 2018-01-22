import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Form,FormGroup,Col,FormControl,ControlLabel,Button} from 'react-bootstrap';
import DB from './DB';
import {alert} from '../../lib/Util';

class ClaimsRuls extends Component{
    constructor(props){
        super(props);
        this.state = {
            update:false,
            ruls:{
                setting_id:null,
                deduction_limit:0.00,
                reim_day_limit:0.00,
                reim_ratio:0.00,
                sick_wait_days:0.00,
                reim_drug_limit:0.00,
                reim_nondrug_limit:0.00,
                reim_total_limit:0.00
            }
        };
        this.changeClaims = this.changeClaims.bind(this);
        this.cancelUpdate = this.cancelUpdate.bind(this);
    }

    changeClaims(){
        this.setState({
            ...this.state,
            update:true
        });
    }

    cancelUpdate(){
        this.setState({
            ...this.state,
            update:false
        });
    }

    handlerInput(e){
        const key  = e.target.name,inputValue = e.target.value;
        // let regAmount = new RegExp(/^\d*(\.)?\d{0,2}/g),regNumber = new RegExp(/\d/g),flag = false;
        /*const tips = {
            deduction_limit:'免赔额必须为数字，且小数位不超过两位',
            reim_day_limit:'每日报销限额必须为数字，且小数位不超过两位',
            reim_drug_limit:'药品报销限额必须为数字，且小数位不超过两位',
            reim_nondrug_limit:'非药品报销限额必须为数字，且小数位不超过两位',
            reim_total_limit:'总报销限额必须为数字，且小数位不超过两位',
            sick_wait_days:'疾病等待天数不能为空',
            reim_ratio:'报销比例必须小于1'
        };*/
        /*const arrAmount = ['deduction_limit','reim_day_limit','reim_drug_limit','reim_nondrug_limit','reim_total_limit'],
              key = e.target.name,inputValue = parseFloat(e.target.value);
        if(arrAmount.indexOf(key) !== -1){
            flag = regAmount.test(e.target.value);
        }
        if(key === 'reim_ratio' && inputValue > 1){
            flag = flag && false;
        }*/
        this.setState({
            ...this.state,
            ruls:{
                ...this.state.ruls,
                [key]:inputValue
            }
        });
    }

    submitHandle(event){
        event.preventDefault();
        const submitData = this.state.ruls;
        const tips = {
            deduction_limit:'免赔额必须为数字，且小数位不超过两位',
            reim_day_limit:'每日报销限额必须为数字，且小数位不超过两位',
            reim_drug_limit:'药品报销限额必须为数字，且小数位不超过两位',
            reim_nondrug_limit:'非药品报销限额必须为数字，且小数位不超过两位',
            reim_total_limit:'总报销限额必须为数字，且小数位不超过两位',
            sick_wait_days:'疾病等待天数不能为空',
            reim_ratio:'报销比例必须小于1'
        };
        const arrAmount = ['deduction_limit','reim_day_limit','reim_drug_limit','reim_nondrug_limit','reim_total_limit'];
        for(let i in submitData){
            const regAmount = new RegExp(/^\d*\.?\d{0,2}$/g),regNumber = new RegExp(/^[0-9]+$/);
            if(arrAmount.indexOf(i) !== -1){
                console.log(i+'   '+submitData[i]);
                if(!regAmount.test(submitData[i])){
                    alert(tips[i]);
                    return false;
                }
                submitData[i] = parseFloat(submitData[i]);
            }else if(i === 'sick_wait_days'){
                if(!regNumber.test(submitData[i])){
                    alert(tips[i]);
                    return false;
                }
                submitData[i] = parseInt(submitData[i]);
            }else if(i === 'reim_ratio'){
                if(submitData[i] >= 1){
                    alert(tips[i]);
                    return false;
                }
                submitData[i] = parseFloat(submitData[i]);
            }
        }
        this.setState({
            ...this.state,
            ruls:{
                ...submitData
            }
        });
        DB.reimSettingUpdate(this.state.ruls).then(result => {
            alert('更新成功');
            this.setState({
                ...this.state,
                update:false
            });
        }).catch(err => {
            alert(err);
        });
    }

    componentDidMount(){
        DB.reimSetting().then(result => {
            this.setState({
                ...this.state,
                ruls:result
            });
        });
    }

    render(){
        return (
            <div className={'claimsRuls'}>
                <Form horizontal={true} onSubmit = {e => {
                    this.submitHandle(e);
                }}>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>免赔额</Col>
                        <Col sm={10}>{this.state.update ?
                            <FormControl defaultValue={this.state.ruls.deduction_limit} name={'deduction_limit'}
                                         onChange={
                                             e=>{
                                                 this.handlerInput(e)
                                             }
                                         }
                            /> :
                            <FormControl.Static componentClass = {'span'}>{this.state.ruls.deduction_limit.toFixed(2)}</FormControl.Static>}元
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>每日报销限额</Col>
                        <Col sm={10}>{this.state.update ?
                            <FormControl defaultValue={this.state.ruls.reim_day_limit} name={'reim_day_limit'}
                                         onChange={
                                             e=>{
                                                 this.handlerInput(e)
                                             }
                                         }
                            />:
                            <FormControl.Static componentClass = {'span'}>{this.state.ruls.reim_day_limit.toFixed(2)}</FormControl.Static>}元
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>报销比例</Col>
                        <Col sm={10}>{this.state.update ?
                            <div>
                                <FormControl defaultValue={this.state.ruls.reim_ratio} name={'reim_ratio'}
                                             onChange={
                                                 e=>{
                                                     this.handlerInput(e)
                                                 }
                                             }/>
                                <span>请将百分比换算成小数填写，比如80%填写为0.8</span>
                            </div>:
                            <FormControl.Static componentClass = {'span'}>{this.state.ruls.reim_ratio}</FormControl.Static>
                        }
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>疾病等待期</Col>
                        <Col sm={10}>{this.state.update ?
                            <FormControl defaultValue={this.state.ruls.sick_wait_days} name={'sick_wait_days'}
                                         onChange={
                                             e=>{
                                                 this.handlerInput(e)
                                             }
                                         }
                            />:
                            <FormControl.Static componentClass = {'span'}>{this.state.ruls.sick_wait_days}</FormControl.Static>}天
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>报销范围及额度</Col>
                        <Col sm={10}>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={1}>药品类</Col>
                                <Col sm={9}>
                                    {this.state.update ?
                                        <FormControl defaultValue={this.state.ruls.reim_drug_limit} name={'reim_drug_limit'}
                                                     onChange={
                                                         e=>{
                                                             this.handlerInput(e)
                                                         }
                                                     }
                                        />:
                                        <FormControl.Static componentClass = {'span'}>{this.state.ruls.reim_drug_limit.toFixed(2)}</FormControl.Static>}元
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={1}>非药品类</Col>
                                <Col sm={9}>
                                    {this.state.update ?
                                        <FormControl defaultValue={this.state.ruls.reim_nondrug_limit} name={'reim_nondrug_limit'}
                                                     onChange={
                                                         e=>{
                                                             this.handlerInput(e)
                                                         }
                                                     }
                                        /> :
                                        <FormControl.Static componentClass = {'span'}>{this.state.ruls.reim_nondrug_limit.toFixed(2)}</FormControl.Static>}元
                                </Col>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>报销总额上限</Col>
                        <Col sm={10}>{this.state.update ?
                            <FormControl name={'reim_total_limit'} defaultValue={this.state.ruls.reim_total_limit}
                                         onChange={
                                             e=>{
                                                 this.handlerInput(e)
                                             }
                            }/>:
                            <FormControl.Static componentClass = {'span'}>{this.state.ruls.reim_total_limit.toFixed(2)}</FormControl.Static> }元
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>{""}</Col>
                        <Col sm={10}>
                            {this.state.update ?
                                <div>
                                    <Button type={'submit'} className={'btn btn-main'}>保存</Button>
                                    <Button type={'button'} className={'btn btn-defalut'} onClick={
                                        this.cancelUpdate
                                    }>取消</Button>
                                </div>:
                                <Button type={'button'} className={'btn btn-main'} onClick={this.changeClaims}>修改</Button>
                            }
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

ReactDOM.render(
    <ClaimsRuls/>,document.getElementById('__claimsRuls/claimsRuls__')
);