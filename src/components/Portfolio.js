import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import './Portfolio.css';
import Chart from './Chart';

const Portfolio = ({stock: {quote, cost, date}, index, deleteStockSymbol},) => {
const [stockData, setStockData] = useState([]);
const [modal, setModal] = useState(false);
const [chartModal, setChartModal] = useState(false);

const rateReturn = (stockData.pc - cost) / cost * 100;
const roundedRateReturn = rateReturn.toFixed();
const toggle = () => setModal(!modal);
const toggleChartModal = () => setChartModal(!chartModal);


// Holding Period Calculation
let oldDate = date.split("-");
let formattedOldDate = new Date(oldDate[0], oldDate[1]-1, oldDate[2]);
let today = new Date();
let diff = new Date(today.getTime() - formattedOldDate.getTime());
let holdingPeriod = Math.floor(diff/ (1000 * 3600 * 24));
let HoldingPeriodYear = Math.round(holdingPeriod / 365);
let HoldingPeriodDay= holdingPeriod % 365;

const holdingPeriodChecker = () => {
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
          const data = await axios(
            `https://finnhub.io/api/v1/quote?symbol=${quote}&token=${process.env.REACT_APP_API_KEY}`
          );
            setStockData(data.data);
        })();
    },[]);

    return (
        <div>
            <ul className="table-headings">
                <li style={{width: "2rem"}}>{index+1}</li>
                <li>{quote}</li>
                <li>${stockData.pc}</li>
                <li>${cost}</li>
                { holdingPeriodChecker() }
                { rateReturnChecker() }
                <li ><span className="stockChart" onClick={toggleChartModal}><i class="fas fa-chart-line fa-2x"></i></span></li>
                <li style={{borderStyle: "none"}}><span className="deleteStock" onClick={toggle}><i class="fas fa-trash fa-2x"></i></span></li>
            </ul>
            <Modal isOpen={chartModal} toggle={toggleChartModal} >
            <ModalHeader toggle={toggleChartModal}>5 Years Interactive Chart</ModalHeader>
                <Chart stockQuote={quote} />
            </Modal>    
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Delete Confirmation</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete {quote}?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => {deleteStockSymbol(index); toggle();}}>Delete</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>    

        </div>
    )
}

export default Portfolio;
// <Chart stockQuote={quote} />

// { ( HoldingPeriodYear > 0 ) ? <li> {HoldingPeriodYear} years {HoldingPeriodDay} days </li> : <li> {HoldingPeriodDay} days </li> }

// import React, { useState } from "react";
// import "./App.css";

// function Todo({ todo, index, completeTodo, removeTodo }) {
//   return (
//     <div
//       className="todo"
//       style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
//     >
//       {todo.text}

//       <div>
//         <button onClick={() => completeTodo(index)}>Complete</button>
//         <button onClick={() => removeTodo(index)}>x</button>
//       </div>
//     </div>
//   );
// }

// function TodoForm({ addTodo }) {
//   const [value, setValue] = useState("");

//   const handleSubmit = e => {
//     e.preventDefault();
//     if (!value) return;
//     addTodo(value);
//     setValue("");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         className="input"
//         value={value}
//         onChange={e => setValue(e.target.value)}
//       />
//     </form>
//   );
// }

// function App() {
//   const [todos, setTodos] = useState([
//     {
//       text: "Learn about React",
//       isCompleted: false
//     },
//     {
//       text: "Meet friend for lunch",
//       isCompleted: false
//     },
//     {
//       text: "Build really cool todo app",
//       isCompleted: false
//     }
//   ]);

//   const addTodo = text => {
//     const newTodos = [...todos, { text }];
//     setTodos(newTodos);
//   };

//   const completeTodo = index => {
//     const newTodos = [...todos];
//     newTodos[index].isCompleted = true;
//     setTodos(newTodos);
//   };

//   const removeTodo = index => {
//     const newTodos = [...todos];
//     newTodos.splice(index, 1);
//     setTodos(newTodos);
//   };

//   return (
//     <div className="app">
//       <div className="todo-list">
//         {todos.map((todo, index) => (
//           <Todo
//             key={index}
//             index={index}
//             todo={todo}
//             completeTodo={completeTodo}
//             removeTodo={removeTodo}
//           />
//         ))}
//         <TodoForm addTodo={addTodo} />
//       </div>
//     </div>
//   );
// }

// export default App;