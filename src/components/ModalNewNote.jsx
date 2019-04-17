import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button} from 'reactstrap'

import {updateNotes, updateSelectedNote} from '../redux/actions'
import db from '../js/database'
import {apiProtected} from '../js/auth'

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
        const title = this.state.titleValue
        const content = ''
        const time = Date.now()
        event.preventDefault()
        apiProtected('post', '/notes', {title, content, time})
            .then(res => {
                let notes = db.getNotes()
                notes.push({id: res.id, title, content, time})
                db.setNotes(notes)
                this.props.updateNotes(db.getNotes())
                this.props.updateSelectedNote(res.id)
            })
            .catch(err => {
                console.error(err)
            })
            .finally(() =>{
                this.handleToggle()
            })
        // const newNote = db.addNote(this.state.titleValue, '', '')
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