import React, {Component} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import {Row, Col, Container} from 'reactstrap'

import store from '../redux/store'

import TopBar from './TopBar'
import NoteList from './NoteList'
import EditorContainer from './EditorContainer'
import ModalNewNOte from './ModalNewNote'

const NoteCardColStyle = {
    borderRight: '1px solid gray',
    paddingTop: '15px',
    overflow: 'auto'
}

const EditorColStyle = {
    padding: '15px'
}

const AppBodyStyle = {
    height: 'calc(100vh - 56px)'
}

class App extends Component {
    constructor() {
        super()

        this.state = {
            modal: false
        }
    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <TopBar toggleModal={this.toggle} />
                        <Container fluid>
                            <Row style={AppBodyStyle}>
                                <Col lg='2' sm='3' xs='4' style={NoteCardColStyle}>
                                    <NoteList />
                                </Col>
                                <Col lg='10' sm='9' xs='8' style={EditorColStyle}>
                                    <EditorContainer />
                                </Col>
                            </Row>
                        </Container>
                        <ModalNewNOte isOpen={this.state.modal} toggle={this.toggle} />
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App