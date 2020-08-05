import React, { useState }from 'react';
import './PortfolioForm.css';

import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const PortfolioForm = ({addStockSymbol}) => {

    const [ quotes, setQuotes ] = useState("");
    const [ avgCost, setAvgCost ] = useState("");
    const [ purchaseDate, setPurchaseDate ] = useState("");

    const handleChange = ({target}) => {
        setQuotes(target.value.toUpperCase());
      }

    const handleChangeCost = ({target}) => {
        setAvgCost(target.value);
      }

    const handlePurchaseDate = ({target}) => {
      setPurchaseDate(target.value);
      }

    const handleSubmit = (event) =>  {
      event.preventDefault();
      addStockSymbol(quotes.toUpperCase(), avgCost, purchaseDate);
      setQuotes("");
      setAvgCost("");
    }

    return (
        <div className="text-center" style={{width: "100%"}}>
            <h1>Stock Portfolio Tracker</h1>
            <Form onSubmit={handleSubmit}>
              <FormGroup row>
                <Label className="form-label" for="exampleEmail" sm={5}>Stock Symbol</Label>
                <Col sm={2}>
                  <Input type="text" name="stock-symbol" value={quotes} onChange={handleChange} placeholder="Eg: UVXY" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label className="form-label" for="examplePassword" sm={5}>Average Cost</Label>
                <Col sm={2}>
                  <Input type="text" name="avg-cost" value={avgCost} onChange={handleChangeCost} placeholder="Eg: 43.23" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label className="form-label" for="examplePassword" sm={5}>Purchase  Date</Label>
                <Col sm={2}>
                  <Input type="date" name="date" value={purchaseDate} onChange={handlePurchaseDate} placeholder="2010-04-17" />
                </Col>
              </FormGroup>
              <Button color="primary">SUBMIT</Button>
            </Form>
            <ul className="table-headings">
              <li style={{width: "2rem"}}>#</li>
              <li>Your Holding</li>
              <li>Current Stock Price</li>
              <li>Book Cost</li>
              <li>Holding Period</li>
              <li>Return</li>
              <li>5-Year Chart</li>
              <li style={{borderStyle: "none"}}></li>
            </ul>
        </div>
    )
}

export default PortfolioForm;
