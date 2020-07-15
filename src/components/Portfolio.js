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

        // <Table bordered dark className="portfolio-container">
        //     <thead>
        //         <tr>
        //         <th>#</th>
        //         <th>Your Holding</th>
        //         <th>Current Stock Price</th>
        //         <th>AVG Cost</th>
        //         </tr>
        //     </thead>
        // <Table bordered dark className="portfolio-container">
        //    <tbody>
        //         <tr>
        //         <th scope="row">1</th>
        //         <td>{stock.quote}</td>
        //         <td>${data.pc}</td>
        //         <td>$30</td>
        //         </tr>
        //     </tbody>
        //     </Table>
        // </Table>
        <ul className="table-headings">
            <li>1</li>
            <li>{stock.quote}</li>
            <li>${data.pc}</li>
            <li>$30</li>
            <li>320 days</li>
            <li>36.78%</li>
        </ul>    
    )
}

export default Portfolio;