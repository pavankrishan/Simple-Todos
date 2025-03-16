import { Component } from 'react'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  { id: 1, title: 'Book the ticket for today evening', isCompleted: false },
  { id: 2, title: 'Rent the movie for tomorrow movie night', isCompleted: false },
  { id: 3, title: 'Confirm the slot for the yoga session tomorrow morning', isCompleted: false },
  { id: 4, title: 'Drop the parcel at Bloomingdale', isCompleted: false },
  { id: 5, title: 'Order fruits on Big Basket', isCompleted: false },
  { id: 6, title: 'Fix the production issue', isCompleted: false },
  { id: 7, title: 'Confirm my slot for Saturday Night', isCompleted: false },
  { id: 8, title: 'Get essentials for Sunday car wash', isCompleted: false },
]

class SimpleTodos extends Component {
  state = {
    todoList: initialTodosList,
    newTodo: '',
  }

  handleInputChange = event => {
    this.setState({ newTodo: event.target.value })
  }

  addTodo = () => {
    const { newTodo, todoList } = this.state
    if (newTodo.trim() === '') return

    const parts = newTodo.trim().split(' ')
    const count = parseInt(parts[parts.length - 1], 10)
    const title = isNaN(count) ? newTodo : parts.slice(0, -1).join(' ')

    const newTodos = Array.from({ length: isNaN(count) ? 1 : count }, (_, index) => ({
      id: Date.now() + index,
      title,
      isCompleted: false,
    }))

    this.setState(prevState => ({
      todoList: [...prevState.todoList, ...newTodos],
      newTodo: '',
    }))
  }

  deleteTodo = id => {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(todo => todo.id !== id),
    }))
  }

  updateTodo = (id, newTitle) => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(todo =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      ),
    }))
  }

  toggleComplete = id => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ),
    }))
  }

  render() {
    const { todoList, newTodo } = this.state
    return (
      <div className="bgCon">
        <div className="cardCon">
          <h1 className="heading">Simple Todos</h1>
          <div className="input-container">
            <input
              type="text"
              value={newTodo}
              onChange={this.handleInputChange}
              placeholder="Enter todo title (or 'title number')"
              className="todo-input"
            />
            <button onClick={this.addTodo} className="add-btn">Add</button>
          </div>
          <ul className="todo-list">
            {todoList.map(eachItem => (
              <TodoItem
                key={eachItem.id}
                itemDetails={eachItem}
                deleteTodo={this.deleteTodo}
                updateTodo={this.updateTodo}
                toggleComplete={this.toggleComplete}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
