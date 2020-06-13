import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Portfolio = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
          const data = await axios(
            `https://finnhub.io/api/v1/quote?symbol=SPY&token=${process.env.REACT_APP_API_KEY}`,
          );
            console.log(data.data)
            setData(data.data);
        })();
    },[]);
    console.log(data.c)
    return (
        <div>
        Your Holding:   Current Stock Price: ${data.pc}
        </div>
    )

}

export default Portfolio;

