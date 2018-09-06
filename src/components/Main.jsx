import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import {Provider} from 'react-redux'
import axios from 'axios'

import store from '../redux/store'

import App from './App'
import Landing from './Landing'

class Main extends Component {
    constructor() {
        super()
        this.state = {
            isAuthenticated: false
        }
        this.isAuthenticated()
    }

    isAuthenticated = () => {
        axios({
            method: 'post',
            url: '/api/auth/check',
            headers: {Authorization: 'Bearer ' + window.localStorage.getItem('token')}
        })
            .then(() => {
                this.setState({isAuthenticated: true})
            })
            .catch(() => {
                window.localStorage.removeItem('token')
                this.setState({isAuthenticated: false})
            })
    }

    render() {
        const Page = this.state.isAuthenticated ? App : Landing
        return (
            <Provider store={store}>
                <Router>
                    <Page />
                </Router>
            </Provider>
        )
    }
}


export default Main