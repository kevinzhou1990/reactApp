import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { Modal,Checkbox,Button} from 'react-bootstrap';

class GoodsDialog extends Component{
    constructor(props){
        super(props);
        this.state = {
            lgShow:false,
            tagList:[],
            name:'商品标签',
            dataKey:'prod_tags',
            choseTag:[]
        };
        this.getData = this.getData.bind(this);
    }

    //收到props，还未重新渲染的的状态(生命周期函数)
    componentWillReceiveProps(nextProps){
        this.setState({
            lgShow:nextProps.lgShow,
            name:nextProps.dialogName,
            tagList:nextProps.tagList,
            dataKey:nextProps.dataKey,
            choseTag:nextProps.choseTag
        });
    }

    closeDialog(){
        this.props.closeDialog();
    }

    getData(){
        let elements = [...this.form.elements],datas = [],key = elements[0].name,data = {},text = [];
        for(let i = 0;i < elements.length;i++){
            if(elements[i].type === 'checkbox' && elements[i].checked){
                datas.push(elements[i].value);
                text.push(elements[i].parentElement.textContent)
            }
        }
        data[key] = datas;
        data.text = text.join(',');
        this.props.getData(data);
        this.setState({lgShow:false});
    }

    handleCheckChange(ev){
        const node = ev.target;
        let checkValue = parseInt(node.value),choseTag = this.state.choseTag;
        const idx = choseTag.indexOf(checkValue);
        if(node.checked){
            idx === -1 ? choseTag.push(checkValue):''
        }else{
            idx === -1 ? '' : choseTag.splice(idx,1);
        }
        this.setState({
            ...this.state,
            choseTag
        });
    }

    render(){
        let lgClose = () => {this.setState({lgShow:false})};
        return (
            <Modal show={this.state.lgShow} onHide={lgClose} bsSize="large" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>{this.state.name}</Modal.Header>
                <Modal.Body>
                    <form className="p20" ref={ref => this.form = ref}>
                        {
                            this.state.tagList.map(tag => {
                                const tag_id = tag.crowd_id||tag.tag_id,text = tag.crowd_text||tag.tag_text;
                                const chosed = this.state.choseTag.indexOf(tag_id) === -1 ? false : true;
                                return (
                                    <Checkbox key={tag_id}
                                              name={this.state.dataKey}
                                              inline
                                              defaultValue={tag_id}
                                              checked={chosed}
                                              onChange={
                                                  ev => {
                                                      this.handleCheckChange(ev)
                                                  }
                                              }>{text}</Checkbox>
                                )
                            })
                        }
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={
                        ()=>this.closeDialog()
                    }>取消</Button>
                    <Button onClick={
                        () => {
                            this.getData()
                        }
                    } bsStyle="primary">确定</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

GoodsDialog.propTypes = {
    lgShow:PropTypes.bool.isRequired,
    tagList:PropTypes.array.isRequired
};
export default GoodsDialog;