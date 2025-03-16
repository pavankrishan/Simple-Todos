// Write your code here
import './index.css'

const TodoItem = props => {
  const {itemDetails, deleteTodo} = props
  const {id, title} = itemDetails

  const onDelete = () => {
    deleteTodo(id)
  }

  return (
    <li>
      <div className="item">
        <p className="title">{title}</p>
        <button onClick={onDelete} className="btn" type="button">
          Delete
        </button>
      </div>
    </li>
  )
}
export default TodoItem
