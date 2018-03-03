import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import Context from './context.js'
import './index.css'
import App from './App'
import Playing from './pages/playing/playing'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <Context.Provider value={{music:null}}>
            <Switch>
                <Route path='/app' component={App}></Route>
                <Route path='/playing' component={Playing}></Route>
                <Redirect from='/' to='/app/rec'></Redirect>
            </Switch>
        </Context.Provider>
    </Router>, 
    document.getElementById('root')
)
registerServiceWorker();
