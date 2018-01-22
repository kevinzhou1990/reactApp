import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Col, Row, ControlLabel, FormControl} from 'react-bootstrap';
import Container from '../../component/container/Container';
import {Util, alert, pkgUnit, converson} from '../../lib/Util';
import DB from './DB';
class ProdInfo extends Component {
  constructor(props) {
    super(props);
    this.hideModal = this.hideModal.bind(this);
    this.state = {
      prodInfo: {
        "prod_no": "",
        "prod_name": "",
        "prod_src": "",
        "prod_spec": "",
        "prod_apprv_no": "",
        "prod_valid_month": 0,
        "prod_pkg_unit": 0,
        "prod_assist_code": "",
        "prod_price": 0.0,
        "prod_original_price": 0,
        "prod_cat": {},
        "prod_country_flag": 0,
        "prod_in_sale": 0,
        "prod_allow_sale": 0,
        "prod_display": 0,
        "prod_tags": [],
        "prod_crowds": [],
        "prod_ingreds": "",
        "prod_memo": "",
        "prod_imgs": [],
        "prod_intro": ""
      }
    };
  }

  hideModal() {
    this.props.handleHideModal();
  }

  componentDidMount() {
    DB.shopProdInfo({prod_id: this.props.prodId}).then(result => {

      this.setState({
        prodInfo: {
          ...this.state.prodInfo,
          ...result
        }
      });
    }).catch(err => {
      alert(err);
    });
  }

  render() {
    const data = this.state.prodInfo;
    // "prod_country_flag": 2 // 1国产2进口
    let prod_country = '';
    if (data.prod_country_flag === 1) {
      prod_country = '国产';
    }
    if (data.prod_country_flag === 2) {
      prod_country = '进口';
    }

    //"prod_in_sale": 2 // 是否在售 2停售 1在售
    let prod_in = '';
    if (data.prod_in_sale === 1) {
      prod_in = '在售';
    }
    if (data.prod_in_sale === 2) {
      prod_in = '停售';
    }
    //"prod_allow_sale": 2 // 是否可售 2不可售1可售
    let prod_allow = '';
    if (data.prod_allow_sale === 1) {
      prod_allow = '可售';
    }
    if (data.prod_allow_sale === 2) {
      prod_allow = '不可售';
    }
    //"prod_display": 2 // 是否默认显示 2不显示1显示
    let prod_display = '';
    if (data.prod_display === 1) {
      prod_display = '显示';
    }
    if (data.prod_display === 2) {
      prod_display = '不显示';
    }
    //"station_in_sale": 2 站点上架状态2未上架1上架
    let station_in_sale = '';
    if (data.station_in_sale === 1) {
      station_in_sale = '上架';
    }
    if (data.station_in_sale === 2) {
      station_in_sale = '未上架';
    }

    return (
      <Container className='data-display gird-align' title={'站点商品管理>>详情'}>
        <Row className='gird-align'>
          <Col sm={2}>
            <ControlLabel>商品编号：</ControlLabel>
          </Col>
          <Col sm={4}>
            {data.prod_no}
          </Col>
          <Col sm={2}>
            <ControlLabel>商品名称：</ControlLabel>
          </Col>
          <Col sm={4}>
            {data.prod_name}
          </Col>
        </Row>
        <Row className='gird-align'>
          <Col sm={2}>
            <ControlLabel>商品产地：</ControlLabel>
          </Col>
          <Col sm={4}>
            {data.prod_src}
          </Col>
          <Col sm={2}>
            <ControlLabel>商品规格：</ControlLabel>
          </Col>
          <Col sm={4}>
            {data.prod_src}
          </Col>
        </Row>
        <Row className='gird-align'>
          <Col sm={2}>
            <ControlLabel>批准文号：</ControlLabel>
          </Col>
          <Col sm={4}>
            {data.prod_apprv_no}
          </Col>
          <Col sm={2}>
            <ControlLabel>有效期（月）：</ControlLabel>
          </Col>
          <Col sm={4}>
            {data.prod_valid_month}月
          </Col>
        </Row>
        <Row className='gird-align'>
          <Col sm={2}>
            <ControlLabel>包装单位：</ControlLabel>
          </Col>
          <Col sm={4}>
            {pkgUnit(data.prod_pkg_unit)}
          </Col>
          <Col sm={2}>
            <ControlLabel>助记码：</ControlLabel>
          </Col>
          <Col sm={4}>
            {data.prod_assist_code}
          </Col>
        </Row>
        <Row className='gird-align'>
          <Col sm={2}>
            <ControlLabel>售价（元）：</ControlLabel>
          </Col>
          <Col sm={4}>
            {(data.prod_price || 0).toFixed(2)}
          </Col>
          <Col sm={2}>
            <ControlLabel>原价（元）：</ControlLabel>
          </Col>
          <Col sm={4}>
            {(data.prod_original_price || 0).toFixed(2)}
          </Col>
        </Row>
        <Row className='gird-align'>
          <Col sm={2}>
            <ControlLabel>商品分类：</ControlLabel>
          </Col>
          <Col sm={4}>
            {data.prod_cat.cat_text}
          </Col>
          <Col sm={2}>
            <ControlLabel>国产/进口：</ControlLabel>
          </Col>
          <Col sm={4}>
            {prod_country}
          </Col>
        </Row>
        <Row className='gird-align'>
          <Col sm={2}>
            <ControlLabel>是否在售：</ControlLabel>
          </Col>
          <Col sm={4}>
            {prod_in}
          </Col>
          <Col sm={2}>
            <ControlLabel>是否可售：</ControlLabel>
          </Col>
          <Col sm={4}>
            {prod_allow}
          </Col>
        </Row>
        <Row className='gird-align'>
          <Col sm={2}>
            <ControlLabel>默认显示：</ControlLabel>
          </Col>
          <Col sm={4}>
            {prod_display}
          </Col>
          <Col sm={2}>
            <ControlLabel>是否上架：</ControlLabel>
          </Col>
          <Col sm={4}>
            {station_in_sale}
          </Col>
        </Row>
        <Row className='gird-align'>
          <Col sm={2}>
            <ControlLabel>商品标签：</ControlLabel>
          </Col>
          <Col sm={10}>
            {data.prod_tags.map(function(tag) {
              return tag.tag_text;
            }).join('/')}
          </Col>
        </Row>
        <Row className='gird-align'>
          <Col sm={2}>
            <ControlLabel>档案人群分类：</ControlLabel>
          </Col>
          <Col sm={10}>
            {(data.doc_crowds || []).map((crowd) => {
              return crowd['crowd_text'];
            }).join('/')}
          </Col>
        </Row>
        <Row className='gird-align'>
          <Col sm={2}>
            <ControlLabel>筛选人群分类：</ControlLabel>
          </Col>
          <Col sm={10}>
            {data.prod_crowds.map((crowd) => {
              return crowd['crowd_text'];
            }).join('/')}
          </Col>
        </Row>
        <Row className='gird-align'>
          <Col sm={2}>
            <ControlLabel>主要成分：</ControlLabel>
          </Col>
          <Col sm={10}>
            {data.prod_ingreds}
          </Col>
        </Row>
        <Row className='gird-align'>
          <Col sm={2}>
            <ControlLabel>备注：</ControlLabel>
          </Col>
          <Col sm={10}>
            {data.prod_memo}
          </Col>
        </Row>
        <Row className='gird-align'>
          <Col sm={2}>
            <ControlLabel>商品图片：</ControlLabel>
          </Col>
          <Col sm={10} className='auto-height prodManage-info-img'>
            {data.prod_imgs.map((imgSrc, index) => {
              return <img key={index} src={converson(imgSrc)}/>;
            })}
          </Col>
        </Row>
        <Row className='gird-align'>
          <Col sm={2}>
            <ControlLabel>商品介绍：</ControlLabel>
          </Col>
          <Col sm={10} className='auto-height'>
            <div>
              <FormControl.Static name="prod_intro" componentClass="div" className="normalLable" dangerouslySetInnerHTML={{
                __html: data.prod_intro
              }}/>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
ReactDOM.render(
  <ProdInfo prodId={Util.data('prodManage/Info')}/>, document.getElementById('__prodManage/Info__'));
