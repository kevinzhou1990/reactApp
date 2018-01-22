import React,{Component} from 'react';
import ReactDom from 'react-dom';
import Container from '../../component/container/Container';
import { Form,Clearfix,FormGroup,ControlLabel,FormControl,Col,Button } from 'react-bootstrap';
import http from '../../lib/Api/http';
import { converson } from '../../lib/Util';
import ApiMap from '../../lib/Api/ApiMap';
import GoodsDialog from './goodsTagDialog';
import './newGoods.css';

class GoodsDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            //提交使用的
            goodsMsg:{
                prod_no:'',
                prod_name:'',
                prod_src:'',
                prod_spec:'',
                prod_apprv_no:'',
                prod_valid_month:1,
                prod_pkg_unit:1,
                prod_assist_code:'',
                prod_price:0.0,
                prod_original_price:1.0,
                prod_cat:1,
                prod_country_flag:1,
                prod_in_sale:1,
                prod_allow_sale:1,
                prod_display:1,
                prod_tags:[],
                prod_crowds:[],
                prod_ingreds:'',
                prod_memo:'',
                prod_imgs:[],
                prod_intro:''
            },
            //页面状态
            goods_cat:[],
            lgShow:false,
            tagList:[],
            tagsText:'',
            crowText:'',
            dialogName:'商品标签',
            dataKey:'prod_tags',
            showImg:[]
        };
        this.editor = {};
        this.tags = {};
        this.imgData = [];
    }

    getGoodsDetail(prodId){
        http({
            ...ApiMap.goodsPriceDetail,
            data:{
                ...ApiMap.commonData,
                prod_id:prodId
            }
        }).then(response=>{
            let data = response.data,prod_tags = [],prod_crowds=[],prod_imgs=[],crowText = '',tagsText = '',crowsText = '';
            console.log(data);
            if(data.ret_code === 1){
                prod_tags = data.ret_data.prod_tags.map(tag => {
                    return parseInt(tag.tag_id)
                });
                prod_crowds = data.ret_data.prod_crowds.map(crows => {
                    return parseInt(crows.crowd_id)
                });
                prod_imgs = data.ret_data.prod_imgs;
                tagsText = data.ret_data.prod_tags.map(tag => {
                    return tag.tag_text
                }).join('/');
                crowText = data.ret_data.doc_crowds.map(crows => {
                    return crows.crowd_text
                }).join('/');
                crowsText = data.ret_data.prod_crowds.map(crows => {
                    return crows.crowd_text
                }).join('/');
                this.setState({
                    goodsMsg:{
                        ...data.ret_data,
                        prod_tags,
                        prod_crowds,
                        prod_imgs,
                        prod_cat:data.ret_data.prod_cat
                    },
                    crowText,
                    crowsText,
                    tagsText,
                    showImg:prod_imgs.map(img => {
                        return converson(img);
                    })
                });
            }
        }).catch(err=>{
            console.log(err)
        });
    }

    static getPackUnit(code){
        let str_code ='';
        switch (code){
            case 1:
                str_code = '盒';
                break;
            case 2:
                str_code = '袋';
                break;
            case 3:
                str_code = '瓶';
                break;
            case 4:
                str_code = '罐';
                break;
            case 5:
                str_code = '听';
                break;
        }
        return str_code;
    }

    componentDidMount(){
      console.log(this.props.goodsId);
        this.getGoodsDetail(this.props.goodsId.prod_id);
    }

    render(){
        return (
            <Container className="p20" title="商品资料详情">
                <div className="newGoodsData">
                    <Form bsClass="form" horizontal>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>商品编号：</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl.Static name="prod_name" componentClass="label" className="normalLable">{this.state.goodsMsg.prod_no}</FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>商品名称：</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl.Static name="prod_name" componentClass="label" className="normalLable">{this.state.goodsMsg.prod_name}</FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>商品产地：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl.Static name="prod_src" componentClass="label" className="normalLable">{this.state.goodsMsg.prod_src}</FormControl.Static>
                            </Col>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>商品规格：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl.Static name="prod_spec" componentClass="label" className="normalLable">{this.state.goodsMsg.prod_spec}</FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>批准文号：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl.Static name="prod_apprv_no" componentClass="label" className="normalLable">{this.state.goodsMsg.prod_apprv_no}</FormControl.Static>
                            </Col>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>有效期（月）：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl.Static name="prod_valid_month" componentClass="label" className="normalLable">{this.state.goodsMsg.prod_valid_month}</FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>包装单位：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl.Static name="prod_pkg_unit" componentClass="label" className="normalLable">{
                                    GoodsDetail.getPackUnit(this.state.goodsMsg.prod_pkg_unit)
                                }</FormControl.Static>
                            </Col>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>助记码：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl.Static name="prod_assist_code" componentClass="label" className="normalLable">
                                    {this.state.goodsMsg.prod_assist_code}
                                </FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>售价（元）：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl.Static name="prod_price" componentClass="label" className="normalLable">
                                    {this.state.goodsMsg.prod_price+'元'}
                                </FormControl.Static>
                            </Col>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>原价（元）：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl.Static name="prod_original_price" componentClass="label" className="normalLable">
                                    {this.state.goodsMsg.prod_original_price||''+'元'}
                                </FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>商品分类：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl.Static name="prod_cat" componentClass="label" className="normalLable">
                                    {
                                        this.state.goodsMsg.prod_cat.cat_text
                                    }
                                </FormControl.Static>
                            </Col>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>国产/进口：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl.Static name="prod_country_flag" componentClass="label" className="normalLable">
                                    {this.state.goodsMsg.prod_country_flag === 1 ? '国产' : '进口'}
                                </FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>是否在售：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl.Static name="prod_in_sale" componentClass="label" className="normalLable">
                                    {this.state.goodsMsg.prod_in_sale === 1 ? '在售' : '停售'}
                                </FormControl.Static>
                            </Col>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>是否可售：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl.Static name="prod_allow_sale" componentClass="label" className="normalLable">
                                    {this.state.goodsMsg.prod_allow_sale === 1 ? '可售' : '不可售'}
                                </FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>默认显示：</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl.Static name="prod_display" componentClass="label" className="normalLable">
                                    {this.state.goodsMsg.prod_display === 1 ? '是' : '否'}
                                </FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>商品标签：</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl.Static name="prod_tags" componentClass="label" className="normalLable">
                                    {this.state.tagsText}
                                </FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>档案人群分类：</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl.Static name="doc_crowds" componentClass="label" className="normalLable">{this.state.crowText}</FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>筛选人群分类：</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl.Static name="prod_crowds" componentClass="label" className="normalLable">{this.state.crowsText}</FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} className="text-right" sm={2}>主要成份：</Col>
                            <Col sm={10}>
                                <FormControl.Static name="prod_ingreds" componentClass="label" className="normalLable">{this.state.goodsMsg.prod_ingreds}</FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} className="text-right" sm={2}>备注：</Col>
                            <Col sm={10}>
                                <FormControl.Static name="prod_memo" componentClass="label" className="normalLable">{this.state.goodsMsg.prod_memo}</FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} className="text-right" sm={2}><span>*</span>商品图片：</Col>
                            <Col sm={10}>
                                <Clearfix>
                                    {
                                        this.state.showImg.map((img,index)=>{
                                            return (<img src={img} key={index} className="uploadImg" alt="商品图片"/>)
                                        })
                                    }
                                </Clearfix>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} className="text-right" sm={2}><span>*</span>商品介绍：</Col>
                            <Col sm={10}>
                                <FormControl.Static name="prod_intro" componentClass="div" className="normalLable" dangerouslySetInnerHTML={{__html:this.state.goodsMsg.prod_intro}}/>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
                <GoodsDialog lgShow={this.state.lgShow} tagList={this.state.tagList}
                             dialogName={this.state.dialogName} getData = { data => {
                    this.getDialogData(data)
                }} dataKey={this.state.dataKey} />
            </Container>
        );
    }
}

ReactDom.render(
    <GoodsDetail goodsId={common.Util.data('goodsData/goodsDetail')} />,
    document.getElementById('__goodsData/goodsDetail__')
);
