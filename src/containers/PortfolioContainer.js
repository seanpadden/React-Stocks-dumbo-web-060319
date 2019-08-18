import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
        {this.props.portfolioStocks.map((stockObj, index) => (
          <Stock
            stock={stockObj}
            key={`${stockObj.name} - ${index}`}
            clickHandler={this.props.clickHandler}
          />
        ))}
      </div>
    );
  }

}

export default PortfolioContainer;
