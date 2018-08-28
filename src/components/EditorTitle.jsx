import React, {Component} from 'react'
// import ContentEditable from 'react-contenteditable'
import {Input} from 'reactstrap'
import {updateTitle} from '../redux/actions'
import {connect} from 'react-redux'

const EditorTitleStyle = {
    border: '0px'
}

class EditorTitle extends Component {
    constructor(props) {
        super(props)
    }

    onChange = (value) => {
        this.props.updateTitle(value.target.value)
    }

    render() {
        return (
            <Input value={this.props.title} style={EditorTitleStyle} bsSize='lg' type="text" maxLength={120} onChange={this.onChange} placeholder='Title cannot be blank...' />

            // <h1>
            //     <ContentEditable
            //         contenteditable='plaintext-only'
            //         html={this.state.value}
            //         disabled={false}
            //         onChange={this.onChange} />
            // </h1>
        )
    }
}

const mapS2P = state => {
    return {
        title: state.noteInfo.title
    }
}

const mapD2P = dispatch => {
    return {
        updateTitle: title => dispatch(updateTitle(title))
    }
}

export default connect(mapS2P, mapD2P)(EditorTitle)