import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Navbar, NavbarBrand, Nav, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import {NoteAdd, Delete, Save, Settings, Sync} from '@material-ui/icons'
import moment from 'moment'

import {updateNotes, updateSelectedNote} from '../redux/actions'

import db from '../js/database'
import {logout, apiProtected} from '../js/auth'

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
        const id = this.props.selectedNote
        const time = moment().valueOf()
        apiProtected('put', '/notes', {id, title, content, time})
            .then(res => {
                db.updateNote(this.props.selectedNote, title, content) //time is added by db function FIXME: streamline this so time is consistent
                this.props.updateNotes(db.getNotes())
            })
            .catch(err => {
                console.error(err)
            })
        
    }

    onClickDelete = () => {
        const id = this.props.selectedNote
        apiProtected('delete', '/notes', {id})
            .then(res => {
                db.deleteNote(this.props.selectedNote)
                this.props.updateNotes(db.getNotes())
                this.props.updateSelectedNote('')
            })
            .catch(err => {
                console.error(err)
            })
    }

    onClickSync = async () => {
        db.setNotes((await apiProtected('post', '/notes/sync', {notes: db.getNotes()})).notes)
    }

    toggleSettings = () => {
        this.setState({settingsIsOpen: !this.state.settingsIsOpen})
    }

    onClickLogout = () => {
        logout()
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
                    <Button style={ButtonStyle}>
                        <Sync onClick={this.onClickSync} />
                    </Button>
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