import React from 'react';
import Table from 'rc-table';
import _ from 'lodash';
import 'rc-table/assets/index.css';
import './rc-table.css';

class Grid extends React.Component {

  render() {
    const rowClassName = this.props.rowClassName
      ? this.props.rowClassName + ' my-row-class'
      : 'my-row-class';
    const columns = _.map(this.props.columns, function(column) {
      const className = column.className
        ? column.className + ' my-col-class'
        : 'my-col-class';
      return {
        ...column,
        className
      };
    });
    const props = _.omit(this.props, 'rowClassName', 'columns');
    return (<Table emptyText='无' columns={columns} rowClassName={rowClassName} {...props}/>);
  }
}

export default Grid;
