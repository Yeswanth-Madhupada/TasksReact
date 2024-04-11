import {Component} from 'react'

import {v4} from 'uuid'

import Btn from './components/Btn'

import Task from './components/Task'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    List: [],
    text: '',
    optionsId: tagsList[0].optionId,
  }

  onSave = event => {
    event.preventDefault()
    const {text, optionsId} = this.state
    const typeText = tagsList.find(each => each.optionId === optionsId)

    const newList = {
      id: v4(),
      text,
      optionsId,
      type: typeText.displayText,
      isDisplay: true,
    }
    this.setState(prevState => ({
      List: [...prevState.List, newList],
      text: '',
      optionsId: tagsList[0].optionId,
    }))
  }

  changeText = event => {
    this.setState({text: event.target.value})
  }

  changeOption = event => {
    this.setState({optionsId: event.target.value})
  }

  getFilter = List => {
    const ftr = List.filter(each => each.isDisplay === true)
    return ftr
  }

  onFilter = id => {
    this.setState(prevState => ({
      List: prevState.List.map(eachComment => {
        if (id !== eachComment.optionsId) {
          return {...eachComment, isDisplay: !eachComment.isDisplay}
        }
        return eachComment
      }),
    }))
  }

  render() {
    const {List, text, optionsId} = this.state
    const filterList = this.getFilter(List)
    return (
      <div>
        <div>
          <h1>Create a task!</h1>
          <form onSubmit={this.onSave}>
            <label htmlFor="ip1">Task</label>
            <input
              type="text"
              id="ip1"
              placeholder="Enter the task here"
              onChange={this.changeText}
              value={text}
            />
            <label htmlFor="ip2">Tags</label>
            <select id="ip2" onChange={this.changeOption} value={optionsId}>
              {tagsList.map(eachOption => (
                <option key={eachOption.optionId} value={eachOption.optionId}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
            <button type="submit">Add Task</button>
          </form>
        </div>
        <div>
          <h1>Tags</h1>
          <ul>
            {tagsList.map(each => (
              <Btn key={each.optionId} data={each} onFilter={this.onFilter} />
            ))}
          </ul>
          <h1>Tasks</h1>
          {filterList.length === 0 ? (
            <p>No Tasks Added Yet</p>
          ) : (
            <ul>
              {filterList.map(each => (
                <Task key={each.id} data={each} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
