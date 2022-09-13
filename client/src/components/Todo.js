import React, { Component } from 'react';
import axios from 'axios';
import Input from './Input';
import ListTodo from './ListTodo';

class Todo extends Component {
    state = {
        todos: [],
    };

    //componentDidMount(){}-The componentDidMount() method runs after the 
    //component output has been rendered to the DOM (Usually a good place to set up a timer)
    componentDidMount(){
        this.getTodos();
    }

    //retrieving Todo list
    getTodos = () => {
      axios
        //note: by setting up proxy in package.json, an url is not needed
        .get('/api/todos')
        .then((res) => {
            if (res.data) {
                this.setState({
                  todos: res.data,
                });
            }
        })
        .catch((err) =>console.log(err));
    };

    //deleting Todo on Todo list
    deleteTodo = (id) => {
        axios
            .delete(`/api/todo/${id}`)
            .then((res) => {
              if (res.data) {
                this.getTodos();
              }
            })
            .catch((err) => console.log(err));
    };

    render() {
        let { todos } = this.state;

        return (
            <div>
                <h1>My Todo(s)</h1>
                <Input getTodos={this.getTodos} />
                <ListTodo todos={todos} deleteTodo={this.delete.Todo} />
            </div>
        );
    }
}

export default Todo;