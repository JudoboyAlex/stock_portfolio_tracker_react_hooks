import React, { useState }from 'react';
import './PortfolioForm.css';
import Portfolio from './Portfolio';
import { Table } from 'reactstrap';

import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const PortfolioForm = ({addStockSymbol}, {addAvgCost}) => {

    const [ quotes, setQuotes ] = useState("");
    const [ avgCost, setAvgCost ] = useState("");

    const handleChange = ({target}) => {
        setQuotes(target.value.toUpperCase());
      }

    const handleChangeCost = ({target}) => {
        setAvgCost(target.value);
      }

    const handleSubmit = (event) =>  {
      event.preventDefault();
      addStockSymbol(quotes.toUpperCase(), avgCost);
      console.log(quotes, avgCost);
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
                <Label className="form-label" for="examplePassword" sm={5}>Purchased Date</Label>
                <Col sm={2}>
                  <Input type="date" name="date" placeholder="2010-04-17" />
                </Col>
              </FormGroup>
              <Button color="primary">SUBMIT</Button>
            </Form>
            <ul className="table-headings">
              <li>#</li>
              <li>Your Holding</li>
              <li>Current Stock Price</li>
              <li>AVG Cost</li>
              <li>Holding Period</li>
              <li>Return</li>
            </ul>
        </div>
    )
}

export default PortfolioForm;
