import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {
    id: uuidv4(),
    title: 'Book the ticket for today evening',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'Rent the movie for tomorrow movie night',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'Confirm the slot for the yoga session tomorrow morning',
    isCompleted: false,
  },
  {id: uuidv4(), title: 'Drop the parcel at Bloomingdale', isCompleted: false},
  {id: uuidv4(), title: 'Order fruits on Big Basket', isCompleted: false},
  {id: uuidv4(), title: 'Fix the production issue', isCompleted: false},
  {
    id: uuidv4(),
    title: 'Confirm my slot for Saturday Night',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'Get essentials for Sunday car wash',
    isCompleted: false,
  },
]

class SimpleTodos extends Component {
  state = {
    todoList: initialTodosList,
    newTodo: '',
  }

  handleInputChange = event => {
    this.setState({newTodo: event.target.value})
  }

  addTodo = () => {
    const {newTodo} = this.state
    if (newTodo.trim() === '') return

    const parts = newTodo.trim().split(' ')
    const count = Number(parts[parts.length - 1]) || 1
    const title = Number(parts[parts.length - 1])
      ? parts.slice(0, -1).join(' ')
      : newTodo

    const newTodos = []
    for (let i = 0; i < count; i++) {
      newTodos.push({
        id: uuidv4(),
        title,
        isCompleted: false,
      })
    }

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
        todo.id === id ? {...todo, title: newTitle} : todo,
      ),
    }))
  }

  toggleComplete = id => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(todo =>
        todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo,
      ),
    }))
  }

  render() {
    const {todoList, newTodo} = this.state
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
            <button onClick={this.addTodo} className="add-btn">
              Add
            </button>
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
