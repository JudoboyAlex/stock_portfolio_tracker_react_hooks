import React, {useState} from 'react';
import Portfolio from './components/Portfolio';
import PortfolioForm from './components/PortfolioForm';

import './App.css';

function App() {
  const [stockInfo, setStockInfo] = useState([{ quote: "SPY", cost:270, date: "2017-08-01", currentHolding: true }]);
 
  const addStockSymbol = (quote, cost, date) => {    
    const newStockInfo = [...stockInfo, { quote: quote, cost: Number(cost), date: date, currentHolding: true }];
    setStockInfo(newStockInfo);
  };
  
    return (
      <div>
        <PortfolioForm addStockSymbol={addStockSymbol} />
        {stockInfo.map((stock, index) => (
          <div>
              <Portfolio 
              key = {stock.id}
              index = {index}
              stock={stock}
              /> 
          </div>           
        ))}
      </div>     
    )
  }

export default App;