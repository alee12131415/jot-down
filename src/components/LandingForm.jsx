import React, {Component} from 'react'
import {Form, FormGroup, Label, Input, Button, FormText, Alert} from 'reactstrap'

import {login, signup} from '../js/auth'

class LandingForm extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            loginName: '',
            loginPass: '',
            signupName: '',
            signupPass: '',
            isAlert: false,
            alertMessage: ''
        }

        this.nameRegex = /^[a-zA-Z0-9_]{1,24}$/
        this.passRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=]{6,24}$/
    }

    handleLoginNameChange = (event) => {
        this.setState({loginName: event.target.value})
    }

    handleLoginPassChange = (event) => {
        this.setState({loginPass: event.target.value})
    }

    handleLogin = (event) => {
        event.preventDefault()
        login(this.state.loginName, this.state.loginPass)
            .then(result => {
                if (!result) {
                    this.showAlert('Invalid Login')
                }
            })
            .catch(() => {
                this.showAlert('Unknown Error')
            })
    }

    handleSignupNameChane = (event) => {
        this.setState({signupName: event.target.value})
    }

    handleSignupPassChange = (event) => {
        this.setState({signupPass: event.target.value})
    }

    handleSignup = (event) => {
        event.preventDefault()
        if (this.nameRegex.test(this.state.signupName) && this.passRegex.test(this.state.signupPass)) {
            signup(this.state.signupName, this.state.signupPass)
                .then(res => {
                    // Server Error
                    if (res) {
                        this.showAlert(res)
                    }
                })
                .catch(err => {
                    this.showAlert('Unknown Error')
                })
        }
        else {
            this.showAlert('Invalid Name or Password')
        }
    }

    dismissAlert = () => {
        this.setState({isAlert: false})
    }

    showAlert = (message) => {
        this.setState({isAlert: true, alertMessage: message})
    }
    
    render() {
        const Page = this.props.isLogin
            ? <Form onSubmit={this.handleLogin}>
                <FormGroup>
                    <Label>Name</Label>
                    <Input type='text' onChange={this.handleLoginNameChange} required />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type='password' onChange={this.handleLoginPassChange} required />
                </FormGroup>
                <FormGroup className='d-flex justify-content-end'>
                    <Button>Login</Button>
                </FormGroup>
            </Form>
            : <Form onSubmit={this.handleSignup}>
                <FormGroup>
                    <Label>Name</Label>
                    <Input type='text' onChange={this.handleSignupNameChane} required />
                    <FormText color='muted'>1 - 24 characters a-zA-Z0-9_ no spaces</FormText>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type='password' onChange={this.handleSignupPassChange} required />
                    <FormText color='muted'>6 - 24 characters a-zA-Z0-9!@#$%^&*()_+-= no spaces</FormText>
                </FormGroup>
                <FormGroup className='d-flex justify-content-end'>
                    <Button>Sign Up</Button>
                </FormGroup>
            </Form>
        return (
            <div>
                {Page}
                <Alert color='danger' isOpen={this.state.isAlert} toggle={this.dismissAlert}>{this.state.alertMessage}</Alert>
            </div>
        )
    }
}

export default LandingForm