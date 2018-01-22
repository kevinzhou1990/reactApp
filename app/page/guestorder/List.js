import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import Gird from '../../component/table/Table';
import Container from '../../component/container/Container';
import Condition from '../../component/condition/Condition';
import PageNation from '../../component/pageNation/pageNation';
import HecadreListbyarea from './hecadreListbyarea/HecadreListbyarea';
import {
  alert,
  downloadExcel,
  createTab,
  Util,
  formatDateTime,
  amount_format
} from '../../lib/Util';
import ConditionForm from './ConditionForm';
// import {logger} from '../../lib/logger';
import DB from './DB';
import './style.css';

class GuestorderList extends Component {

  constructor(props) {
    super(props);
    // list 列参数
    this.columns = [
      {
        title: '意向单号',
        key: 'guest_order_no',
        dataIndex: 'guest_order_no'
      }, {
        title: '提交时间',
        key: 'create_date',
        dataIndex: 'create_date',
        render: (value) => {
          return formatDateTime(value);
        }
      }, {
        title: '金额总计',
        key: 'guest_order_amount',
        dataIndex: 'guest_order_amount',
        render(value) {
          return amount_format(value);
        }
      }, {
        title: '商品数量',
        key: 'prod_num',
        dataIndex: 'prod_num'
      }, {
        title: '收货人',
        key: 'receipt_name',
        dataIndex: 'receipt_name'
      }, {
        title: '联系电话',
        key: 'receipt_contact',
        dataIndex: 'receipt_contact'
      }, {
        title: '地址',
        key: 'receipt_address',
        dataIndex: 'receipt_address'
      }, {
        title: '指定健管师',
        key: 'hecadre_assigned',
        dataIndex: 'hecadre_assigned'
      }, {
        title: '状态',
        key: 'guest_order_status',
        dataIndex: 'guest_order_status',
        render(value, row) {
          if (row.guest_order_status === 1) {
            return '待指定';
          }
          if (row.guest_order_status === 2) {
            return '待处理';
          }
          if (row.guest_order_status === 3) {
            return '已处理';
          }
          if (row.guest_order_status === 4) {
            return '已取消';
          }
          if (row.guest_order_status === 5) {
            return '已拒绝';
          }
          return ' ';
        }
      }, {
        key: 'Operations',
        title: '操作',
        render: (value, row) => {
          let status = null;
          if (row.guest_order_status === 1) {
            status = <a onClick={(e) => {
              this.guestorderAssign(e, row);
            }} href='#'>指定健管师</a>;
          }
          return (
            <div className='optCol'>
              {status}
              <a href="#" onClick={(e) => {
                this.showGuestorderInfo(e, row);
              }}>详情</a>
            </div>
          );
        }
      }
    ];

    this.handleGetPage = this.handleGetPage.bind(this);
    this.guestorderAssign = this.guestorderAssign.bind(this);
    this.showGuestorderInfo = this.showGuestorderInfo.bind(this);
    this.handleExport = this.handleExport.bind(this);

    // 列表查询事件
    this.handleIndexSearch = this.handleIndexSearch.bind(this);
    this.handleIndexCreateStart = this.handleIndexCreateStart.bind(this);
    this.handleIndexCreateEnd = this.handleIndexCreateEnd.bind(this);
    this.handleIndexSelectChange = this.handleIndexSelectChange.bind(this);
    this.handleIndexInputChange = this.handleIndexInputChange.bind(this);
    this.handleIndexDateChange = this.handleIndexDateChange.bind(this);

    // 指派健管师
    this.handleHecadreSearch = this.handleHecadreSearch.bind(this);
    this.handleHecadreSelectChange = this.handleHecadreSelectChange.bind(this);
    this.handleHecadreHideModal = this.handleHecadreHideModal.bind(this);
    this.handleHecadreGetPage = this.handleHecadreGetPage.bind(this);
    this.handleassignHecadre = this.handleassignHecadre.bind(this);
    this.handleHecadreRadioCheck = this.handleHecadreRadioCheck.bind(this);

    this.province = {};
    this.city = {};
    this.district = {};
    this.street = {};
    this.station = {};

    this.indexViewData = {
      girdData: [],
      pageNumber: 1,
      total: 0,
      currentPage: 1,
      search_data: {
        create_start: null,
        create_end: null,
        guest_order_no: '',
        receipt_name: '',
        receipt_contact: '',
        guest_order_status: 0,
        begin: 0,
        count: 20
      }
    };
    this.hecadreViewData = {
      show: false,
      guest_order_id: 0,
      hecadre_uid: 0,
      province: [],
      city: [],
      district: [],
      street: [],
      station: [],
      girdData: [],
      pageNumber: 1,
      currentPage: 1,
      total: 0,
      search_data: {
        province_area_id: 0,
        city_area_id: 0,
        district_area_id: 0,
        street_area_id: 0,
        station_id: 0,
        begin: 0,
        count: 20
      }
    };
    this.state = {
      indexViewData: {
        ...this.indexViewData
      },
      hecadreViewData: {
        ...this.hecadreViewData
      }
    };
  }

  // 显示商品详情
  showGuestorderInfo(e, data) {
    createTab({
      uri: 'app/dist/guestorder/Info.html',
      data: {
        name: '订货意向详情'
      },
      key: 'GuestorderInfo'
    });
    Util.data('guestorder/Info', data);
  }

  // 翻页查询
  handleGetPage({currentPage}) {
    const indexViewData = this.state.indexViewData;
    const search_data = {
      ...indexViewData.search_data,
      begin: (currentPage - 1) * indexViewData.search_data.count
    };

    DB.shopGuestorderList(search_data).then((result) => {
      let pageNumber = Math.ceil(result.total / search_data.count) || 1;
      this.setState({
        indexViewData: {
          ...indexViewData,
          girdData: result.guest_order_list,
          total: result.total,
          currentPage,
          pageNumber,
          search_data: search_data
        }
      });
    }).catch(err => {
      alert(err);
    });

  }

  fetchArea(province_area_id, city_area_id, district_area_id) {
    const fetchProvince = new Promise((resolve, reject) => {
      if (_.isEmpty(this.province)) {
        DB.fetchArealist().then(result => {
          this.province = result;
          resolve(result);
        }).catch(err => {
          reject(err);
        });
      } else {
        resolve(this.province);
      }
    });

    const fetchCity = new Promise((resolve, reject) => {
      let city = this.city;
      if (!province_area_id) {
        resolve([]);
      } else {
        if (_.isEmpty(city) || _.isEmpty(city[province_area_id])) {
          DB.fetchArealist({area_id_higher: province_area_id}).then(result => {
            city[province_area_id] = result;
            resolve(result);
          }).catch(err => {
            reject(err);
          });
        } else {
          resolve(city[province_area_id]);
        }
      }
    });

    const fetchDistrict = new Promise((resolve, reject) => {
      let district = this.district;
      if (!city_area_id) {
        resolve([]);
      } else {
        if (_.isEmpty(district) || _.isEmpty(district[city_area_id])) {
          DB.fetchArealist({area_id_higher: city_area_id}).then(result => {
            district[city_area_id] = result;
            resolve(result);
          }).catch(err => {
            reject(err);
          });
        } else {
          resolve(district[city_area_id]);
        }
      }
    });

    const fetchStreet = new Promise((resolve, reject) => {
      let street = this.street;
      if (!district_area_id) {
        resolve([]);
      } else {
        if (_.isEmpty(street) || _.isEmpty(street[district_area_id])) {
          DB.fetchArealist({area_id_higher: district_area_id}).then(result => {
            street[district_area_id] = result;
            resolve(result);
          }).catch(err => {
            reject(err);
          });
        } else {
          resolve(street[district_area_id]);
        }
      }
    });

    return Promise.all([fetchProvince, fetchCity, fetchDistrict, fetchStreet]);
  }

  // 显示指派健管师弹出框
  guestorderAssign(e, row) {
    e.preventDefault();
    const province_area_id = row.province_area_id,
      city_area_id = row.city_area_id,
      district_area_id = row.district_area_id,
      street_area_id = row.street_area_id;

    this.fetchArea(province_area_id, city_area_id, district_area_id).then(([province, city, district, street]) => {
      const hecadreViewData = this.state.hecadreViewData;
      const args = {
        ...hecadreViewData.search_data,
        province_area_id: province_area_id,
        city_area_id: city_area_id,
        district_area_id: district_area_id,
        street_area_id: street_area_id,
        station_id: undefined
      };
      DB.fetchListbyareastation(args).then(result => {
        let pageNumber = Math.ceil(result.total / args.count) || 1;
        this.station[args.street_area_id] = result.station_list;
        this.setState({
          hecadreViewData: {
            ...hecadreViewData,
            show: true,
            province: province,
            city: city,
            district: district,
            street: street,
            guest_order_id: row.guest_order_id,
            station: result.station_list,
            girdData: result.hecadre_list,
            pageNumber: pageNumber,
            total: result.total,
            search_data: {
              ...args
            }
          }
        });
      }).catch(err => {
        alert(err);
      });
    });

  }

  componentDidMount() {
    this.handleIndexSearch();
  }

  render() {
    const state_hecadreViewData = this.state.hecadreViewData;
    const hecadreViewData = {
      show: state_hecadreViewData.show,
      guest_order_id: state_hecadreViewData.guest_order_id,
      hecadre_uid: state_hecadreViewData.hecadre_uid,
      pageCount: state_hecadreViewData.total,
      begin: state_hecadreViewData.search_data.begin,
      currentPage: state_hecadreViewData.currentPage,
      pageNumber: state_hecadreViewData.pageNumber,
      province_area_id: state_hecadreViewData.search_data.province_area_id,
      city_area_id: state_hecadreViewData.search_data.city_area_id,
      district_area_id: state_hecadreViewData.search_data.district_area_id,
      street_area_id: state_hecadreViewData.search_data.street_area_id,
      station_id: state_hecadreViewData.search_data.station_id,
      province: state_hecadreViewData.province,
      city: state_hecadreViewData.city,
      district: state_hecadreViewData.district,
      street: state_hecadreViewData.street,
      station: state_hecadreViewData.station,
      girdData: state_hecadreViewData.girdData,
      handleSearch: this.handleHecadreSearch,
      assignHecadre: this.handleassignHecadre,
      handleSelectChange: this.handleHecadreSelectChange,
      hideHecadreModal: this.handleHecadreHideModal,
      handleGetPage: this.handleHecadreGetPage,
      handleRadioCheck: this.handleHecadreRadioCheck
    };

    const conditonViewProps = {
      ...this.state.indexViewData.search_data,
      handleSearch: this.handleIndexSearch,
      handleCreateStart: this.handleIndexCreateStart,
      handleCreateEnd: this.handleIndexCreateEnd,
      handleSelectChange: this.handleIndexSelectChange,
      handleInputChange: this.handleIndexInputChange,
      handleDateChange: this.handleIndexDateChange
    };
    return (
      <Container className='p20' title={'订货意向管理'}>
        <Condition>
          <div className='pull-left'>
            <ConditionForm {...conditonViewProps}/>
          </div>
          <div className='pull-right'>
            <button className='btn btn-main' onClick={this.handleExport}>导出</button>
          </div>
        </Condition>
        <Gird rowKey='guest_order_id' columns={this.columns} data={this.state.indexViewData.girdData}/>
        <PageNation pageCount={this.state.indexViewData.total} getPage={this.handleGetPage} currentPage={this.state.indexViewData.currentPage} pageNumber={this.state.indexViewData.pageNumber}/>
        <HecadreListbyarea {...hecadreViewData}/>
      </Container>
    );
  }

  handleExport() {
    const search_data = this.state.indexViewData.search_data;
    DB.exportData(search_data).then(result => {
      downloadExcel(result, '订货意向');
    });
  }

  // 指派健管师
  handleassignHecadre(args) {
    if (args.hecadre_uid) {
      DB.shopGuestorderAssign({guest_order_id: args.guest_order_id, hecadre_uid: args.hecadre_uid}).then(() => {
        this.handleIndexSearch();
        this.handleHecadreHideModal();
      }).catch(err => {
        alert(err);
      });
    } else {
      alert('请选择健管师');
    }

  }
  handleHecadreRadioCheck(hecadre_uid){
    debugger;
    this.setState({
      hecadreViewData: {
        ...this.state.hecadreViewData,
        hecadre_uid
      }
    });
  }
  handleHecadreSearch() {
    const hecadreViewData = this.state.hecadreViewData;
    const search_data = {
      ...hecadreViewData.search_data,
      begin: 0
    };
    DB.fetchListbyareastation(search_data).then((result) => {
      // debugger;
      let pageNumber = Math.ceil(result.total / search_data.count) || 1;
      this.station[search_data.street_area_id] = result.station_list;
      let _hecadreViewData = {
        ...hecadreViewData,
        girdData: result.hecadre_list || [],
        total: result.total,
        pageNumber,
        currentPage: 1,
        search_data
      };
      if (!search_data.station_id) {
        hecadreViewData['station'] = result.station_list;
      }
      this.setState({hecadreViewData: _hecadreViewData});
    }).catch(err => {
      alert(err);
    });
  }
  handleHecadreSelectChange(selectData) {
    const hecadreViewData = this.state.hecadreViewData;
    const search_data = {
      ...hecadreViewData.search_data,
      ...selectData
    };
    // 把当前区域下面区的置空
    const areaArr = ['province_area_id', 'city_area_id', 'district_area_id', 'street_area_id', 'station_id'];
    const area = _.keys(selectData)[0];
    const index = _.findIndex(areaArr, item => {
      return item === area;
    });
    if (index > -1) {
      for (let i = index + 1; i < areaArr.length; i++) {
        search_data[areaArr[i]] = 0;
      }
    }

    // 省市区级联
    // 当选择区时，查询列表获取卫生站信息。
    this.fetchArea(search_data.province_area_id, search_data.city_area_id, search_data.district_area_id).then(([province, city, district, street]) => {
      if (index === 3) {
        // const hecadreViewData = this.state.hecadreViewData;
        const search_data2 = {
          ...hecadreViewData.search_data,
          ...search_data
        };
        if (this.station[search_data2.street_area_id]) {
          this.setState({
            hecadreViewData: {
              ...this.state.hecadreViewData,
              station: this.station[search_data2.street_area_id],
              search_data: search_data2
            }
          });
        } else {
          DB.fetchListbyareastation(search_data2).then((result) => {
            this.station[search_data2.street_area_id] = result.station_list;
            this.setState({
              hecadreViewData: {
                ...this.state.hecadreViewData,
                station: result.station_list || [],
                search_data: search_data2
              }
            });
          }).catch(err => {
            alert(err);
          });
        }
      } else {
        this.setState({
          hecadreViewData: {
            ...hecadreViewData,
            show: true,
            province: province,
            city: city,
            district: district,
            street: street,
            // station: [],
            search_data
          }
        });
      }
    });
  }
  handleHecadreHideModal() {
    this.setState({
      hecadreViewData: {
        ...this.hecadreViewData,
        show: false
      }
    });
  }
  handleHecadreGetPage({currentPage}) {
    debugger;
    const hecadreViewData = this.state.hecadreViewData;
    const search_data = {
      ...hecadreViewData.search_data,
      begin: (currentPage - 1) * hecadreViewData.search_data.count
    };
    DB.fetchListbyareastation(search_data).then((result) => {
      let pageNumber = Math.ceil(result.total / search_data.count) || 1;
      this.setState({
        hecadreViewData: {
          ...this.state.hecadreViewData,
          girdData: result.hecadre_list,
          // station: result.station_list,
          total: result.total,
          currentPage,
          pageNumber,
          hecadre_uid: 0,
          pageCode: pageNumber,
          search_data
        }
      });
    }).catch(err => {
      alert(err);
    });
  }

  // 列表查询事件
  handleIndexSearch() {
    // const condition = this.state.indexViewData.search_data;
    const indexViewData = this.state.indexViewData;
    const search_data = {
      ...indexViewData.search_data,
      begin: 0
    };
    DB.shopGuestorderList(search_data).then((result) => {
      let pageNumber = Math.ceil(result.total / search_data.count) || 1;
      this.setState({
        indexViewData: {
          ...indexViewData,
          girdData: result.guest_order_list,
          total: result.total,
          pageNumber,
          currentPage: 1,
          search_data
        }
      });
    }).catch(err => {
      alert(err);
    });
  }
  handleIndexCreateStart(value, formattedValue) {
    this.setState({
      indexViewData: {
        ...this.state.indexViewData,
        search_data: {
          ...this.state.indexViewData.search_data,
          create_start: (+new Date(formattedValue)) || null
        }
      }
    });
  }
  handleIndexCreateEnd(value, formattedValue) {
    this.setState({
      indexViewData: {
        ...this.state.indexViewData,
        search_data: {
          ...this.state.indexViewData.search_data,
          create_end: (+new Date(formattedValue)) || null
        }
      }
    });
  }
  handleIndexSelectChange(selectData) {
    this.setState({
      indexViewData: {
        ...this.state.indexViewData,
        search_data: {
          ...this.state.indexViewData.search_data,
          ...selectData
        }
      }
    });
  }
  handleIndexInputChange(selectData) {
    this.setState({
      indexViewData: {
        ...this.state.indexViewData,
        search_data: {
          ...this.state.indexViewData.search_data,
          ...selectData
        }
      }
    });
  }

  handleIndexDateChange(name, value) {
    this.setState({
      indexViewData: {
        ...this.state.indexViewData,
        search_data: {
          ...this.state.indexViewData.search_data,
          [name]: (+new Date(value)) || null
        }
      }
    });
  }
}
ReactDOM.render(
  < GuestorderList/>, document.getElementById('__guestorder/List__'));
