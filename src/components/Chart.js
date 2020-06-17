import React, { useEffect, useState, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import axios from 'axios';
import './Chart.css';

const Chart = ({stock}) => {
    console.log("hi")
    const [chartData, setChartData] = useState([]);
    const chartRef = useRef();

    useEffect(() => {
        (async () => {
          const chartData = await axios(
            `https://finnhub.io/api/v1/stock/candle?symbol=${stock.quote}&resolution=D&from=1434289638&to=1592056038&token=${process.env.REACT_APP_API_KEY}`
          );
          console.log(chartData);
          setChartData(chartData.data);
          console.log(chartData);
          let dates = chartData.data.t
          let price = chartData.data.c;
          let months_arr = [1,2,3,4,5,6,7,8,9,10,11,12];
          console.log(dates)
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
      
          const chart = createChart(chartRef.current, { width: 500, height: 400 });
          const lineSeries = chart.addLineSeries();
          lineSeries.setData(stockChartDatas);
          chart.timeScale().fitContent();

        })();
    },[stock.quote]);



    // if(chartData.length == 0){ 
    //     return null;
    // } 

    // let dates = chartData.t
    // let price = chartData.c;
    // let months_arr = [1,2,3,4,5,6,7,8,9,10,11,12];
    // console.log(dates)
    // function getDate(dates){
    //     let arr = [];   
    //     for( let i=0; i < dates.length; i++){  
    //         let date = new Date(dates[i]*1000);
    //         let year = date.getFullYear();
    //         let month = months_arr[date.getMonth()];
    //         let day = date.getDate();
    //         arr.push(year + "-" + month + "-" + day)
    //     }
    //     return arr;
    // }
  
    // let datesList = getDate(dates);

    // const stockChartData = function(date, price){
    //     let newArr = [];
    //     for ( let i = 0; i < date.length; i++){
    //     newArr.push({time: date[i], value : price[i]});
    // }
    //     return newArr;
    // }
  
    // let stockChartDatas = stockChartData(datesList,price);

    // useEffect(() => {
        
    //     const chart = createChart(chartRef.current, { width: 500, height: 400 });
    //     const lineSeries = chart.addLineSeries();
    //     lineSeries.setData([{ time: "2019-04-11", value: 80.01 },
    //     { time: "2019-04-12", value: 96.63 },
    //     { time: "2019-04-13", value: 76.64 },
    //     { time: "2019-04-14", value: 81.89 },
    //     { time: "2019-04-15", value: 74.43 },
    //     { time: "2019-04-16", value: 80.01 },
    //     { time: "2019-04-17", value: 96.63 },
    //     { time: "2019-04-18", value: 76.64 },
    //     { time: "2019-04-19", value: 81.89 },
    //     { time: "2019-04-20", value: 74.43 }]);
    //     chart.timeScale().fitContent();
    // },[])


    return (

            <div className="chart-container">
            <h2>Interactive 5 Years Historical Daily Chart</h2>
            <div ref={chartRef} />
            </div>
        )
    }
export default Chart;