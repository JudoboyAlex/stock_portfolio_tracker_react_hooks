import React, {useState, Fragment} from 'react';
import Portfolio from './components/Portfolio';
import PortfolioForm from './components/PortfolioForm';
import Chart from './components/Chart';

import './App.css';

function App() {
  const [stockSymbol, setStockSymbol] = useState([{ quote: "SPY", cost:320, currentHolding: true }]);
  
  let showChart = true;

  const addStockSymbol = (quote, cost) => {
    const newStockSymbol = [...stockSymbol, { quote }, { cost }];
    setStockSymbol(newStockSymbol);
  };
      
  if(!showChart){
    return (
      <div>
        <PortfolioForm addStockSymbol={addStockSymbol} />
        {stockSymbol.map((stock, index) => (
          <div>
              <Portfolio 
              key = {index}
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
        {stockSymbol.map((stock, index) => (
          <div>
              <Portfolio 
              key = {index}
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
