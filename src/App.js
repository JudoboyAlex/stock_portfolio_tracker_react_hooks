import React, {useState} from 'react';
import Form from './components/Form';
import Portfolio from './components/Portfolio';
import Chart from './components/Chart';

import './App.css';

function App() {
  const [stockSymbol, setStockSymbol] = useState([{ quote: "SPY", currentHolding: true }]);
  const [price, setPrice] = useState();
  const [purchsedDate, setPurchasedDate] = useState();
  const [chartData, setChartData] = useState([]);

  const addStockSymbol = quote => {
    const newStockSymbol = [...stockSymbol, { quote }];
    setStockSymbol(newStockSymbol);
  };

  console.log(stockSymbol);

  return (
    <div>
      <Form addStockSymbol={addStockSymbol}/>
      {stockSymbol.map((stock, index) => (
          <Portfolio 
          key = {index}
          index = {index}
          stock={stock}
          />          
      ))}
      <Chart />  
    </div>     
  )
}


export default App;
