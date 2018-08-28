import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateTitle} from '../redux/actions'

class Header extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h3>{this.props.subtitle}</h3>
            </div>
        )
    }
}

const mapS2P = state => {
    return {
        title: state.title,
        subtitle: state.subtitle
    }
}

const mapD2P = dispatch => {
    return {
        updateTitle: title => dispatch(updateTitle(title))
    }
}

export default connect(mapS2P, mapD2P)(Header)
