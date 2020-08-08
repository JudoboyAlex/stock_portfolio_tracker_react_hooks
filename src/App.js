import React, {useState, useEffect} from 'react';
import Portfolio from './components/Portfolio';
import PortfolioForm from './components/PortfolioForm';

import './App.css';

function App() {
  const ALLSTOCKINFOS = localStorage.getItem('stockInfo') ? JSON.parse(localStorage.getItem('stockInfo')) : [];
  
  const [stockInfo, setStockInfo] = useState(ALLSTOCKINFOS);
 
  const addStockSymbol = (quote, cost, date) => {    
    const newStockInfo = [...stockInfo, { quote: quote, cost: Number(cost), date: date, currentHolding: true }];
    setStockInfo(newStockInfo);
  };

  const deleteStockSymbol = index => {
    const newStockInfo = [...stockInfo];
    console.log(index);
    newStockInfo.splice(index, 1);
    setStockInfo(newStockInfo);
  };

  useEffect(() => {
  window.localStorage.setItem("stockInfo", JSON.stringify(stockInfo));
}, [stockInfo]);
  
    return (
      <div>
        <PortfolioForm addStockSymbol={addStockSymbol} />
        {stockInfo.map((stock, index) => (
          <div>
              <Portfolio 
              key = {stock.id}
              index = {index}
              stock={stock}
              deleteStockSymbol={deleteStockSymbol}
              /> 
          </div>           
        ))}
      </div>     
    )
  }

export default App;