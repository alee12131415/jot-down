import React, {Component} from 'react'
import {Container, Row, Col, Card, Form, FormGroup, FormText, Label, Input, Button, Nav, NavItem, NavLink} from 'reactstrap'

import {login, signup} from '../js/auth'

const RowStyle = {
    height: '100vh'
}

const FormContainerStyle = {
    margin: '5px'
}

class Landing extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogin: true
        }
    }

    handleClickLogin = () => {
        this.setState({isLogin: true})
    }

    handleClickSignup = () => {
        this.setState({isLogin: false})
    }

    render() {
        return (
            <Container className='bg-dark' fluid>
                <Row style={RowStyle} className='justify-content-center'>
                    <Col className='align-self-center' xl={3} lg={4} md={6} sm={8} xs={12}>
                        <Card>
                            <Nav tabs justified>
                                <NavItem onClick={this.handleClickLogin}>
                                    <NavLink active={this.state.isLogin}>Login</NavLink>
                                </NavItem>
                                <NavItem onClick={this.handleClickSignup}>
                                    <NavLink active={!this.state.isLogin}>Sign Up</NavLink>
                                </NavItem>
                            </Nav>
                            <div style={FormContainerStyle}>
                                <h4>Welcome to Jot Down</h4>
                                <LandingForm isLogin={this.state.isLogin} />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

class LandingForm extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            loginName: '',
            loginPass: '',
            signupName: '',
            signupPass: ''
        }
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
    }

    handleSignupNameChane = (event) => {
        this.setState({signupName: event.target.value})
    }

    handleSignupPassChange = (event) => {
        this.setState({signupPass: event.target.value})
    }

    handleSignup = (event) => {
        event.preventDefault()
        signup(this.state.signupName, this.state.signupPass)
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
                <Button className='float-right'>Login</Button>
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
                <Button className='float-right'>Login</Button>
            </Form>
        return Page
    }
}

export default Landing