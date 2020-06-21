import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import './Portfolio.css';

const Portfolio = ({stock}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
          const data = await axios(
            `https://finnhub.io/api/v1/quote?symbol=${stock.quote}&token=${process.env.REACT_APP_API_KEY}`
          );
            console.log(data.data)
            setData(data.data);
        })();
    },[]);
    console.log(data.pc)
    return (
        // <div className="portfolio-container">
        //     Your Holding: {stock.quote}  Current Stock Price: ${data.pc} AVG Cost: Invetment Return:  Holding Period:  
        // </div>

        <Table bordered dark>
            <thead>
                <tr>
                <th>#</th>
                <th>Your Holding</th>
                <th>Current Stock Price</th>
                <th>AVG Cost</th>
                </tr>
            </thead>
           <tbody>
                <tr>
                <th scope="row">1</th>
                <td>{stock.quote}</td>
                <td>${data.pc}</td>
                <td>$30</td>
                </tr>
            </tbody>
        </Table>    
    )
}

export default Portfolio;