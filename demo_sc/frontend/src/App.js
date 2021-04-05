import React from 'react';
import './index.css';


class App extends React.Component {
  constructor(){
    super();
    this.state={
      labeledTweets:'',
      keyword:'',
      keys:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this)
    this.graphics = this.graphics.bind(this)
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
this.setState({labeledTweets: json})
window.scrollTo(50, 0)
})
  }
graphics(){
  
}
  render(){
    this.state.keys = Object.keys(this.state.labeledTweets);
    console.log(this.state.keys)
    
  return (
    <div align="center" className="box">
      <header className="App-header">
       <h2>Search a company</h2>
      <form>
          <input type="text" id="entry-point" className="input" type="text" id="description" name="keyword" value={this.state.keyword} onChange={this.handleChange}/>
          <button type="submit" onClick={this.search}> Go </button>
        </form>
        <ul onChange={this.graphics}>
      {
        Object.keys(this.state.labeledTweets).map((key, index) => (
          <li key={index}>{key}:<b>{this.state.labeledTweets[key]}</b></li> 
          
        ))
      }
    </ul>
    
      </header>
    </div>
  );
  }
}

export default App;
