import React, {Component} from 'react';
import {Form, FormGroup, ControlLabel, Button, FormControl} from 'react-bootstrap';
// import {Upload} from 'rc-upload';
// import FileUpload from 'react-fileupload';
import http from '../../lib/Api/http';
import ApiMap from '../../lib/Api/ApiMap';
import {downloadExcel, trim, getAuthStr} from '../../lib/Util';
import './style.css';
import '../../../static/assets/jquery.mloading-master/src/jquery.mloading.js';
import '../../../static/assets/jquery.mloading-master/src/jquery.mloading.css';

class IRForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.handleClickSearch = this.handleClickSearch.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClickExport = this.handleClickExport.bind(this);
        this.handleClickImport = this.handleClickImport.bind(this);
    }

    // 点击查询
    handleClickSearch() {
        this.props.clickSearchReset();
        this.props.getPolicyList();
    }

    // 导入投保记录
    handleClickImport(e) {
        const self = this;
        var formData = new FormData();
        var file = e.target.files[0];
        formData.append("file", file);
        e.target.value = '';
        $(document.body).mLoading({mask: false});
        $.ajax({
            url: '/hca/web/admin/opins/policy/import/' + ApiMap.commonData.user_id + '/' + encodeURIComponent(getAuthStr()),
            type: "POST",
            contentType: 'multipart/form-data',
            data: formData,
            async: true,
            cache: false,
            processData: false,
            contentType: false,
            success: function(meg) {
                console.log(typeof meg);
                let json = JSON.parse(meg);
                $(document.body).mLoading("hide");
                if (json.ret_code === 1) {
                    common.alert('导入成功');
                    self.props.getPolicyList();
                } else {
                    common.alert(json.ret_msg);
                }
            },
            error: function(err) {
                $(document.body).mLoading("hide");
                common.alert(err);
            }
        });
    }

    // 导出投保记录
    handleClickExport() {
        const {policyNo, insuredName, insuredCredNo, ownerName} = this.props;
        const parms = {
            ...ApiMap.commonData,
            policy_no: policyNo,
            insured_name: insuredName,
            insured_cred_no: insuredCredNo,
            owner_name: ownerName
        };

        if (!policyNo) delete parms.policy_no;
        if (!insuredName) delete parms.insured_name;
        if (!insuredCredNo) delete parms.insured_cred_no;
        if (!ownerName) delete parms.owner_name;

        http({
            url: ApiMap.policyExport.url,
            method: ApiMap.policyExport.method,
            data: parms,
            responseType: 'blob'
        })
        .then((res) => {
            downloadExcel(res.data, '投保记录');
        }, (error) => {
            common.alert(error);
        });
    }

    handleInputChange(e) {
        const el = e.target,
          name = el.name,
          value = trim(el.value);
        this.props.handleChangeInputValue(name, value);
    }

    render() {
        const {policyNo, insuredName, insuredCredNo, ownerName} = this.props;
        return (
            <div className='ir-form-wrap'>
                <Form inline>
                    <FormGroup controlId="policy_no">
                        <ControlLabel className='text-right'>保单编号</ControlLabel>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <FormControl
                            type="text"
                            name='policyNo'
                            onChange={this.handleInputChange}
                            value={policyNo}
                            placeholder="保单编号"/>
                    </FormGroup>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FormGroup controlId="insured_name">
                        <ControlLabel className='text-right'>被保险人姓名</ControlLabel>
                        {' '}
                        <FormControl
                            type="text"
                            name='insuredName'
                            onChange={this.handleInputChange}
                            value={insuredName}
                            placeholder="被保险人姓名"/>
                    </FormGroup>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FormGroup>
                        <ControlLabel className='text-right'>被保险人证件号码</ControlLabel>
                        {' '}
                        <FormControl
                            type="text"
                            name='insuredCredNo'
                            onChange={this.handleInputChange}
                            value={insuredCredNo}
                            placeholder="被保险人证件号码"/>
                    </FormGroup>
                </Form>
                <Form inline style={{marginTop: '15px'}}>
                    <FormGroup>
                        <ControlLabel className='text-right'>投保人姓名</ControlLabel>
                        {' '}
                        <FormControl
                            type="text"
                            name='ownerName'
                            onChange={this.handleInputChange}
                            value={ownerName}
                            placeholder="投保人姓名"/>
                    </FormGroup>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FormGroup controlId="station_in_sale">
                        <Button bsClass={'btn btn-main'} type='button' onClick={this.handleClickSearch}>查询</Button>
                    </FormGroup>
                </Form>
                <div className="clearfix">
                    <div className="pull-right">
                        <a href="javascript:;" className="upload-btn btn btn-main">
                            <span>导入</span>
                            <input
                                type="file"
                                name="file"
                                id="file"
                                accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                onChange={this.handleClickImport} />
                        </a>
                        <button type="button" className="btn btn-main" id="btn-export" onClick={this.handleClickExport}>导出</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default IRForm;