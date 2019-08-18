import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  state = {
    stocks: [],
    portfolio: [],
    filterTerm: "All",
    sortTerm: ""
  };

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
      .then(resp => resp.json())
      .then(allStocks =>
        this.setState({
          stocks: allStocks
        })
      );
  }

  buyStock = stock => {
    this.setState(prevState => {
      return {
        portfolio: [stock, ...prevState.portfolio]
      };
    });
  };

  removeStock = stockObject => {
    let index = this.state.portfolio.indexOf(stockObject);
    let stocks = this.state.portfolio;
    stocks.splice(index, 1);
    this.setState({
      portfolio: stocks
    });
  };

  setFilterTerm = term => {
    this.setState({
      filterTerm: term
    });
  };

  setSortTerm = term => {
    this.setState({
      sortTerm: term
    });
  };

  whichStocksToRender = () => {
    let copiedStocks = [...this.state.stocks];
    if (this.state.filterTerm === "All") {
      copiedStocks = [...this.state.stocks];
    } else {
      copiedStocks = this.state.stocks.filter(
        stock => stock.type === this.state.filterTerm
      );
    }

    if (this.state.sortTerm === "Price") {
      copiedStocks.sort((stockA, stockB) => {
        return stockA.price - stockB.price;
      });
    } else if (this.state.sortTerm === "Alphabetically") {
      copiedStocks.sort((stockA, stockB) => {
        return stockA.name.localeCompare(stockB.name);
      });
    }

    return copiedStocks;
  };

  render() {
    return (
      <div>
        <SearchBar
          setFilterTerm={this.setFilterTerm}
          filterTerm={this.state.filterTerm}
          setSortTerm={this.setSortTerm}
          sortTerm={this.state.sortTerm}
        />

        <div className="row">
          <div className="col-8">
            <StockContainer
              stocks={this.whichStocksToRender()}
              clickHandler={this.buyStock}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              portfolioStocks={this.state.portfolio}
              clickHandler={this.removeStock}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
