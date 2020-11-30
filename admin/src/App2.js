import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

function Home(props) {
  console.log(props);
  return (
    <div className="Home">
      Home
    </div>
  )
}

class App2 extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/home" component={Home} />
        </Router>
      </div>
    )
  }
}

export default App2