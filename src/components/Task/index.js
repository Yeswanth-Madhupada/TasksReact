const Task = props => {
  const {data} = props
  const {text, type} = data
  return (
    <li>
      <p>{text}</p>
      <p>{type}</p>
    </li>
  )
}

export default Task
