import React from 'react';
import { Modal,Button,FormGroup,ControlLabel,FormControl,Form,Col,HelpBlock } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ApiMap from '../../lib/Api/ApiMap';
import { alert,trim } from '../../lib/Util';
import http from '../../lib/Api/http';

class FilterCrowdDialog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lgShow:false,
            dType:'new',
            vState:{
                tag_text:null
            }
        };
        this.checkForm = this.checkForm.bind(this);
        this.updateState = this.props.update;
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            lgShow:nextProps.lgShow,
            dType:nextProps.dType,
            defaultValue:nextProps.defaultValue
        });
        this.updateState = nextProps.update;
    }

    //表单校验,获取数据
    checkForm(){
        let fm = document.getElementById('newGoodsTag'),
            arr = {},
            vState = {},
            flg = true;
        for(let i = 0; i < fm.elements.length; i ++){
            let v = fm.elements[i];
            if(v.type === 'text'){
                arr[v.name] = trim(v.value);
                trim(v.value) ? vState[v.name] = null : vState[v.name] = 'error';
                flg = flg && trim(v.value);
                const reg = /[^\u4e00-\u9fa5]/gi;
                const hanzi = v.value.replace(reg,'');
                const vlen = (hanzi ? hanzi.length:0)+v.value.length;
                if(vlen > 20){
                    alert('人群分类20个字符');
                    flg = false;
                }
            }
        }
        this.setState({vState});
        return {arr,flg};
    }

    getButton(dType){
        let lgClose = () => this.setState({ lgShow: false }),
            con = this.getDContent(dType);
        const NEW = 'new',UPDATE = 'update',DEL = 'del',DETAIL = 'detail';
        const button =
            <Modal.Footer>
                <Button onClick={lgClose}>取消</Button>
                <Button onClick={  con.confirmFun } bsStyle="primary">确定</Button>
            </Modal.Footer>;
        switch (dType){
            case NEW:
            case UPDATE:
            case DEL:
            default:
                return button;
                break;
            case DETAIL:
                return '';
                break;
        }
    }

    getDContent(dType){
        let content = '',dTypeName = '',confirmFun = () => this.setState({ lgShow:false });
        const NEW = 'new',UPDATE = 'update',DEL = 'del',DETAIL = 'detail';
        switch (dType){
            case NEW:
            default:
                dTypeName = '新增';
                confirmFun = () => {
                    let check = this.checkForm();
                    if(check.flg){
                        //请求新增接口；校验数据是否正确；
                        let data = {...ApiMap.commonData,...check.arr};
                         http({
                             ...ApiMap.newShopCrowd,
                             data
                         }).then(response=>{
                             if(response.data.ret_code === 1){
                                 this.setState({lgShow:false});
                                 this.updateState();
                                 alert('新增成功');
                             }else{
                                 alert(response.data.ret_msg);
                             }
                         }).catch(err=>{
                             console.log(err);
                         });
                    }
                    // this.setState({vState:check.vState});
                };
                content =
                    <Form id="newGoodsTag" horizontal>
                        <FormGroup validationState={this.state.vState.crowd_text}>
                            <Col componentClass={ControlLabel} sm={3}>筛选人群分类：</Col>
                            <Col sm={9}>
                                <FormControl type="text" name="crowd_text" placeholder="人群筛选分类" onChange={this.checkForm} />
                                <HelpBlock className={ this.state.vState.crowd_text ? 'show' : 'hide'}>人群筛选分类不能为空</HelpBlock>
                            </Col>
                        </FormGroup>
                    </Form>;
                break;
            case UPDATE:
                dTypeName = '修改';
                confirmFun = () => {
                    //请求修改接口；校验修改数据；
                    let ck = this.checkForm();
                    if(ck.flg){
                        let data = {
                            ...ApiMap.commonData,
                            crowd_id:this.state.defaultValue.crowd_id,
                            crowd_text:ck.arr.crowd_text
                        };
                        http({
                            ...ApiMap.updateShopCrowd,
                            data
                        }).then(response => {
                            if(response.data.ret_code === 1){
                                this.setState({lgShow:false});
                                this.updateState();
                                alert('修改成功');
                                this.setState({ lgShow:false });
                            }else{
                                alert(response.data.ret_msg);
                            }
                        }).catch(err => {
                            console.log(err)
                        });
                    }
                };
                content =
                    <Form id="newGoodsTag" horizontal>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>编号：</Col>
                            <Col sm={9}>
                                <FormControl name="crowd_no" defaultValue={this.state.defaultValue.crowd_no} type="text" readOnly placeholder="编号"  />
                            </Col>
                        </FormGroup>
                        <FormGroup validationState={this.state.vState.crowd_text}>
                            <Col componentClass={ControlLabel} sm={3}>人群筛选分类：</Col>
                            <Col sm={9}>
                                <FormControl name="crowd_text" type="text" defaultValue = {this.state.defaultValue.crowd_text}
                                             placeholder="人群筛选分类" onChange={this.checkForm} />
                                <HelpBlock className={ this.state.vState.crowd_text ? 'show' : 'hide'}>人群筛选分类不能为空</HelpBlock>
                            </Col>
                        </FormGroup>
                    </Form>;
                break;
            case DEL:
                dTypeName = '删除';
                confirmFun = () => {
                    //请求删除接口，获得结果
                    let data = {
                        ...ApiMap.commonData,
                        crowd_id:this.state.defaultValue.crowd_id
                    };
                    http({
                        ...ApiMap.delShopCrowd,
                        data
                    }).then(response => {
                        let datas = response.data;
                        if(datas.ret_code){
                            alert(datas.ret_msg);
                        }
                        this.updateState();
                    }).catch(err => {
                        console.log(err);
                    });
                    console.log(dType);
                    this.setState({ lgShow:false });
                };
                content =
                    <div className="delTips">
                        <p>是否删除该人群筛选分类？</p>
                        <p className="tip">若该人群筛选分类已关联商品，则不可删除</p>
                    </div>;
                break;
            case DETAIL:
                dTypeName = '详情';
                content =
                    <Form horizontal>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>编号：</Col>
                            <Col sm={9}>
                                <input type="text" className="form-control" readOnly={true} defaultValue={this.state.defaultValue.crowd_no}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>人群筛选分类：</Col>
                            <Col sm={9}>
                                <input type="text" className="form-control" readOnly={true} defaultValue={this.state.defaultValue.crowd_text}/>
                            </Col>
                        </FormGroup>
                    </Form>;
                break;
        }
        return {
            content,dTypeName,confirmFun
        };
    }
    render(){
        let lgClose = () => this.setState({ lgShow: false }),
            con = this.getDContent(this.state.dType);
        return (
            <Modal show={this.state.lgShow} onHide={lgClose} bsSize="large" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title>{con.dTypeName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {con.content}
                </Modal.Body>
                {this.getButton(this.state.dType)}
            </Modal>
        );
    }
}

FilterCrowdDialog.propTypes = {
    lgShow:PropTypes.bool.isRequired,
    dType:PropTypes.oneOf(['new','update','detail','del'])
};
export default FilterCrowdDialog;