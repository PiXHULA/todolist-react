import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header'
import Todos from './components/todos/Todos'
import AddTodo from './components/todos/AddTodo'
import About from './components/pages/About'
// import {v4 as uuid } from 'uuid';

import './App.css';
import Axios from 'axios';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount () {
    Axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(response => this.setState({todos: response.data}))
  }

  //Toggle complete
  markComplete = (id) => {
    this.setState( {todos: this.state.todos.map (todo => {
      if(todo.id === id){
          todo.completed = !todo.completed
      }
      return todo;
    })} )
  }

  //Delete item
  delTodo = (id) =>{
    Axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
    .then(response => this.setState ({ todos: [...this.state.todos.filter(todo => todo.id !== id)]})) 
  }

  //Add item
  addTodo = (title) => {
    Axios.post('http://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
    .then(response => this.setState ({
    todos: [...this.state.todos, response.data]}))
  }

  render () {
  return (
    <Router>
    <div className="App">
      <div className="container">
       <Header />
       <Route exact path="/" render={props => (
         <React.Fragment>
          <AddTodo addTodo={this.addTodo}/>
          <Todos todos ={this.state.todos} markComplete={this.markComplete}
          delTodo={this.delTodo}/>
         </React.Fragment>
       )} />
      <Route path="/about" component={About}/>
      </div>
    </div>
    </Router>
    );
  }
}
export default App;
