import React,{Component} from 'react';
import ReactDom from 'react-dom';
import Container from '../../component/container/Container';
import { Form,Clearfix,FormGroup,ControlLabel,FormControl,Col,Button } from 'react-bootstrap';
import http from '../../lib/Api/http';
import { alert,getFirstLetter,closeTab } from '../../lib/Util';
import ApiMap from '../../lib/Api/ApiMap';
import GoodsDialog from './goodsTagDialog';
import FileUpload from 'react-fileupload';
import 'kindeditor';
import './newGoods.css';

class NewGoodsData extends Component{

    constructor(props){
        super(props);
        this.state = {
            //提交使用的
            goodsMsg:{
                prod_name:'',
                prod_src:'',
                prod_spec:'',
                prod_cat:0,
                prod_price:0,
                prod_valid_month:0,
                prod_pkg_unit:1,
                prod_country_flag:1,
                prod_in_sale:1,
                prod_allow_sale:1,
                prod_display:1,
                prod_imgs:[],
                prod_intro:''
            },
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
        this.imgData = [];
        this.closeDialog = this.closeDialog.bind(this);
    }

    //请求获取分类
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

    //生命周期函数
    componentDidMount(){
        let that = this;
        this.editor = KindEditor.create(document.getElementsByName('prod_intro')[0],{
            width:"100%",
            height:300,
            filterMode:false,
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

    //打开弹窗
    openDialog(type){
        let lgShow = true,tagList = this.tags.tags,dialogName = '商品标签',dataKey = 'prod_tags',choseTag = this.state.goodsMsg.prod_tags ? this.state.goodsMsg.prod_tags : [];
        if(type === 'tags'){
            this.setState({
                lgShow,tagList,dialogName,dataKey,choseTag
            });
        }else if(type === 'crowds'){
            tagList = this.tags.crowds;
            dialogName = '档案人群分类';
            dataKey = 'doc_crowds';
            choseTag = this.state.goodsMsg.doc_crowds ? this.state.goodsMsg.doc_crowds : [];
            this.setState({
                lgShow,tagList,dataKey,dialogName,choseTag

            });
        }else{
            tagList = this.tags.prod_crowds;
            dialogName = '筛选人群分类';
            dataKey = 'prod_crowds';
            choseTag = this.state.goodsMsg.prod_crowds ? this.state.goodsMsg.prod_crowds : [];
            this.setState({
                lgShow,tagList,dialogName,dataKey,choseTag
            });
        }
    }

    //获取弹窗值
    getDialogData(data){
        if(data['prod_tags']){
            let prod_tags = data['prod_tags'].map(tag => {
                return parseInt(tag);
            });
            this.setState({
                tagsText:data.text,
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
            ...ApiMap.goodsCreate,
            data:{
                ...ApiMap.commonData,
                ...data
            }
        }).then(response=>{
            let responseData = response.data;
            if(responseData.ret_code === 1){
                alert('新增成功');
                common.closeTab('newGoodsData');
            }else{
                alert(responseData.ret_msg)
            }
            console.log(response);
        }).catch(err=>{console.log(err)});
    }

    fileUploadArgument(){
        let that = this;
        return {
            baseUrl:'/hca/web/management/upload/uploadFile',
            dataType:'json',
            param:{need_auth:2},
            accept:'image/jpeg,image/png',
            chooseAndUpload:true,
            uploadSuccess:function(res){
                that.imgData.push(res);
                const objImg = {url:res.imgUrl,dataUrl:res.img};
                let prod_imgs = that.imgData.map(img=>{
                    return img.img;
                });
                that.setState({
                    showImg:[...that.state.showImg,objImg],
                    goodsMsg:{
                        ...that.state.goodsMsg,
                        prod_imgs
                    }
                });
            },
            beforeChoose:function(){
                const imgCount = that.state.goodsMsg.prod_imgs.length;
                if(imgCount >= 10){
                    alert('商品图片最多只可上传10张');
                    return false;
                }else{
                    return true;
                }
                // return that.state.goodsMsg.prod_imgs.length >= 10 ? false : true;
            },
            beforeUpload:function (files,mill) {
                const size = files[0].size;
                if(size > (500*1024)){
                    alert('图片太大，上传的图片不能大于500K');
                    return false;
                }
            }
        }
    }

    elementChange(ev){
        let key = ev.target.name,goodsMsg = {...this.state.goodsMsg};
        const intKey = [
            'prod_valid_month',
            'prod_pkg_unit',
            'prod_cat',
            'prod_country_flag',
            'prod_in_sale',
            'prod_allow_sale',
            'prod_display'
        ];
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

    render(){
        return (
            <Container className="p20" title="新增商品">
                <div className="newGoodsData">
                    <Form bsClass="form" horizontal onSubmit={
                        ev => {
                            this.submitHandler(ev)
                        }}>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel><span>*</span>商品名称：</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl name="prod_name" placeholder="商品名称" onChange={
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
                                <FormControl name="prod_src" placeholder="商品产地" onChange={
                                    ev=>{
                                        this.elementChange(ev)
                                    }
                                }/>
                            </Col>
                            <Col className="text-right" sm={2}>
                                <ControlLabel><span>*</span>商品规格：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="prod_spec" placeholder="商品规格" onChange={
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
                                <FormControl name="prod_apprv_no" placeholder="批准文号" onChange={
                                    ev=>{
                                        this.elementChange(ev)
                                    }
                                }/>
                            </Col>
                            <Col className="text-right" sm={2}>
                                <ControlLabel><span>*</span>有效期（月）：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="prod_valid_month" placeholder="有效期（月）" onChange={
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
                                <FormControl name="prod_pkg_unit" componentClass="select" onChange={
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
                                <FormControl name="prod_assist_code" readOnly value={this.state.goodsMsg.prod_assist_code} placeholder="助记码" onChange={
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
                                <FormControl name="prod_price" placeholder="售价（元）" onChange={
                                    ev=>{
                                        this.elementChange(ev)
                                    }
                                }/>
                            </Col>
                            <Col className="text-right" sm={2}>
                                <ControlLabel>原价（元）：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="prod_original_price" placeholder="原价（元）" onChange={
                                    ev=>{
                                        this.elementChange(ev)
                                    }
                                }/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-right" sm={2}>
                                <ControlLabel><span>*</span>商品分类：</ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl name="prod_cat" componentClass="select" onChange={
                                    ev=>{
                                        this.elementChange(ev)
                                    }
                                }>
                                    <option key={0} value={0}>{'请选择'}</option>
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
                                <FormControl name="prod_country_flag" componentClass="select" onChange={
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
                                <FormControl name="prod_in_sale" componentClass="select" onChange={
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
                                <FormControl name="prod_allow_sale" componentClass="select" onChange={
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
                                <FormControl name="prod_display" componentClass="select" onChange={
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
                                <FormControl name="prod_tags" value={this.state.tagsText} placeholder="商品标签" readOnly />
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
                            <Col componentClass={ControlLabel} className="text-right" sm={2}>主要成份：</Col>
                            <Col sm={10}>
                                <FormControl name="prod_ingreds" placeholder="主要成份" onChange={
                                    ev=>{
                                        this.elementChange(ev)
                                    }
                                }/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} className="text-right" sm={2}>备注：</Col>
                            <Col sm={10}>
                                <FormControl name="prod_memo" placeholder="备注" componentClass="textarea" onChange={
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
                                            return (<img src={img.url} key={index} className="uploadImg" alt="商品图片" onClick={
                                                ()=>{
                                                    let prodImg = this.state.goodsMsg.prod_imgs,showImg = this.state.showImg,showIndx = -1;
                                                    const imgIndex = prodImg.indexOf(img.dataUrl);
                                                    for(let idx in showImg){
                                                        if(showImg[idx].dataUrl === img.dataUrl){
                                                            showIndx = idx;
                                                        }
                                                    }
                                                    showImg.splice(showIndx,1);
                                                    if(imgIndex!==-1){
                                                        prodImg.splice(imgIndex,1);
                                                        this.imgData.splice(imgIndex,1);
                                                    }
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
                                <textarea name="prod_intro" placeholder="商品介绍" onInput={
                                    ev=>{
                                        this.elementChange(ev)
                                    }
                                }>

                                </textarea>
                            </Col>
                        </FormGroup>
                        <FormGroup className="text-center">
                            <Col componentClass={ControlLabel} className="text-right" sm={2}>{''}</Col>
                            <Col sm={10}>
                                <Button type="reset" bsSize="large" onClick={
                                    ()=>{
                                        closeTab('newGoodsData')
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
                             closeDialog={this.closeDialog}
                             choseTag={this.state.choseTag}
                             dataKey={this.state.dataKey} />
            </Container>
        );
    }
}

ReactDom.render(
    <NewGoodsData />,
    document.getElementById('__goodsData/newGoodsData__')
);