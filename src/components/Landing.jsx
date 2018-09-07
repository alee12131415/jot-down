import React, {Component} from 'react'
import {Container, Row, Col, Card, CardBody, CardHeader, CardFooter, Form, FormGroup, Label, Input, Button} from 'reactstrap'

import {login} from '../js/auth'

const RowStyle = {
    height: '100vh'
}

class Landing extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newAccount: false,
            loginName: '',
            loginPass: ''
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
    
    render() {
        return (
            <Container className='bg-dark' fluid>
                <Row style={RowStyle} className='justify-content-center'>
                    <Col className='align-self-center' xs={3}>
                        <Card>
                            <Form onSubmit={this.handleLogin}>
                                <CardHeader>
                                    <h3>Welcome to Jot Down</h3>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input type='text' onChange={this.handleLoginNameChange} required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Password</Label>
                                        <Input type='password' onChange={this.handleLoginPassChange} required />
                                    </FormGroup>
                                </CardBody>
                                <CardFooter className='d-flex justify-content-end'>
                                    <Button>Login</Button>
                                </CardFooter>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Landing