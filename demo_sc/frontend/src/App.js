import React from 'react';
import './index.css';

class App extends React.Component {
  constructor(){
    super();
    this.state={
      labeledTweets:'',
      keyword:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this)
  }
  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })

}
  search() {
    console.log("making request")
    console.log(this.state.keyword)
    fetch("http://127.0.0.1:5000/result", {
      method:"POST", 
      body:JSON.stringify({keyword:this.state.keyword}),
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
    
      }
  ).then(response => {
    console.log(response)
  return response.json()
})
.then(json => {
console.log(json)
this.setState({labeledTweets: JSON.stringify(json)})
})
  }
  render(){
  return (
    <div className="App">
      <header className="App-header">
       <h1>Search a company</h1>
      <div>
          <input type="text" id="entry-point" lassName="input" type="text" id="description" name="keyword" value={this.state.keyword} onChange={this.handleChange}/>
          <button onClick={this.search}> Go </button>
          <p>{this.state.labeledTweets}</p>
        </div>
      </header>
    </div>
  );
  }
}

export default App;
