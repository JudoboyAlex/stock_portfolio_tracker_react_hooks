import React, {useState, Fragment} from 'react';
import Portfolio from './components/Portfolio';
import PortfolioForm from './components/PortfolioForm';
import Chart from './components/Chart';

import './App.css';

function App() {
  const [stockSymbol, setStockSymbol] = useState([{ quote: "SPY", currentHolding: true }]);
  const [price, setPrice] = useState();
  const [purchsedDate, setPurchasedDate] = useState();
  const [chartData, setChartData] = useState([]);
  let showChart = true;


  const addStockSymbol = quote => {
    const newStockSymbol = [...stockSymbol, { quote }];
    setStockSymbol(newStockSymbol);
  };

  console.log(stockSymbol);

  if(!showChart){
    return (
      <div>
        <PortfolioForm addStockSymbol={addStockSymbol}/>
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
        <PortfolioForm addStockSymbol={addStockSymbol}/>
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
