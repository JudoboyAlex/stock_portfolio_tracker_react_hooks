import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Portfolio = ({stock}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
          const data = await axios(
            `https://finnhub.io/api/v1/quote?symbol=${stock.quote}&token=${process.env.REACT_APP_API_KEY}`,
          );
            console.log(data.data)
            setData(data.data);
        })();
    });
    console.log(data.pc)
    return (
        <div>
        Your Holding: {stock.quote}  Current Stock Price: ${data.pc} Invetment Return:  AVG Cost: Click Here For Chart 
        </div>
    )
}

export default Portfolio;