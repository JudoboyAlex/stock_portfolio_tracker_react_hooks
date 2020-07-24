import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Portfolio.css';

const Portfolio = ({stock}) => {
const [data, setData] = useState([]);
const [counter, setCounter] = useState(1);

    useEffect(() => {
        (async () => {
          const data = await axios(
            `https://finnhub.io/api/v1/quote?symbol=${stock.quote}&token=${process.env.REACT_APP_API_KEY}`
          );
            setData(data.data);
        })();
    },[]);
    
    return (
        <ul className="table-headings">
            <li>{counter}</li>
            <li>{stock.quote}</li>
            <li>${data.pc}</li>
            <li>${stock.cost}</li>
            <li>320 days</li>
            <li>36.78%</li>
        </ul>    
    )
}

export default Portfolio;