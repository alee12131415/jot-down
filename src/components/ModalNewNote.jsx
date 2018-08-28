import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button} from 'reactstrap'

import {updateNotes, updateSelectedNote} from '../redux/actions'
import db from '../js/database'

class ModalNewNote extends Component {
    //use this.props.toggle to toggle state, Parent component will control this component's state
    constructor(props) {
        super(props)

        this.state = {
            titleValue: ''
        }
    }

    handleToggle = () => {
        this.setState({titleValue: ''})
        this.props.toggle()
    }

    handleTitleChange = (event) => {
        this.setState({titleValue: event.target.value})
    }

    handleAdd = (event) => {
        const newNote = db.addNote(this.state.titleValue, '', '')
        this.props.updateNotes(db.getNotes())
        this.props.updateSelectedNote(newNote)
        this.handleToggle()
        event.preventDefault()
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.handleToggle}>
                <Form onSubmit={this.handleAdd}>
                    <ModalHeader>New Note</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label>Title</Label>
                            <Input type='text' placeholder='' onChange={this.handleTitleChange} required/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button>Add</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        )
    }
}

const mapD2P = dispatch => {
    return {
        updateNotes: notes => dispatch(updateNotes(notes)),
        updateSelectedNote: id => dispatch(updateSelectedNote(id))
    }
}

export default connect(null, mapD2P)(ModalNewNote)