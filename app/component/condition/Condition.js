import React, {Component} from 'react';

class Condition extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="opt clearfix condition">
        {this.props.children}
      </div>
    );
  }
}


export default Condition;
