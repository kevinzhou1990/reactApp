import React,{Component} from 'react';
import ReactDom from 'react-dom';
import Container from '../../component/container/Container';
import { Form,Clearfix,FormGroup,ControlLabel,FormControl,Col,Button } from 'react-bootstrap';
import http from '../../lib/Api/http';
import { alert,closeTab,converson,getFirstLetter } from '../../lib/Util';
import ApiMap from '../../lib/Api/ApiMap';
import GoodsDialog from './goodsTagDialog';
import FileUpload from 'react-fileupload';
import 'kindeditor';
import './newGoods.css';

class GoodsUpdate extends Component{
    constructor(props){
        super(props);
        this.state = {
            //提交使用的
            goodsMsg:{},
            //页面状态
            goods_cat:[],
            lgShow:false,
            tagList:[],
            tagsText:'',
            crowText:'',
            crowsText:'',
            dialogName:'商品标签',
            dataKey:'prod_tags',
            showImg:[],
            choseTag:[]
        };
        this.editor = {};
        this.tags = {};
        this.fileUploadArgument = this.fileUploadArgument.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    getCats(){
        http({
            ...ApiMap.shopProdmeta,
            data:{
                ...ApiMap.commonData
            }
        }).then(response=>{
            let data = response.data,cats = [];
            if(data.ret_code === 1){
                let cat1 = data.ret_data.cats;
                for(let i = 0; i < cat1.length; i++){
                    cats.push(...cat1[i].sub_cats);
                }
            }
            this.setState({goods_cat:cats});
            this.tags = {
                tags:[...data.ret_data.tags],
                crowds:[...data.ret_data.doc_crowds],
                prod_crowds:[...data.ret_data.prod_crowds]
            };
        }).catch(err=>{})
    }

    getGoodsDetail(prodId){
        http({
            ...ApiMap.goodsPriceDetail,
            data:{
                ...ApiMap.commonData,
                prod_id:prodId
            }
        }).then(response=>{
            let data = response.data,prod_tags = [],prod_crowds=[],doc_crowds = [],
                prod_imgs=[],crowText = '',crowsText = '', tagsText = '';
            if(data.ret_code === 1){
                prod_tags = data.ret_data.prod_tags.map(tag => {
                    return parseInt(tag.tag_id)
                });
                prod_crowds = data.ret_data.prod_crowds.map(crows => {
                    return parseInt(crows.crowd_id)
                });
                doc_crowds = data.ret_data.doc_crowds.map(crows => {
                    return parseInt(crows.crowd_id)
                });
                prod_imgs = data.ret_data.prod_imgs;
                tagsText = data.ret_data.prod_tags.map(tag => {
                    return tag.tag_text
                }).join(',');
                crowText = data.ret_data.prod_crowds.map(crows => {
                    return crows.crowd_text
                }).join(',');
                if(data.ret_data.doc_crowds.length){
                    crowsText = data.ret_data.doc_crowds.map(crows => {
                        return crows.crowd_text
                    }).join(',');
                }
                this.setState({
                    goodsMsg:{
                        ...data.ret_data,
                        prod_tags,
                        prod_crowds,
                        doc_crowds,
                        prod_imgs,
                        prod_cat:data.ret_data.prod_cat.cat_id
                    },
                    crowText,
                    tagsText,
                    crowsText,
                    showImg:prod_imgs.map(img => {
                        const objImg = {url:converson(img),dataUrl:img};
                        return objImg;
                    })
                });
                this.editor.html(data.ret_data.prod_intro);
            }
        }).catch(err=>{
            console.log(err)
        });
    }

    componentDidMount(){
        this.getGoodsDetail(this.props.goodsId.prod_id);
        let that = this;
        this.editor = KindEditor.create(document.getElementsByName('prod_intro')[0],{
            width:"100%",
            height:300,
            items:['source','|','undo','redo','|','preview','cut','copy','paste',
                'plainpaste','wordpaste','|','justifyleft','justifycenter','justifyright',
                'justifyfull','insertorderedlist','insertunorderedlist','indent','outdent','subscript',
                'superscript','quickformat','selectall','|','fullscreen','/',
                'formatblock','fontname','fontsize','|','forecolor','hilitecolor','bold',
                'italic','underline','strikethrough','lineheight','removeformat','|','image','insertfile','table','hr','pagebreak',
                'anchor', 'link', 'unlink'],
            uploadJson:'/hca/web/management/upload/uploadFile1',
            afterChange:function(){
                this.sync();
                let prod_intro = this.html();
                that.setState({
                    goodsMsg:{
                        ...that.state.goodsMsg,
                        prod_intro
                    }
                });
            }
        });
        this.getCats();
    }

    openDialog(type){
        let choseTag = [],tagList = [],lgShow = true,dialogName = '商品标签',dataKey='prod_tags';
        if(type === 'tags'){
            tagList = this.tags.tags;
            dataKey = 'prod_tags';
            choseTag = this.state.goodsMsg.prod_tags;
            this.setState({
                lgShow,choseTag,tagList,dialogName,dataKey
            });
        }else if(type === 'crowds'){
            tagList = this.tags.crowds;
            dataKey = 'doc_crowds';
            dialogName = '档案人群分类';
            choseTag = this.state.goodsMsg.doc_crowds;
            this.setState({
                lgShow,choseTag,tagList,dialogName,dataKey
            });
        }else{
            tagList = this.tags.prod_crowds;
            choseTag = this.state.goodsMsg.prod_crowds;
            dataKey = 'prod_crowds';
            dialogName = '筛选人群分类';
            this.setState({
                lgShow,choseTag,tagList,dialogName,dataKey
            });
        }
    }

    getDialogData(data){
        if(data['prod_tags']){
            let prod_tags = data['prod_tags'].map(tag => {
                return parseInt(tag);
            });
            this.setState({
                tagsText:data.text,
                choseTag:prod_tags,
                goodsMsg:{
                    ...this.state.goodsMsg,
                    prod_tags
                }});
        }else if(data['prod_crowds']){
            let prod_crowds = data['prod_crowds'].map(crow => {
                return parseInt(crow);
            });
            this.setState({
                crowText:data.text,
                choseTag:prod_crowds,
                goodsMsg:{
                    ...this.state.goodsMsg,
                    prod_crowds:prod_crowds
                }});
        }else{
            let doc_crowds = data['doc_crowds'].map(crow => {
                return parseInt(crow);
            });
            this.setState({
                crowsText:data.text,
                choseTag:doc_crowds,
                goodsMsg:{
                    ...this.state.goodsMsg,
                    doc_crowds:doc_crowds
                }});
        }
        this.setState({lgShow:false});
    }

    submitHandler(ev){
        ev.preventDefault();
        const reg = /[^\u4e00-\u9fa5]/gi;
        let data = this.state.goodsMsg,priceReg = /(^[-+]?[1-9]\d*(\.\d{1,2})?$)|(^[-+]?[0]{1}(\.\d{1,2})?$)/g;
        data.prod_imgs = [...data.prod_imgs];
        let must = {
            prod_name:'商品名称不能为空',
            prod_spec:'商品规格不能为空',
            prod_src:'商品产地不能为空',
            prod_valid_month:'有效期不能为空',
            prod_pkg_unit:'包装单位不能为空',
            prod_price:'售价必须为合法数字(正数，最多两位小数)',
            prod_cat:'商品分类不能为空',
            prod_country_flag:'国产/进口不能为空',
            prod_in_sale:'是否在售不能为空',
            prod_allow_sale:'是否可售不能为空',
            prod_display:'默认显示不能为空',
            prod_imgs:'请上传商品图片',
            prod_intro:'商品介绍不能为空',
        };
        for(let key in data){
            let hanzi = '',vlen = 0;
            switch (key){
                case 'prod_imgs':
                    if(data[key].length === 0){
                        alert(must[key]);
                        return false;
                    }
                    break;
                case 'prod_price':
                    if(!data[key]){
                        alert(must[key]);
                        return false;
                    }
                    if(data[key]&&!priceReg.test(data[key])){
                        alert(must[key]);
                        return false;
                    }
                    data[key] = parseFloat(data[key]);
                    break;
                case 'prod_valid_month':
                    if(typeof data[key] !== 'number'){
                        alert('有效期必须为数字');
                        return false;
                    }
                    break;
                case 'prod_original_price':
                    if(data[key]){
                        console.log('prod_original_price = ' + priceReg.test(data[key]));
                        if(!priceReg.test(data[key])){
                            alert('原价必须为合法数字(正数，最多两位小数)');
                            return false;
                        }
                    }
                    data[key] = parseFloat(data[key]);
                    break;
                case 'prod_name':
                case 'prod_src':
                    hanzi = data[key].replace(reg,'');
                    vlen = (hanzi ? hanzi.length:0)+data[key].length;
                    if(vlen > 100){
                        alert('商品名称，商品产地不能超过100个字符');
                        return false;
                    }
                    break;
                case 'prod_spec':
                    hanzi = data[key].replace(reg,'');
                    vlen = (hanzi ? hanzi.length:0)+data[key].length;
                    if(vlen > 50){
                        alert('商品规格不能超过50个字符');
                        return false;
                    }
                    break;
                default:
                    break;
            }
            if(must[key]){
                if(!data[key]){
                    alert(must[key]);
                    return false;
                }
            }
        }
        http({
            ...ApiMap.goodsUpdate,
            data:{
                ...ApiMap.commonData,
                ...data
            }
        }).then(response=>{
            let responseData = response.data;
            if(responseData.ret_code === 1){
                alert('修改完成');
                closeTab('goodsUpdate');
            }else{
                alert(responseData.ret_msg)
            }
        }).catch(err=>{console.log(err)});
    }

    fileUploadArgument(){
        let that = this;
        return {
            baseUrl:'/hca/web/management/upload/uploadFile',
            dataType:'json',
            param:{need_auth:2},
            chooseAndUpload:true,
            accept:'image/jpeg,image/png',
            uploadSuccess:function(res){
                const objImg = {url:res.imgUrl,dataUrl:res.img};
                let showImg = [...that.state.showImg,objImg];
                that.setState({
                    showImg,
                    goodsMsg:{
                        ...that.state.goodsMsg,
                        prod_imgs:showImg.map(item => {
                            return item.dataUrl;
                        })
                    }
                });
            },
            beforeChoose:function(){
                let imgCount = that.state.showImg.length;
                if(imgCount >= 10){
                    alert('商品图片最多只可上传10张');
                    return false;
                }else{
                    return true;
                }
            },
            beforeUpload:function (files,mill) {
                const size = files[0].size;
                if(size > (1024*500)){
                    alert('图片太大，上传的图片不能大于500K');
                    return false;
                }
            }
        }
    }

    elementChange(ev){
        let key = ev.target.name,goodsMsg = {...this.state.goodsMsg};
        const intKey = ['prod_valid_month','prod_pkg_unit','prod_cat','prod_country_flag','prod_in_sale','prod_allow_sale','prod_display'];
        if(intKey.indexOf(key)!== -1){
            goodsMsg[key] = parseInt(ev.target.value) || ev.target.value;
        }else{
            goodsMsg[key] = ev.target.value;
        }
        if(key === 'prod_name'){
            goodsMsg.prod_assist_code = getFirstLetter(ev.target.value);
        }
        this.setState({goodsMsg});
    }

    closeDialog(){
        this.setState({
            ...this.state,
            lgShow:false
        });
    }

    static closePanl(){
        closeTab('goodsUpdate');
    }
    render(){
        return (
            <Container className="p20" title="商品资料修改">
                <div className="newGoodsData">
                    <Form bsClass="form" horizontal onSubmit={
                        ev => {
                            this.submitHandler(ev)
                        }}>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel><span>*</span>商品编号：</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl name="prod_name" value={this.state.goodsMsg.prod_no ? this.state.goodsMsg.prod_no:''} readOnly />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel><span>*</span>商品名称：</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl name="prod_name" value={this.state.goodsMsg.prod_name?this.state.goodsMsg.prod_name:''} placeholder="商品名称" onChange={
                                    ev=>{
                                        this.elementChange(ev)
                                    }
                                } />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel><span>*</span>商品产地：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="prod_src" value={this.state.goodsMsg.prod_src?this.state.goodsMsg.prod_src:''} placeholder="商品产地" onChange={
                                    ev=>{
                                        this.elementChange(ev)
                                    }
                                }/>
                            </Col>
                            <Col className="text-right" sm={2}>
                                <ControlLabel><span>*</span>商品规格：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="prod_spec" value={this.state.goodsMsg.prod_spec?this.state.goodsMsg.prod_spec:''} placeholder="商品规格" onChange={
                                    ev=>{
                                        this.elementChange(ev)
                                    }
                                }/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>批准文号：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="prod_apprv_no" value={
                                    this.state.goodsMsg.prod_apprv_no ? this.state.goodsMsg.prod_apprv_no : ''}
                                             placeholder="批准文号" onChange={
                                    ev=>{
                                        this.elementChange(ev)
                                    }
                                }/>
                            </Col>
                            <Col className="text-right" sm={2}>
                                <ControlLabel><span>*</span>有效期（月）：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="prod_valid_month" value={this.state.goodsMsg.prod_valid_month?this.state.goodsMsg.prod_valid_month:''} placeholder="有效期（月）" onChange={
                                    ev=>{
                                        this.elementChange(ev)
                                    }
                                }/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel><span>*</span>包装单位：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="prod_pkg_unit" value={this.state.goodsMsg.prod_pkg_unit} componentClass="select" onChange={
                                    ev=>{
                                        this.elementChange(ev)
                                    }
                                }>
                                    <option value={1}>盒</option>
                                    <option value={2}>袋</option>
                                    <option value={3}>瓶</option>
                                    <option value={4}>罐</option>
                                    <option value={5}>听</option>
                                </FormControl>
                            </Col>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>助记码：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="prod_assist_code" readOnly value={
                                    this.state.goodsMsg.prod_assist_code ? this.state.goodsMsg.prod_assist_code:''
                                } placeholder="助记码" onChange={
                                    ev=>{
                                        this.elementChange(ev)
                                    }
                                }/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel><span>*</span>售价（元）：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="prod_price" value={(this.state.goodsMsg.prod_price?this.state.goodsMsg.prod_price:0)} placeholder="售价（元）"
                                             readOnly/>
                            </Col>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>原价（元）：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="prod_original_price" value={this.state.goodsMsg.prod_original_price?this.state.goodsMsg.prod_original_price:''} placeholder="原价（元）"
                                             readOnly/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel><span>*</span>商品分类：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="prod_cat" value={this.state.goodsMsg.prod_cat} componentClass="select" onChange={
                                    ev=>{
                                        this.elementChange(ev)
                                    }
                                }>
                                    {
                                        this.state.goods_cat.map(cat => {
                                            return (
                                                <option key={cat.cat_id} value={cat.cat_id}>{cat.cat_text}</option>
                                            )
                                        })
                                    }
                                </FormControl>
                            </Col>
                            <Col className="text-right" sm={2}>
                                <ControlLabel><span>*</span>国产/进口：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="prod_country_flag" value={this.state.goodsMsg.prod_country_flag} componentClass="select" onChange={
                                    ev=>{
                                        this.elementChange(ev)
                                    }
                                }>
                                    <option value={1}>国产</option>
                                    <option value={2}>进口</option>
                                </FormControl>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel><span>*</span>是否在售：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="prod_in_sale" value={this.state.goodsMsg.prod_in_sale} componentClass="select" onChange={
                                    ev=>{
                                        this.elementChange(ev)
                                    }
                                }>
                                    <option value={1}>在售</option>
                                    <option value={2}>停售</option>
                                </FormControl>
                            </Col>
                            <Col className="text-right" sm={2}>
                                <ControlLabel><span>*</span>是否可售：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="prod_allow_sale" value={this.state.goodsMsg.prod_allow_sale} componentClass="select" onChange={
                                    ev=>{
                                        this.elementChange(ev)
                                    }
                                }>
                                    <option value={1}>可售</option>
                                    <option value={2}>不可售</option>
                                </FormControl>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel><span>*</span>默认显示：</ControlLabel>
                            </Col>
                            <Col sm={5}>
                                <FormControl name="prod_display" value={this.state.goodsMsg.prod_display} componentClass="select" onChange={
                                    ev=>{
                                        this.elementChange(ev)
                                    }
                                }>
                                    <option value={1}>是</option>
                                    <option value={2}>否</option>
                                </FormControl>
                            </Col>
                            <Col sm={5}>
                                <FormControl.Static bsClass="tips" name="prod_name" componentClass="span">
                                    商城首页默认状态下是否显示该商品。如不希望商品默认显示在首页，则选择“否”。
                                </FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>商品标签：</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl name="prod_tags" value={this.state.tagsText?this.state.tagsText:''} placeholder="商品标签" readOnly />
                                <FormControl.Static className="icon icon-add" componentClass="span" onClick={
                                    () => {
                                        this.openDialog('tags')
                                    }
                                } />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>档案人群分类：</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl name="doc_crowds" value={this.state.crowsText} placeholder="档案人群分类" readOnly />
                                <FormControl.Static className="icon icon-add" componentClass="span" onClick={
                                    () => {
                                        this.openDialog('crowds')
                                    }
                                } />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>筛选人群分类：</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl name="prod_crowds" value={this.state.crowText} placeholder="筛选人群分类" readOnly />
                                <FormControl.Static className="icon icon-add" componentClass="span" onClick={
                                    () => {
                                        this.openDialog('prod_crowds')
                                    }
                                } />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} className="text-right" sm={2}>主要成分：</Col>
                            <Col sm={10}>
                                <FormControl name="prod_ingreds" value={this.state.goodsMsg.prod_ingreds?this.state.goodsMsg.prod_ingreds:''} placeholder="主要成分" onChange={
                                    ev=>{
                                        this.elementChange(ev)
                                    }
                                }/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} className="text-right" sm={2}>备注：</Col>
                            <Col sm={10}>
                                <FormControl name="prod_memo" placeholder="备注" value={this.state.goodsMsg.prod_memo?this.state.goodsMsg.prod_memo:''} componentClass="textarea" onChange={
                                    ev=>{
                                        this.elementChange(ev)
                                    }
                                }/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} className="text-right" sm={2}><span>*</span>商品图片：</Col>
                            <Col sm={10}>
                                <Clearfix>
                                    {
                                        this.state.showImg.map((img,index)=>{
                                            return (<img src={img.url} key={index} title="点击可删除图片" className="uploadImg" alt="商品图片" onClick={
                                                ()=>{
                                                    let showImg = this.state.showImg,showIndx = -1;
                                                    for(let idx in showImg){
                                                        if(showImg[idx].dataUrl === img.dataUrl){
                                                            showIndx = idx;
                                                        }
                                                    }
                                                    showImg.splice(showIndx,1);
                                                    let prodImg = showImg.map(ims => {return ims.dataUrl});
                                                    this.setState({
                                                        ...this.state,
                                                        showImg,
                                                        goodsMsg:{
                                                            ...this.state.goodsMsg,
                                                            prod_imgs:prodImg
                                                        }
                                                    });
                                                }
                                            } />)
                                        })
                                    }
                                    <FileUpload options = {this.fileUploadArgument()} className="pull-left">
                                        <span className="uploadImg" ref="chooseAndUpload">+</span>
                                    </FileUpload>
                                    <input type="hidden" name="prod_imgs" />
                                </Clearfix>
                                <FormControl.Static bsClass="tips" componentClass="span">上传图片宽高比例为4:3，大小500K以内图片。上传后，点击图片可以删除。</FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} className="text-right" sm={2}><span>*</span>商品介绍：</Col>
                            <Col sm={10}>
                                <textarea name="prod_intro" id="prod_intro" placeholder="商品介绍" value={this.state.goodsMsg.prod_intro?'this.state.goodsMsg.prod_intro':''}/>
                            </Col>
                        </FormGroup>
                        <FormGroup className="text-center">
                            <Col componentClass={ControlLabel} className="text-right" sm={2}>{''}</Col>
                            <Col sm={10}>
                                <Button type="button" bsSize="large" onClick={
                                    ()=>{
                                        GoodsUpdate.closePanl()
                                    }
                                }>取消</Button><Button bsSize="large" type="submit" className="btn-main">保存</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
                <GoodsDialog lgShow={this.state.lgShow}
                             tagList={this.state.tagList}
                             dialogName={this.state.dialogName}
                             getData = { data => {
                                 this.getDialogData(data)
                             }}
                             dataKey={this.state.dataKey}
                             choseTag={this.state.choseTag}
                             closeDialog={this.closeDialog}/>
            </Container>
        );
    }
}

ReactDom.render(
    <GoodsUpdate goodsId={common.Util.data('goodsData/goodsUpdate')} />,
    document.getElementById('__goodsData/goodsUpdate__')
);
