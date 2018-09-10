import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateSelectedNote, updateTitle, updateContent} from '../redux/actions'
import {Card, CardTitle, CardSubtitle, CardBody} from 'reactstrap'
import moment from 'moment'

import db from '../js/database'

const CardTitleStyle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    paddingBottom: '3px'
}

const CardSubtitleStyle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    // paddingBottom: '2px'
}

const NoteCardStyle = {
    marginBottom: '15px'
}

class NoteCard extends Component {
    constructor(props) {
        super(props)
    }

    getDateTime = () => {
        //if within a week display nameofday and time else month day
        const lastSavedMoment = moment(this.props.time)
        const weekinmilli = 6 * 24 * 60 * 60 * 1000
        if (moment().valueOf() - this.props.time < weekinmilli) {
            return lastSavedMoment.format('ddd h:mm a')
        } else {
            return lastSavedMoment.format('MMM Do')
        }


    }

    onClick = () => {
        this.props.updateSelectedNote(this.props.id)
        const {title, content} = db.getNote(this.props.id)
        this.props.updateTitle(title)
        this.props.updateContent(content)
    }

    render() {
        let isSelected = this.props.selectedNote === this.props.id

        return (
            <Card outline={!isSelected} inverse={isSelected} style={NoteCardStyle} onClick={this.onClick} color='secondary'>
                <CardBody>
                    <CardTitle style={CardTitleStyle}>
                        {this.props.title}
                    </CardTitle>
                    <CardSubtitle style={CardSubtitleStyle}>
                        {this.getDateTime()}
                    </CardSubtitle>
                </CardBody>
            </Card>
        )
    }
}

const mapS2P = state => {
    return {
        selectedNote: state.selectedNote
    }
}

const mapD2P = dispatch => {
    return {
        updateSelectedNote: id => dispatch(updateSelectedNote(id)),
        updateTitle: title => dispatch(updateTitle(title)),
        updateContent: content => dispatch(updateContent(content))
    }
}

export default connect(mapS2P, mapD2P)(NoteCard)