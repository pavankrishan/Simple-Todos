import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  state = {
    isEditing: false,
    updatedTitle: this.props.itemDetails.title,
  }

  handleEditClick = () => {
    this.setState(prevState => ({isEditing: !prevState.isEditing}))
  }

  handleChange = event => {
    this.setState({updatedTitle: event.target.value})
  }

  handleSave = () => {
    const {itemDetails, updateTodo} = this.props
    const {updatedTitle} = this.state
    updateTodo(itemDetails.id, updatedTitle)
    this.setState({isEditing: false})
  }

  handleCheckboxChange = () => {
    const {itemDetails, toggleComplete} = this.props
    toggleComplete(itemDetails.id)
  }

  render() {
    const {itemDetails, deleteTodo} = this.props
    const {isEditing, updatedTitle} = this.state
    const {id, title, isCompleted} = itemDetails

    return (
      <li className="todo-item">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={this.handleCheckboxChange}
          className="checkbox"
        />
        {isEditing ? (
          <input
            type="text"
            value={updatedTitle}
            onChange={this.handleChange}
            className="edit-input"
          />
        ) : (
          <p className={`title ${isCompleted ? 'completed' : ''}`}>{title}</p>
        )}

        <button
          onClick={isEditing ? this.handleSave : this.handleEditClick}
          className="edit-btn"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button onClick={() => deleteTodo(id)} className="delete-btn">
          Delete
        </button>
      </li>
    )
  }
}

export default TodoItem
