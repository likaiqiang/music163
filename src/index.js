import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import {ContextProvider} from '@/context/index'

import './index.css'
import App from './App'
import Playing from './pages/playing/playing'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
    <ContextProvider>
        <Router>
            <Switch>
                <Route path='/app' component={App}></Route>
                <Route path='/playing' component={Playing}></Route>
                <Redirect from='/' to='/app/rec'></Redirect>
            </Switch>
        </Router>
    </ContextProvider>,
    document.getElementById('root')
)
registerServiceWorker();
