import React from 'react';
import './index.css';
import './bootstrap.css'
import Chart from "react-google-charts";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labeledTweets: '',
      keyword: '',
      tweets: [],
      labels: '',
      countPoz: 0,
      countNeg: 0,
      polarityValues: [],
      json: '',
      resultedTweets: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this)
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
        console.log(Object.values(json.labeledTweets[0]))
        this.setState({
          json: json,
          labeledTweets: json.labeledTweets[0],
          tweets: Object.keys(json.labeledTweets[0]),
          labels: Object.values(json.labeledTweets[0]),
          countPoz: (JSON.stringify(Object.values(json.labeledTweets)).match(/Positive/g) || []).length,
          countNeg: (JSON.stringify(Object.values(json.labeledTweets)).match(/Negative/g) || []).length,
          polarityValues: Object.values(json.results[0])

        })

      })
  }

  render() {

    console.log(this.state.polarityValues)
    console.log(this.state.labeledTweets)
    console.log(this.state.tweets)
    console.log(this.state.labels)
    console.log(this.state.countPoz)
    console.log(this.state.countNeg)
    this.state.resultedTweets = this.state.tweets.map(s => ([s]))
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
                <ul >
                  {
                    Object.keys(this.state.labeledTweets).map((key, index) => (
                      <li key={index}>{key}:<b>{this.state.labeledTweets[key]}</b></li>
                    ))
                  }


                </ul>
              </div>

              <div class="col-sm">
                <Chart
                  width={'750px'}
                  height={'500px'}
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
                      fillOpacity: 0.8,
                    },
                    fontName: 'Reem Kufi',
                    fontSize: 25
                  }}
                  rootProps={{ 'data-testid': '1' }}
                />
                <Chart
                  width={'700px'}
                  height={'500px'}
                  chartType="Histogram"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['tweet', 'sentiment'],
                    ...this.state.polarityValues
                  ]}
                  options={{
                    title: 'Sentiment polarity distribution',
                    backgroundColor: '#dddbf3',
                    legend: { position: 'none' },
                    fontName: 'Reem Kufi',
                    fontSize: 25,
                    hAxis: {
                      title: 'Positivie <--------------> Negative',
                    
                    }
                  }}
                  rootProps={{ 'data-testid': '1' }}
                />
                <Chart
                  width={'700px'}
                  height={'500px'}
                  chartType="WordTree"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Tweets'],
                    ...this.state.resultedTweets
                  ]}
                  options={{
                    wordtree: {

                      format: 'implicit',
                      word: this.state.keyword,
                      fontName: 'Reem Kufi',
                      fontSize: 25
                    },
                    backgroundColor: '#dddbf3',
                  }}
                  rootProps={{ 'data-testid': '1' }}
                />  </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
