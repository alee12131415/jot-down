import React, {Component} from 'react'
import {connect} from 'react-redux'
import Quill from 'react-quill'

import {updateContent} from '../redux/actions'

import 'react-quill/dist/quill.snow.css' //only one that works

let EditorStyle = {

}

class Editor extends Component {
    constructor(props) {
        super(props)

        this.modules = {
            //displays and groups toolbar formats
            toolbar: [
                [{size: ['small', false, 'large', 'huge']}], //false denotes default
                ['bold', 'italic', 'underline', 'strike'],
                [{align: ''}, {align: 'center'}, {align: 'right'}, {align: 'justify'}],
                [{list: 'bullet'}, {list: 'ordered'}, {indent: '+1'}, {indent: '-1'}],
                ['blockquote', 'code']
            ]
        }

        //type of possible formats the editor can do
        this.formats = [
            'size',
            'bold', 'italic', 'underline', 'strike',
            'align',
            'list', 'indent',
            'blockquote', 'code'
        ]
    }

    onChange = (value) => {
        this.props.updateContent(value)
    }

    componentDidMount = () => {
        const offset = document.getElementsByClassName('ql-toolbar')[0].offsetHeight
        EditorStyle = {
            height: `calc(100% - ${offset}px)`,
            width: '100%'
        }
        this.forceUpdate()
    }

    render() {
        return (
            <Quill
                theme='snow'
                modules={this.modules}
                formats={this.formats}
                value={this.props.content}
                onChange={this.onChange}
                style={EditorStyle}
            />
        )
    }
}

const mapS2P = state => {
    return {
        content: state.noteInfo.content
    }
}

const mapD2P = dispatch => {
    return {
        updateContent: content => dispatch(updateContent(content))
    }
}

export default connect(mapS2P, mapD2P)(Editor)