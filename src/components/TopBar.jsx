import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Navbar, NavbarBrand, Nav, Button} from 'reactstrap'
import {NoteAdd, Delete, Save} from '@material-ui/icons'

import {updateNotes, updateSelectedNote} from '../redux/actions'

import db from '../js/database'

const NoteOptionsStyle = {
    borderRight: '1px solid gray',
    paddingRight: '10px'
}

const ButtonStyle = {
    marginLeft: '10px'
}

const IconStyle = {
    marginRight: '5px',
    verticalAlign: 'bottom'
}

class TopBar extends Component {
    constructor(props) {
        super(props)
    }

    onClickSave = () => {
        const {title, content} = this.props.noteInfo
        db.updateNote(this.props.selectedNote, title, content, '')
        this.props.updateNotes(db.getNotes())
    }

    onClickDelete = () => {
        db.deleteNote(this.props.selectedNote)
        this.props.updateNotes(db.getNotes())
        this.props.updateSelectedNote('')
    }

    render() {
        let noteOption

        if (this.props.selectedNote !== '') {
            noteOption = (
                <div style={NoteOptionsStyle}>
                    <Button onClick={this.onClickSave} style={ButtonStyle}>
                        <Save style={IconStyle} />
                        Save
                    </Button>
                    <Button onClick={this.onClickDelete} style={ButtonStyle}>
                        <Delete style={IconStyle} />
                        Delete
                    </Button>
                </div>
            )
        }

        return (
            <Navbar color='dark' dark>
                <NavbarBrand href='#'>
                    Jot Down
                </NavbarBrand>
                <Nav className='ml-auto'>
                    {noteOption}
                    <Button onClick={this.props.toggleModal} style={ButtonStyle}>
                        <NoteAdd style={IconStyle} />
                        New
                    </Button>
                </Nav>
            </Navbar>
        )
    }
}

const mapS2P = state => {
    return {
        selectedNote: state.selectedNote,
        noteInfo: state.noteInfo
    }
}

const mapD2P = dispatch => {
    return {
        updateNotes: notes => dispatch(updateNotes(notes)),
        updateSelectedNote: id => dispatch(updateSelectedNote(id))
    }
}

export default connect(mapS2P, mapD2P)(TopBar)