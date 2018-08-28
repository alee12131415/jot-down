import React, {Component} from 'react'
import {connect} from 'react-redux'

import {updateSelectedNote, updateNotes} from '../redux/actions'

import NoteCard from './NoteCard'

import db from '../js/database'

const NoteListStyle = {

}

class NoteList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            completeDBCall: false
        }
    }

    componentDidMount = () => {
        //do request here and set state here
        this.props.updateNotes(db.getNotes())
        this.setState({completeDBCall: true})
    }

    render() {
        if (this.state.completeDBCall) {
            return (
                <div style={NoteListStyle}>
                    {this.props.notes.map((note) => {
                        return (
                            <NoteCard key={note.id} id={note.id} title={note.title} time={note.time} />
                        )
                    })}
                </div>
            )
        } else {
            return (
                <h1>Loading...</h1>
            )
        }

        
    }
}

const mapS2P = state => {
    return {
        notes: state.notes
    }
}

const mapD2P = dispatch => {
    return {
        updateSelectedCard: id => dispatch(updateSelectedNote(id)),
        updateNotes: notes => dispatch(updateNotes(notes))
    }
}

export default connect(mapS2P, mapD2P)(NoteList)