import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Top from './pages/topBar/Top'
import Menu from './pages/menu/menu'
import Rec from './pages/rec/rec'
import Hot from './pages/hot/hot'
import Search from './pages/search/search.js'

class App extends Component {
  constructor(){
    super(...arguments)
  }
  render() {
    return (
      <div className="App">
        <Top/>
        <Menu route={this.props.match}/>
        <Switch>
          <Route path={`${this.props.match.path}/rec`} component={Rec}></Route>
          <Route path={`${this.props.match.path}/hot`} component={Hot}></Route>
          <Route path={`${this.props.match.path}/search`} component={Search}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
