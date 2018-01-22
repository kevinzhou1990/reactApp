import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from 'react-bootstrap';

class QueryForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fromData:{
                prod_assist_code: '',
                prod_name: '',
                prod_src: '',
                prod_cats: '',
                prod_tags: '',
                prod_crowds: '',
                doc_crows:'',
                prod_in_sale:0,
                prod_allow_sale:0,
                prod_display:0
            }
        };
        this.getFormData = this.getFormData.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    getMouseOver(cat,e){
        let cats = document.getElementById('from-query-goodsData').querySelectorAll('.queryMeta .pull-left');
        const target = e.currentTarget;
        cats.forEach((item) => {
            if(item === target){
                target.classList.add('active');
            }else{
                item.classList.remove('active');
            }
        });
        this.setState({
            pCatId: cat.cat_id
        });
    }

    componentDidMount(){
        let formEle = document.getElementById('from-query-goodsData');
        let arr = this.handleFormData(formEle);
        this.setState({
            fromData:arr
        });
    }

    //处理表单数据
    handleFormData(form){
        let formEle = form,arr = {};
        for(let i = 0;i < formEle.elements.length; i ++){
            let feled = formEle.elements[i];
            switch (feled.type){
                case undefined:
                case 'button':
                case 'file':
                case 'reset':
                case 'submit':
                    break;
                case 'checkbox':
                case 'radio':
                    if (!feled.checked) {
                        break;
                    }
                default:
                    if(arr[feled.name]){
                        arr[feled.name] = arr[feled.name]+','+feled.value;
                    }else{
                        arr[feled.name]=feled.value;
                    }
            }
        }
        return arr;
    }

    //处理选中checkbox
    handleCheckbox(){
        let arr = this.handleFormData(document.getElementById('from-query-goodsData'));
        this.setState({fromData:arr});
        this.props.submitHandle(arr);
    }

    //提交时触发方法
    getFormData(ev){
        ev.preventDefault();
        let arr = this.handleFormData(document.getElementById('from-query-goodsData'));
        this.setState({fromData:arr});
        this.props.submitHandle(arr);
    }

    getData(){
        return this.state.fromData;
    }

    render(){
        const {tags, crowds,prod_crowds, cats} = this.props;
        return (
            <Form bsClass="form" onSubmit={
                ev => this.getFormData(ev)
            } id="from-query-goodsData" inline>
                <table><tbody>
                <tr>
                    <td><label>&nbsp;&nbsp;&nbsp;助记码</label>
                        <input type="text" className="form-control" name="prod_assist_code" /></td>
                    <td><label>商品名称</label>
                        <input type="text" className="form-control" name="prod_name" /></td>
                    <td><label>商品产地</label>
                        <input type="text" className="form-control" name="prod_src" /></td>
                    <td><label>是否在售</label><select className="form-control" name="prod_in_sale" id="">
                        <option value={0}>全部</option><option value={1}>在售</option><option value={2}>停售</option></select></td>
                </tr>
                <tr>
                    <td><label>是否可售</label><select className="form-control" name="prod_allow_sale" id="">
                        <option value={0}>全部</option><option value={1}>可售</option><option value={2}>不可售</option>
                    </select></td>
                    <td><label>默认显示</label><select className="form-control" name="prod_display" id="">
                        <option value={0}>全部</option><option value={1}>是</option><option value={2}>否</option>
                    </select></td>
                    <td><button className="btn btn-main" type="submit">查询</button></td>
                    <td>{''}</td>
                </tr>
                </tbody></table>
                <div className="tagList">
                    <div className="tagLabel">
                        <label htmlFor="">商品标签</label>
                        <div className="queryMeta">
                            {tags.map(tag => {
                                return (
                                    <label key={tag.tag_id}>
                                        <input type="checkbox" onChange={
                                            ev => this.handleCheckbox()
                                            // this.handleCheckbox()
                                        } value={tag.tag_id} name="prod_tags"/>{tag.tag_text}</label>
                                );
                            })}
                        </div>
                    </div>
                    <div className="tagLabel">
                        <label htmlFor="">档案人群分类</label>
                        <div className="queryMeta">
                            {crowds.map(crow => {
                                return (
                                    <label key={crow.crowd_id}>
                                        <input type="checkbox" onChange={
                                            ev => this.handleCheckbox()
                                        } value={crow.crowd_id} name="doc_crowds"/>{crow.crowd_text}</label>
                                );
                            })}
                        </div>
                    </div>
                    <div className="tagLabel">
                        <label htmlFor="">筛选人群分类</label>
                        <div className="queryMeta">
                            {prod_crowds.map(crow => {
                                return (
                                    <label key={crow.crowd_id}>
                                        <input type="checkbox" onChange={
                                            ev => this.handleCheckbox()
                                        } value={crow.crowd_id} name="prod_crowds"/>{crow.crowd_text}</label>
                                );
                            })}
                        </div>
                    </div>
                    <div className="tagLabel">
                        <label htmlFor="">商品分类</label>
                        <div className="queryMeta clearfix">
                            {
                                cats.map(cat => {
                                    return (
                                        <div className={"pull-left"} onClick={
                                            ev => this.getMouseOver(cat,ev)
                                        } key={cat.cat_id}>{cat.cat_text}</div>
                                    );
                                })
                            }
                        </div>
                        <div className="sub_cat queryMeta">
                            {
                                cats.map(cat => {
                                    const sub_cat = cat.sub_cats.map(subCat => {
                                        return (
                                            <label key={subCat.cat_id}>
                                                <input type="checkbox" onChange={
                                                    ev => this.handleCheckbox()
                                                } value={subCat.cat_id} name="prod_cats"/>{subCat.cat_text}</label>
                                        );
                                    });
                                    return (
                                        <div key={cat.cat_id} id={'sub_cat_'+cat.cat_id} className={
                                            this.state.pCatId === cat.cat_id ? 'show':'none'
                                        }>
                                            {sub_cat}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Form>
        );
    }
}

QueryForm.propTypes = {
    cats:PropTypes.array.isRequired,
    crowds:PropTypes.array.isRequired,
    prod_crowds:PropTypes.array.isRequired,
    tags:PropTypes.array.isRequired,
    submitHandle:PropTypes.func.isRequired
};
export default QueryForm;
