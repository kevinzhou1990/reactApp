import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {Button} from 'react-bootstrap';
import Gird from '../../component/table/Table';
import Container from '../../component/container/Container';
import Condition from '../../component/condition/Condition';
import PageNation from '../../component/pageNation/pageNation';
import {alert, confirm, createTab, downloadExcel} from '../../lib/Util';
import {logger} from '../../lib/logger';
import ConditionForm from './ConditionForm';
import ModifyProd from './ModifyProd';
import DB from './DB';
import Add from './Add';

import './style.css';

let common = window.common;
class ProdManage extends Component {

  constructor(props) {
    super(props);
    // table 列参数
    this.columns = [
      {
        title: '商品编号',
        key: 'prod_no',
        dataIndex: 'prod_no'
      }, {
        title: '商品名称',
        key: 'prod_name',
        dataIndex: 'prod_name'
      }, {
        title: '商品产地',
        key: 'prod_src',
        dataIndex: 'prod_src'
      }, {
        title: '商品规格',
        key: 'prod_spec',
        dataIndex: 'prod_spec'
      }, {
        title: '商品分类',
        key: 'prod_cat_text',
        dataIndex: 'prod_cat.cat_text'
      }, {
        title: '商品标签',
        key: 'prod_tags_txt',
        render(value, row) {
          let tagStr = _.map(row.prod_tags, function(tag) {
            return tag['tag_text'];
          }).join('/');
          return (
            <div>
              {tagStr}
            </div>
          );
        }
      }, {
        title: '档案人群分类',
        key: 'prod_crowd_txt',
        render(value, row) {
          let crowdStr = _.map(row.doc_crowds, function(crowd) {
            return crowd['crowd_text'];
          }).join('/');
          return (
            <div>
              {crowdStr}
            </div>
          );
        }
      }, {
        title: '助记码',
        key: 'prod_assist_code',
        dataIndex: 'prod_assist_code'
      }, {
        title: '是否在售',
        key: 'prod_in_sale',
        dataIndex: 'prod_in_sale',
        render(value, row) {
          if (row.prod_in_sale === 1) {
            return '在售';
          }
          if (row.prod_in_sale === 2) {
            return '停售';
          }
          return ' ';
        }
      }, {
        title: '是否上架',
        key: 'station_in_sale',
        dataIndex: 'station_in_sale',
        render(value, row) {
          if (row.station_in_sale === 1) {
            return '上架';
          }
          if (row.station_in_sale === 2) {
            return <a style={{
              color: 'red'
            }}>未上架</a>;
          }
          return ' ';
        }
      }, {
        key: 'Operations',
        title: '操作',
        render: (value, row) => {
          return (
            <div className='optCol'>
              <a href="#" onClick={(e) => {
                this.showUpdateCommodityModal(e, row);
              }}>修改</a>
              <a href="#" onClick={(e) => {
                this.showCommodityInfo(e, row);
              }}>详情</a>
              <a href="#" onClick={e => this.deleteProd(e, row)}>删除</a>
            </div>
          );
        }
      }
    ];
    this.handleGetPage = this.handleGetPage.bind(this);
    this.showUpdateCommodityModal = this.showUpdateCommodityModal.bind(this);

    this.handleupdateProd = this.handleupdateProd.bind(this);
    this.showCommodityInfo = this.showCommodityInfo.bind(this);
    this.deleteProd = this.deleteProd.bind(this);
    this.doExport = this.doExport.bind(this);

    /*查询试图事件*/
    this.handleIndexSearch = this.handleIndexSearch.bind(this);
    this.handleIndexCheckboxChange = this.handleIndexCheckboxChange.bind(this);
    this.handleIndexSelectChange = this.handleIndexSelectChange.bind(this);
    this.handleIndexInputChange = this.handleIndexInputChange.bind(this);

    /*新增页面事件*/
    this.handleShowAddProd = this.handleShowAddProd.bind(this);
    this.hideAddModal = this.hideAddModal.bind(this);
    this.handleAddSearch = this.handleAddSearch.bind(this);
    this.handleAddCheckboxChange = this.handleAddCheckboxChange.bind(this);
    this.handleAddSelectChange = this.handleAddSelectChange.bind(this);
    this.handleAddInputChange = this.handleAddInputChange.bind(this);
    this.handleAddPage = this.handleAddPage.bind(this);
    this.handleAddOnCheck = this.handleAddOnCheck.bind(this);
    this.handleAddAllOnChange = this.handleAddAllOnChange.bind(this);
    this.handleAddProds = this.handleAddProds.bind(this);
    this.handleCloseAddModal = this.handleCloseAddModal.bind(this);

    /*修改商品*/
    this.updateProd = this.updateProd.bind(this);
    this.hideModifyProd = this.hideModifyProd.bind(this);
    this.modifyProdSelectChange = this.modifyProdSelectChange.bind(this);
    this.handleCloseModifyModal = this.handleCloseModifyModal.bind(this);

    this.indexViewData = {
      girdData: [],
      pageNumber: 1,
      currentPage: 1,
      total: 0,
      search_data: {
        begin: 0,
        count: 20,
        prod_assist_code: '',
        prod_name: '',
        prod_src: '',
        prod_cats: [],
        prod_tags: [],
        doc_crowds: [],
        station_in_sale: undefined
      }
    };
    this.addViewData = {
      show: false,
      allCheckState: false,
      gridData: [],
      currentPage: 1,
      pageNumber: 1,
      addProdIds: [],
      total: 0,
      search_data: {
        begin: 0,
        count: 20,
        prod_display: undefined,
        prod_assist_code: '',
        prod_in_sale: 1,
        prod_name: '',
        prod_src: '',
        prod_cats: [],
        prod_tags: [],
        doc_crowds: [],
        exclude_station_product: 1
      }
    };
    this.modifyProd = {
      show: false,
      prod_data: {
        prod_id: '',
        prod_no: '',
        prod_name: '',
        prod_src: '',
        prod_spec: '',
        station_in_sale: 0
      }
    };

    this.state = {
      cats: [],
      crowds: [],
      tags: [],
      modifyProd: {
        ...this.modifyProd
      },
      indexViewData: {
        ...this.indexViewData
      },
      addViewData: {
        ...this.addViewData
      }
    };
  }
  //导出
  doExport() {
    const search_data = this.state.indexViewData.search_data;
    DB.exportData(search_data).then(result => {
      downloadExcel(result, '站点商品');
    });
  }

  // 删除数据
  deleteProd(e, data) {
    e.preventDefault();
    confirm('确认要删除？', () => {
      logger(data);
      DB.deleteStationProd({prod_id: data.prod_id}).then(result => {
        logger(result);
        alert('删除成功');
        this.handleIndexSearch();
      }).catch(err => {
        alert(err);
      });
    });
  }

  handleCloseModifyModal() {
    this.setState({
      modifyProd: {
        ...this.state.modifyProd,
        show: false
      }
    });
  }

  // 显示商品详情
  showCommodityInfo(e, data) {
    createTab({
      uri: 'app/dist/prodManage/Info.html',
      data: {
        name: '站点商品详情'
      },
      key: 'prodManageInfo'
    });
    common.Util.data('prodManage/Info', data.prod_id);
  }

  // 修改商品
  handleupdateProd(result) {
    if (result.ret_code === 1) {
      alert('修改成功');
      DB.fetchProdList(this.state.indexViewData.search_data).then(data => {
        let pageNumber = Math.ceil(data.total / this.state.count) || 1;
        this.setState({girdData: data.prod_list, total: data.total, pageNumber: pageNumber});
      }).catch((err) => {
        alert(err);
      });
    } else {
      alert('修改失败');
    }
  }

  // 显示修改商品modal
  showUpdateCommodityModal(e, data) {
    /*
    modifyProd: {
      show: false,
      prod_data: {
        prod_id: '',
        prod_no: '',
        prod_name: '',
        prod_src: '',
        prod_spec: '',
        station_in_sale: 1
      }
    }
    */
    e.preventDefault();
    const modifyProdData = _.pick(data, [
      'prod_id',
      'prod_no',
      'prod_name',
      'prod_src',
      'prod_spec',
      'station_in_sale'
    ]);
    this.setState({
      modifyProd: {
        ...this.state.modifyProd,
        show: true,
        prod_data: {
          ...this.state.modifyProd.prod_data,
          ...modifyProdData
        }
      }
    });
  }

  // 翻页查询
  handleGetPage({currentPage}) {
    const indexViewData = this.state.indexViewData;
    const search_data = {
      ...indexViewData.search_data,
      begin: (currentPage - 1) * indexViewData.search_data.count
    };
    DB.fetchStationProdList(search_data).then(result => {
      let pageNumber = Math.ceil(result.total / search_data.count) || 1;
      this.setState({
        indexViewData: {
          ...this.state.indexViewData,
          girdData: result.prod_list,
          total: result.total,
          currentPage,
          pageNumber,
          search_data
        }
      });
    }).catch(err => {
      alert(err);
    });
  }

  componentDidMount() {
    const indexViewData = this.state.indexViewData;
    const search_data = indexViewData.search_data;
    const fetchStationProdList = DB.fetchStationProdList(search_data);
    const fetchShopProdmeta = DB.fetchShopProdmeta();
    const fetchData = Promise.all([fetchStationProdList, fetchShopProdmeta]);
    fetchData.then(([ProdData, ProdMeta]) => {
      let pageNumber = Math.ceil(ProdData.total / search_data.count) || 1;

      this.setState({
        indexViewData: {
          ...indexViewData,
          girdData: ProdData.prod_list,
          total: ProdData.total,
          pageNumber: pageNumber
        },
        cats: ProdMeta.cats,
        crowds: ProdMeta.doc_crowds,
        tags: ProdMeta.tags
      });
    }).catch(err => {
      alert(err);
    });
  }

  render() {
    const addViewData = this.state.addViewData;
    const addViewProps = {
      tags: this.state.tags,
      crowds: this.state.crowds,
      cats: this.state.cats,
      addProdIds: addViewData.addProdIds,
      hideAddModal: this.hideAddModal,
      handleSearch: this.handleAddSearch,
      handleCheckboxChange: this.handleAddCheckboxChange,
      handleSelectChange: this.handleAddSelectChange,
      handleInputChange: this.handleAddInputChange,
      handlePage: this.handleAddPage,
      handleOnCheck: this.handleAddOnCheck,
      handleAllOnChange: this.handleAddAllOnChange,
      handleAddProds: this.handleAddProds,
      closeModal: this.handleCloseAddModal,
      show: addViewData.show,
      allCheckState: addViewData.allCheckState,
      currentPage: addViewData.currentPage,
      pageCount: addViewData.total,
      pageNumber: addViewData.pageNumber,
      gridData: addViewData.gridData,
      prod_assist_code: addViewData.search_data.prod_assist_code,
      prod_name: addViewData.search_data.prod_name,
      prod_src: addViewData.search_data.prod_src,
      prod_cats: addViewData.search_data.prod_cats,
      prod_tags: addViewData.search_data.prod_tags,
      doc_crowds: addViewData.search_data.doc_crowds,
      station_in_sale: addViewData.search_data.station_in_sale,
      prod_display: addViewData.search_data.prod_display,
      begin: addViewData.search_data.begin
    };

    const indexViewData = this.state.indexViewData;
    const indexConFormView = {
      tags: this.state.tags,
      crowds: this.state.crowds,
      cats: this.state.cats,
      handleConditionSearch: this.handleIndexSearch,
      handleCheckboxChange: this.handleIndexCheckboxChange,
      handleSelectChange: this.handleIndexSelectChange,
      handleInputChange: this.handleIndexInputChange,
      prod_assist_code: indexViewData.search_data.prod_assist_code,
      prod_name: indexViewData.search_data.prod_name,
      prod_src: indexViewData.search_data.prod_src,
      prod_cats: indexViewData.search_data.prod_cats,
      prod_tags: indexViewData.search_data.prod_tags,
      doc_crowds: indexViewData.search_data.doc_crowds,
      station_in_sale: indexViewData.search_data.station_in_sale
    };
    return (
      <Container className='p20' title={'站点商品管理'}>
        <Condition>
          <div className='pull-left'>
            <ConditionForm {...indexConFormView}/>
          </div>
          <div className='pull-right'>
            <Button onClick={this.handleShowAddProd} className='btn btn-main'>新增</Button>
            {' '}
            <Button onClick={this.doExport} className='btn btn-main'>导出</Button>
          </div>
        </Condition>
        <Gird rowKey='prod_id' columns={this.columns} data={this.state.indexViewData.girdData}/>
        <PageNation pageCount={this.state.indexViewData.total} getPage={this.handleGetPage} currentPage={this.state.indexViewData.currentPage} pageNumber={this.state.indexViewData.pageNumber}/>
        <ModifyProd updateProd={this.updateProd} handleSelectChange={this.modifyProdSelectChange} handleHideModal={this.hideModifyProd} closeModal={this.handleCloseModifyModal} {...this.state.modifyProd.prod_data} show={this.state.modifyProd.show}/>
        <Add {...addViewProps}/>
      </Container>
    );
  }

  /*修改商品  */
  /*
  modifyProd: {
    show: false,
    prod_data: {
      prod_id: '',
      prod_no: '',
      prod_name: '',
      prod_src: '',
      prod_spec: '',
      station_in_sale: 1
    }
  }
  */
  updateProd() {
    DB.updateStationProd({station_in_sale: this.state.modifyProd.prod_data.station_in_sale, prod_id: this.state.modifyProd.prod_data.prod_id}).then(result => {
      this.hideModifyProd();
      this.handleIndexSearch();
      logger(result);
    }).catch(err => {
      alert(err);
    });
  }
  // 隐藏修改商品modal
  hideModifyProd() {
    this.setState({
      modifyProd: {
        ...this.state.modifyProd,
        show: false
      }
    });
  }
  modifyProdSelectChange(data) {
    this.setState({
      modifyProd: {
        ...this.state.modifyProd,
        prod_data: {
          ...this.state.modifyProd.prod_data,
          ...data
        }
      }
    });
  }
  /*查询试图事件*/
  /*
  indexViewData: {
    girdData: [],
    pageNumber: 1,
    total: 0,
    search_data: {
      begin: 0,
      count: 5,
      prod_assist_code: '',
      prod_name: '',
      prod_src: '',
      prod_cats: [],
      prod_tags: [],
      doc_crowds: [],
      station_in_sale: 1
    }
  }*/
  handleIndexSearch() {
    const indexViewData = this.state.indexViewData;
    const search_data = {
      ...indexViewData.search_data,
      begin: 0
    };
    DB.fetchStationProdList(search_data).then(result => {
      let pageNumber = Math.ceil(result.total / search_data.count) || 1;
      this.setState({
        indexViewData: {
          ...indexViewData,
          girdData: result.prod_list,
          total: result.total,
          pageNumber: pageNumber,
          currentPage: 1,
          search_data
        }
      });
    }).catch(err => {
      alert(err);
    });
  }
  handleIndexCheckboxChange(name, value) {
    const arr = this.state.indexViewData.search_data[name];
    const index = arr.findIndex(item => {
      return item === value;
    });
    if (index < 0) {
      arr.push(value);
    } else {
      arr.splice(index, 1);
    }
    this.setState({
      indexViewData: {
        ...this.state.indexViewData,
        search_data: {
          ...this.state.indexViewData.search_data,
          [name]: arr
        }
      }
    });
  }
  handleIndexSelectChange(name, value) {
    this.setState({
      indexViewData: {
        ...this.state.indexViewData,
        search_data: {
          ...this.state.indexViewData.search_data,
          [name]: value
        }
      }
    });
  }
  handleIndexInputChange(name, value) {
    this.setState({
      indexViewData: {
        ...this.state.indexViewData,
        search_data: {
          ...this.state.indexViewData.search_data,
          [name]: value
        }
      }
    });
  }

  // 新增页面操作
  /*
  addViewData: {
    show: false,
    gridData: [],
    pageNumber: 1,
    addProdIds: [],
    search_data: {
      begin: 0,
      count: 5,
      prod_display: 1,
      prod_assist_code: '',
      prod_name: '',
      prod_src: '',
      prod_cats: [],
      prod_tags: [],
      doc_crowds: [],
      station_in_sale: 1
    }
  }
}
  */

  handleCloseAddModal() {
    this.setState({
      addViewData: {
        ...this.state.addViewData,
        show: false
      }
    });
  }

  handleAddProds() {
    const prod_id_list = this.state.addViewData.addProdIds;

    if (prod_id_list.length === 0) {
      alert('请选择商品');
    } else {
      DB.stationProdCreate({prod_id_list: this.state.addViewData.addProdIds}).then(() => {
        this.hideAddModal();
        this.handleIndexSearch();
      }).catch(err => {
        alert(err);
      });
    }

  }
  handleAddOnCheck(e, data) {
    const checkedState = e.target.checked;
    const prodId = data.prod_id;
    let prodIds = this.state.addViewData.addProdIds;
    const index = prodIds.findIndex(item => {
      return item === prodId;
    });
    // if (index < 0) {
    //   arr.push(value);
    // } else {
    //   arr.splice(index, 1);
    // }
    if (checkedState) {
      if (index < 0) {
        prodIds.push(prodId);
      }
    } else {
      prodIds.splice(index, 1);
    }
    this.setState({
      addViewData: {
        ...this.state.addViewData,
        addProdIds: prodIds
      }
    });
  }
  handleAddAllOnChange(e) {
    const checkedState = e.target.checked;
    if (checkedState) {
      let prodIds = this.state.addViewData.gridData.map(item => {
        return item.prod_id;
      });
      this.setState({
        addViewData: {
          ...this.state.addViewData,
          addProdIds: prodIds,
          allCheckState: true
        }
      });
    } else {
      this.setState({
        addViewData: {
          ...this.state.addViewData,
          addProdIds: [],
          allCheckState: false
        }
      });
    }
  }

  handleAddCheckboxChange(name, value) {
    const arr = this.state.addViewData.search_data[name];
    const index = arr.findIndex(item => {
      return item === value;
    });
    if (index < 0) {
      arr.push(value);
    } else {
      arr.splice(index, 1);
    }
    this.setState({
      addViewData: {
        ...this.state.addViewData,
        search_data: {
          ...this.state.addViewData.search_data,
          [name]: arr
        }
      }
    });
  }
  handleAddSelectChange(name, value) {
    this.setState({
      addViewData: {
        ...this.state.addViewData,
        search_data: {
          ...this.state.addViewData.search_data,
          [name]: value
        }
      }
    });
  }
  handleAddInputChange(name, value) {
    this.setState({
      addViewData: {
        ...this.state.addViewData,
        search_data: {
          ...this.state.addViewData.search_data,
          [name]: value
        }
      }
    });
  }
  hideAddModal() {
    this.setState({
      addViewData: {
        ...this.addViewData,
        show: false
      }
    });
  }
  handleShowAddProd() {
    const addViewData = this.state.addViewData;
    const search_data = addViewData.search_data;
    DB.fetchProdList(search_data).then(result => {
      let pageNumber = Math.ceil(result.total / search_data.count) || 1;
      this.setState({
        addViewData: {
          ...addViewData,
          show: true,
          total: result.total,
          gridData: result.prod_list,
          pageNumber: pageNumber,
          addProdIds: []
        }
      });
    });
  }
  handleAddSearch() {
    const addViewData = this.state.addViewData;
    const search_data = {
      ...addViewData.search_data,
      begin: 0
    };
    DB.fetchProdList(search_data).then(result => {
      let pageNumber = Math.ceil(result.total / search_data.count) || 1;
      this.setState({
        addViewData: {
          ...addViewData,
          gridData: result.prod_list,
          total: result.total,
          pageNumber: pageNumber,
          currentPage: 1,
          search_data
        }
      });
    });
  }
  handleAddPage({currentPage}) {
    // const begin = currentPage - 1;
    const addViewData = this.state.addViewData;
    const search_data = {
      ...addViewData.search_data,
      begin: (currentPage - 1) * addViewData.search_data.count
    };
    DB.fetchProdList(search_data).then(result => {
      let pageNumber = Math.ceil(result.total / search_data.count) || 1;
      this.setState({
        addViewData: {
          ...addViewData,
          gridData: result.prod_list,
          total: result.total,
          currentPage,
          pageNumber: pageNumber,
          search_data
        }
      });
    });
  }
}

ReactDOM.render(< ProdManage />, document.getElementById('__prodManage/List__'));
