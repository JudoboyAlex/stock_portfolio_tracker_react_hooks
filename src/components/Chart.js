import React, { useEffect, useState } from 'react';
import { createChart } from 'lightweight-charts';
import axios from 'axios';


const Chart = ({stock}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        (async () => {
          const chartData = await axios(
            `https://finnhub.io/api/v1/stock/candle?symbol=SPY&resolution=D&from=1434289638&to=1592056038&token=${process.env.REACT_APP_API_KEY}`
            // "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=SPY&apikey=1DGWRQK3MZHMIU9O"
          );
          setChartData(chartData.data.t);
        //   console.log(chartData.data.t);
        })();
    },[]);
    console.log("i got called!")
    console.log(chartData.length)

    if(chartData.length == 0){ 
        return null;
    } 

    let price = [28.09, 89,22, 90.11];

    function getData(date, price){
        let newArr = [];
        for ( let i = 0; i < date.length; i++){
        newArr.push({time: date[i], value : price[i]});
    }
        return newArr;
    }

    const chart = createChart(document.body, { width: 400, height: 300 });
    const lineSeries = chart.addLineSeries();
    lineSeries.setData([
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 },
        { time: '2019-04-20', value: 74.43 },
    ]);

    return (
            <div>
                { chart.timeScale().fitContent() }
            </div>
        )
}

export default Chart;

