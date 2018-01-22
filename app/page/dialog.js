import React from 'react';
import ReactDom from 'react-dom';
import { Modal,Button } from 'react-bootstrap';

class Dialog extends React.Component{
    render(){
        return (
            <div>
                <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title>弹窗标题</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>这里是内容</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

class ModalDemo extends React.Component{
    constructor(props) {
        super(props);
        this.state = props;
    }

    render(){
        let lgClose = () => this.setState({ lgShow: false });
        return (
            <div>
                <Button bsStyle="primary" onClick={() => this.setState({ lgShow: true })}>
                    点击弹窗
                </Button>
                <Dialog show={this.state.lgShow} onHide={lgClose} />
            </div>
        );
    }
}

ReactDom.render(
    <ModalDemo lgShow={false} />,
    document.getElementById('__dialog__')
);