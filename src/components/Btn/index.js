const Btn = props => {
  const {data, onFilter} = props
  const {optionId, displayText} = data
  const submit = () => {
    onFilter(optionId)
  }
  return (
    <li>
      <button type="button" onClick={submit}>
        {displayText}
      </button>
    </li>
  )
}

export default Btn
