import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style/index.css';

// export default class SalesData extends Component {
//   render() {
//     return (
//         <div className="sales-data">
//             <div className="item">
//                 <p>{this.props.totalAmount}<span>元</span></p>
//                 <span>订单总额</span>
//             </div>
//             <div className="item">
//                 <p>{this.props.totalGoods}</p>
//                 <span>商品总数</span>
//             </div>
//             <div className="item">
//                 <p>{this.props.totalPerson}</p>
//                 <span>购买总人次</span>
//             </div>
//         </div>
//     );
//   }
// }

export default function SalesData (props) {
    return(
        <div className="sales-data">
            <div className="item">
                <p>{props.totalAmount}<span>元</span></p>
                <span>订单总额</span>
            </div>
            <div className="item">
                <p>{props.totalGoods}</p>
                <span>商品总数</span>
            </div>
            <div className="item">
                <p>{props.totalPerson}</p>
                <span>购买总人次</span>
            </div>
        </div>
    )
}

SalesData.defaultProps = {
    totalAmount: 0,
    totalGoods: 0,
    totalPerson: 0,
};
SalesData.propTypes = {
    totalAmount: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    totalGoods: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    totalPerson: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
}