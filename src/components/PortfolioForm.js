import React, { useState }from 'react';
import './PortfolioForm.css';
import { Table } from 'reactstrap';

import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const PortfolioForm = ({addStockSymbol}) => {

    const [ quotes, setQuotes] = useState("");

    const handleChange = ({target}) => {
        setQuotes(target.value.toUpperCase())
      }

    const handleSubmit = (event) =>  {
        event.preventDefault();
        addStockSymbol(quotes.toUpperCase());
        setQuotes("");
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
                  <Input type="text" name="avg-cost" placeholder="Eg: 43.23" />
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
// <Table bordered dark className="portfolio-container">
// <thead>
//     <tr>
//     <th>#</th>
//     <th>Your Holding</th>
//     <th>Current Stock Price</th>
//     <th>AVG Cost</th>
//     </tr>
// </thead>
// </Table>


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
