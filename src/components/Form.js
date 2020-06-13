import React from 'react';
import Portfolio from './Portfolio';
import './Form.css';

const Form = () => {

    return (
        <div>
            <h1>Stock Portfolio Tracker</h1>
            <form>
                <h3>Enter Stock Symbol</h3>
                <input type="text" name="name" placeholder="Ex: UVXY" />
                <div>
                <input type="text" name="name" placeholder="Eg: 30"/>
                </div>
                <div>
                <input type="text" name="name" placeholder="Eg: Date of Purchase" />
                </div>
                <input type="submit" value="submit" />
            </form>
            <Portfolio />
        </div>
    )

}

export default Form;