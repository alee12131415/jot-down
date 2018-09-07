import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Navbar, NavbarBrand, Nav, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import {NoteAdd, Delete, Save, Settings} from '@material-ui/icons'

import {updateNotes, updateSelectedNote} from '../redux/actions'

import db from '../js/database'
import {logout} from '../js/auth'

const NoteOptionsStyle = {
    borderLeft: '1px solid gray',
    paddingLeft: '10px'
}

const ButtonStyle = {
    marginRight: '10px'
}

const IconStyle = {
    marginRight: '5px',
    verticalAlign: 'bottom'
}

class TopBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            settingsIsOpen: false
        }
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

    onClickLogout = () => {
        logout()
    }

    toggleSettings = () => {
        this.setState({settingsIsOpen: !this.state.settingsIsOpen})
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
                    <Button onClick={this.onClickDelete}>
                        <Delete style={IconStyle} />
                        Delete
                    </Button>
                </div>
            )
        }

        return (
            <Navbar className='d-flex justify-content-between' color='dark' dark>
                <NavbarBrand href='#'>
                    Jot Down
                </NavbarBrand>
                <Nav>
                    <Button onClick={this.props.toggleModal} style={ButtonStyle}>
                        <NoteAdd style={IconStyle} />
                        New
                    </Button>
                    {noteOption}
                </Nav>
                <Nav>
                    <ButtonDropdown isOpen={this.state.settingsIsOpen} toggle={this.toggleSettings}>
                        <DropdownToggle caret>
                            <Settings style={IconStyle} />
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem onClick={this.onClickLogout}>Logout</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
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