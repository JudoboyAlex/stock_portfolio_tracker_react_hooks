import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import './Portfolio.css';
import Chart from './Chart';

const Portfolio = ({stock: {quote, cost, date}, index, deleteStockSymbol},) => {
const [stockData, setStockData] = useState([]);
const [deleteModal, setDeleteModal] = useState(false);
const [chartModal, setChartModal] = useState(false);
const [invalidSymbolModal, setInvalidSymbolModal] = useState(true);
const [missingData, setMissingData] = useState(false);

// Rate of Return Calculation
const rateReturn = (stockData.pc - cost) / cost * 100;
const roundedRateReturn = rateReturn.toFixed();

// Toggle Modal
const toggleDeleteModal = () => setDeleteModal(!deleteModal);
const toggleChartModal = () => setChartModal(!chartModal);
const toggleInvalidSymbolModal = () => setInvalidSymbolModal(!invalidSymbolModal);

// Holding Period Calculation
let oldDate = date.split("-");
let formattedOldDate = new Date(oldDate[0], oldDate[1]-1, oldDate[2]);
let today = new Date();
let diff = new Date(today.getTime() - formattedOldDate.getTime());
let holdingPeriod = Math.floor(diff/ (1000 * 3600 * 24));
let HoldingPeriodYear = Math.round(holdingPeriod / 365);
let HoldingPeriodDay= holdingPeriod % 365;

const holdingPeriodChecker = () => {
    if (!date){
        return <li> N/A </li>
    }
    if ( HoldingPeriodYear > 1 ){
        return <li> {HoldingPeriodYear} years {HoldingPeriodDay} days </li> 
    } else if (
        HoldingPeriodYear === 1
    ){
        return <li> {HoldingPeriodYear} year {HoldingPeriodDay} days </li>
    } else {
        return <li> {HoldingPeriodDay} days </li>
    };
};

const rateReturnChecker = () => {
    if ( roundedRateReturn > 0 ){
        return <li className="returnPositive"><a>{roundedRateReturn}%</a></li> 
    } else {
        return <li className="returnNegative"><a>{roundedRateReturn}%</a></li> 
    }
}

    useEffect(() => {
        (async () => {
        setMissingData(false);
        try {  
            const data = await axios(
            `https://finnhub.io/api/v1/quote?symbol=${quote}&token=${process.env.REACT_APP_API_KEY}`
          );
            let isMyObjectEmpty = !Object.keys(data.data).length;
            if (isMyObjectEmpty ){
                setMissingData(true)
            }
            setStockData(data.data);
        } catch(err){
            console.log(err);
        }
        })();
    },[]);

    return (
            <div className="table-wrapper">
                {
                    missingData ?
                    <Modal isOpen={invalidSymbolModal} toggle={toggleInvalidSymbolModal} >
                        <ModalHeader style={{ color : "red"}} toggle={() => {deleteStockSymbol(index); toggleInvalidSymbolModal();}}>Invalid Stock Symbol Entered</ModalHeader>
                        <ModalBody>
                            Please Enter A Valid U.S. Stock Symbol
                        </ModalBody>
                    </Modal> 
                    :
                    <div>
                        <ul className="sub-table-headings">
                            <li style={{width: "2rem"}}>{index+1}</li>
                            <li>{quote}</li>
                            <li>${stockData.pc}</li>
                            <li>${cost}</li>
                            { holdingPeriodChecker() }
                            { rateReturnChecker() }
                            <li ><span className="stockChart" onClick={toggleChartModal}><i class="fas fa-chart-line fa-2x"></i></span></li>
                            <li style={{borderStyle: "none"}}><span className="deleteStock" onClick={toggleDeleteModal}><i class="fas fa-trash fa-2x"></i></span></li>
                        </ul>

                        <Modal isOpen={chartModal} toggle={toggleChartModal} >
                        <ModalHeader toggle={toggleChartModal}>5 Years Interactive Chart</ModalHeader>
                            <Chart stockQuote={quote} />
                        </Modal>    

                        <Modal isOpen={deleteModal} toggle={toggleDeleteModal} >
                            <ModalHeader toggle={toggleDeleteModal}>Delete Confirmation</ModalHeader>
                            <ModalBody>
                                Are you sure you want to delete {quote}?
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={() => {deleteStockSymbol(index); toggleDeleteModal();}}>Delete</Button>{' '}
                                <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
                            </ModalFooter>
                        </Modal>    
                    </div>
                }   
            </div>
        )
    }

export default Portfolio;