import React, {useState} from 'react';
import Portfolio from './components/Portfolio';
import PortfolioForm from './components/PortfolioForm';
import Chart from './components/Chart';

import './App.css';

function App() {
  const [stockInfo, setStockInfo] = useState([{ quote: "SPY", cost:320, currentHolding: true }]);

  let showChart = true;
 
  const addStockSymbol = (quote, cost) => {    
    const newStockInfo = [...stockInfo, { quote: quote, cost: Number(cost), currentHolding: true }];
    setStockInfo(newStockInfo);
  };
  
  if(!showChart){
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
              <Chart stock={stock}/>    
          </div>           
        ))}
      </div>     
    )
  } else {
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
}

export default App;