import React from 'react';
import './index.css';
import './bootstrap.css'
import polairtyValuesFile from './polarityValues.json'
import Chart from "react-google-charts";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      labeledTweets: '',
      keyword: '',
      tweets: '',
      labels: '',
      countPoz: 0,
      countNeg: 0,
      polarityValues: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this)
    this.graphics = this.graphics.bind(this)
  }
  handleChange(event) {
    const { name, value } = event.target

    this.setState({ [name]: value })


  }
  search(e) {
    e.preventDefault()
    console.log("making request")
    console.log(this.state.keyword)
    fetch("http://127.0.0.1:5000/result", {
      method: "POST",
      body: JSON.stringify({ keyword: this.state.keyword }),
      headers: {
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
        this.setState({ labeledTweets: json })
        window.scrollTo(50, 0)
      })
  }
  graphics() {
    // this.setState({
    //   polarityValues:Object.values(polairtyValuesFile),
    // })
    
  }
  render() {

    this.state.tweets = Object.keys(this.state.labeledTweets);
    console.log(this.state.tweets)
    this.state.labels = Object.values(this.state.labeledTweets);
    console.log(this.state.labels)
    let temp = JSON.stringify(this.state.labels)
    this.state.countPoz = (temp.match(/Positive/g) || []).length;
    console.log(this.state.countPoz)
    this.state.countNeg = (temp.match(/Negative/g) || []).length;
    console.log(this.state.countNeg)

    return (
      <div>
        <div class="container">
          <div class="row">
            <div align="center" className="cover">
              <header className="App-header">
                <div id="cover">
                  <form>
                    <div className="tb">
                      <div className="td"><input type="text" name="keyword" placeholder="Search a company" value={this.state.keyword} onChange={this.handleChange} /></div>
                      <div className="td" id="s-cover">
                        <button onClick={this.search}>
                          <div id="s-circle"></div>
                          <span></span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </header>
            </div>
          </div>

          <div class="container">
            <div class="row">
              <div class="col-sm">
                <ul onChange={this.graphics}>
                  {
                    Object.keys(this.state.labeledTweets).map((key, index) => (
                      <li key={index}>{key}:<b>{this.state.labeledTweets[key]}</b></li>
                    ))
                  }
                </ul>
              </div>
              <div class="col-sm">
                <Chart
                  width={'500px'}
                  height={'300px'}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Sentiment', 'no. of tweets'],
                    ['Positive', this.state.countPoz],
                    ['Negative', this.state.countNeg],
                  ]}
                  options={{
                    title: 'Sentiment partition',
                    backgroundColor: {
                      fill: '#dddbf3',
                      fillOpacity: 0.8
                    },
                  }}
                  rootProps={{ 'data-testid': '1' }}
                />        </div>
            </div>
            <Chart
              width={'500px'}
              height={'300px'}
              chartType="Histogram"
              loader={<div>Loading Chart</div>}
              data={[
                ['Sentiment', 'Polarity distribution'],
                ['', this.state.polarityValues]
              ]}
              options={{
                title: 'Sentiment polarity distribution',
                backgroundColor:'#dddbf3',
                legend: { position: 'none' },
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
