import React, {Component} from 'react'
import {Container, Row, Col, Card, Nav, NavItem, NavLink} from 'reactstrap'

import LandingForm from './LandingForm'

const RowStyle = {
    height: '100vh'
}

const FormContainerStyle = {
    margin: '0px 5px'
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
                            <center><h3>Welcome to Jot Down</h3></center>
                            <Nav tabs justified>
                                <NavItem onClick={this.handleClickLogin}>
                                    <NavLink active={this.state.isLogin}>Login</NavLink>
                                </NavItem>
                                <NavItem onClick={this.handleClickSignup}>
                                    <NavLink active={!this.state.isLogin}>Sign Up</NavLink>
                                </NavItem>
                            </Nav>
                            <div style={FormContainerStyle}>
                                <LandingForm isLogin={this.state.isLogin} />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Landing