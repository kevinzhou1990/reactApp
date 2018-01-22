import React from 'react';
import ReactDOM from 'react-dom';
import Gird from '../component/table/Table';
import Container from '../component/container/Container';
import Condition from '../component/condition/Condition';
import PageNation from '../component/pageNation/pageNation';

const columns = [
  {
    className: 'my-col-class',
    title: 'title1',
    dataIndex: 'a',
    key: 'a',
    width: 100
  }, {
    className: 'my-col-class',
    id: '123',
    title: 'title2',
    dataIndex: 'b',
    key: 'b',
    width: 100
  }, {
    className: 'my-col-class',
    title: 'title3',
    dataIndex: 'c',
    key: 'c',
    width: 200
  }, {
    className: 'my-col-class',
    title: 'Operations',
    dataIndex: '',
    key: 'd',
    render() {
      return <a href="#">Operations</a>;
    }
  }
];

const data = [
  {
    a: '123',
    key: '1'
  }, {
    a: 'cdd',
    b: 'edd',
    key: '2'
  }, {
    a: '1333',
    c: 'eee',
    d: 2,
    key: '3'
  }
];

//
ReactDOM.render(
  <Container title={'轮播图管理'}>
  <Condition>
    <input />
    <button className="btn btn-main">查询</button>
  </Condition>
  <Gird columns={columns} data={data}/>
  <PageNation />
</Container>, document.getElementById('__index__'));
