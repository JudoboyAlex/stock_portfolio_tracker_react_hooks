import React, { useEffect, useState } from 'react';
import { createChart } from 'lightweight-charts';
import axios from 'axios';
import './Chart.css';

const Chart = ({stock}) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        (async () => {
          const chartData = await axios(
            `https://finnhub.io/api/v1/stock/candle?symbol=${stock.quote}&resolution=D&from=1434289638&to=1592056038&token=${process.env.REACT_APP_API_KEY}`
          );
          setChartData(chartData.data);
        })();
    },[stock.quote]);
    console.log("i got called!")

    if(chartData.length == 0){ 
        return null;
    } 

    let dates = chartData.t
    let price = chartData.c;
    let months_arr = [1,2,3,4,5,6,7,8,9,10,11,12];

    function getDate(dates){
        let arr = [];   
        for( let i=0; i < dates.length; i++){  
            let date = new Date(dates[i]*1000);
            let year = date.getFullYear();
            let month = months_arr[date.getMonth()];
            let day = date.getDate();
            arr.push(year + "-" + month + "-" + day)
        }
        return arr;
    }
  
    let datesList = getDate(dates);

    const stockChartData = function(date, price){
        let newArr = [];
        for ( let i = 0; i < date.length; i++){
        newArr.push({time: date[i], value : price[i]});
    }
        return newArr;
    }

    let stockChartDatas = stockChartData(datesList,price);

    const chart = createChart(document.body, { width: 500, height: 400 });
    const lineSeries = chart.addLineSeries();
    lineSeries.setData(stockChartDatas);

    return (
            <div className="chart-container">
            <h2>Interactive 5 Years Historical Daily Chart</h2>
                { chart.timeScale().fitContent() }
            </div>
        )
}

export default Chart;