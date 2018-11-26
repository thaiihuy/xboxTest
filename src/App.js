import React, { Component } from 'react';
import './App.css';
import GetData from './api/GetData'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      inputFibo: '',
      query: '',
      allData: [],
      listCriteria: [],
      listIndices: [],
      res2a: '',
      level: '',
      levelArray: []
    }
  }

  sumArray() {
    let total = 0
    const { numArray } = this.state
    for (let index = 0; index < numArray.length; index++) {
      total += numArray[index];
    }
    return total
  }

  componentWillMount() {
    this.getData()
  }

  async getData() {
    let res = await GetData()
    if (res) {
      let listCriteria = [];
      let listIndices = [];
      // eslint-disable-next-line
      res.map(item => {
        let tempArray = item.criteria;
        listCriteria = listCriteria.concat(tempArray);
        // eslint-disable-next-line
        tempArray.map(criteria => {
          listIndices = listIndices.concat(criteria.indices);
        })
      })
      this.setState({
        allData: res,
        listCriteria: listCriteria,
        listIndices: listIndices
      })
    } else {
      alert('Load fail!')
    }
  }

  fibonacci(input) {
    const inputNew = Number(input)
    let result;
    if (inputNew === 0) {
      return 0;
    }
    if (inputNew === 1 || inputNew === 2) {
      return result = 1;
    }
    result = this.fibonacci(inputNew - 1) + this.fibonacci(inputNew - 2);
    return result;
  }

  handleChange(event) {
    this.setState({ inputFibo: event.target.value });
  }

  handleChangeQuery(event) {
    this.setState({ query: event.target.value });
  }

  handleChangeLevel(event) {
    this.setState({ level: event.target.value });
  }

  submitFibo() {
    alert(this.fibonacci(this.state.inputFibo))
  }

  submitQuery() {
    const { listCriteria, query } = this.state;
    if (query !== '') {
      let res = listCriteria.find(x => x.name.toString().includes(query));
      console.log(res);
      if (typeof res !== 'undefined') {
        this.setState({ res2a: res.name })
      } else {
        this.setState({ res2a: '' })
        alert("Xin nhập chính xác cụm từ")
      }
    } else {
      alert("Please fill your input!")
    }
  }

  submitQueryLevel() {
    const { listIndices, level } = this.state;

    if (level > 0 && level < 5) {
      let res = listIndices.filter(x => x.level === Number(level));
      console.log(res);
      if (typeof res !== 'undefined') {
        this.setState({ levelArray: res })
      } else {
        this.setState({ levelArray: [] })
        alert("Xin nhập chính xác cụm từ")
      }
    } else {
      this.setState({ levelArray: [] })
      alert("Please fill your input!")
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <p>Question 1</p>
          <div>
            <p>A</p>
            <p>{'Array: [' + this.state.numArray + ']'}</p>
            <p>{'Total: ' + this.sumArray()}</p>
          </div>
          <div>
            <p>B</p>
            <input type="number" value={this.state.inputFibo} name="input" onChange={this.handleChange.bind(this)} />
            <input type="submit" value="Submit" onClick={this.submitFibo.bind(this)} />
          </div>
        </div>
        <div>
          <p>Question 2</p>
          <div>
            <p>A</p>
            <input type="text" value={this.state.query} name="query" onChange={this.handleChangeQuery.bind(this)} />
            <input type="submit" value="Submit" onClick={this.submitQuery.bind(this)} />
            <p>{this.state.res2a}</p>
          </div>
          <div>
            <p>B</p>
            <p>From 1 to 4</p>
            <input type="number" value={this.state.level} name="level" onChange={this.handleChangeLevel.bind(this)} />
            <input type="submit" value="Submit" onClick={this.submitQueryLevel.bind(this)} />
            {this.state.levelArray.map((item, index) => {
              return (
                <p key={index.toString()}>
                  Name:  {item.name} -  Level: {item.level}
                </p>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
