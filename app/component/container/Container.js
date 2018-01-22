import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Container extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let clazz = this.props.className;
    clazz = clazz + ' tb-wrap' || '';
    return (
      <div className="wrap">
        <div className="tb-head">{this.props.title}</div>
        <div className="tb-content">
          <div className={clazz}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Container.propTypes = {
  title: PropTypes.string.isRequired
};

export default Container;
