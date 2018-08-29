import React, {Component} from 'react'
import {connect} from 'react-redux'

import EditorTitle from './EditorTitle'
import Editor from './Editor'

const ContainerStyle = {
    height: '100%',
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'stretch'
}

const EditorStyle = {
    flex: 1,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flexStart',
    alignItems: 'stretch',
    alignContent: 'stretch'
}

class EditorContainer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.selectedNote !== '') {
            return (
                <div style={ContainerStyle}>
                    <EditorTitle />
                    <div style={EditorStyle}>
                        <Editor />
                    </div>
                </div>
            )
        } else {
            return (
                <center>
                    <h1 className='display-3'>Welcome to Jot Down</h1>
                    <hr />
                    <p className='lead'>Start adding notes by clicking the {'"'}New{'"'} Button above</p>
                </center>
            )
        }
    }
}

const mapS2P = state => {
    return {
        selectedNote: state.selectedNote
    }
}

export default connect(mapS2P)(EditorContainer)