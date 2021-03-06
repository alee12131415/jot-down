import {combineReducers} from 'redux'
import types from './actions'

const title = (state = '', {type, payload}) => {
    switch (type) {
        case types.UPDATE_TITLE:
            return payload
        case types.IS_AUTHENTICATED_FALSE:
            return ''
        default:
            return state
    }
}

const content = (state = '', {type, payload}) => {
    switch (type) {
        case types.UPDATE_CONTENT:
            return payload
        case types.IS_AUTHENTICATED_FALSE:
            return ''
        default:
            return state
    }
}

const selectedNote = (state = '', {type, payload}) => {
    switch (type) {
        case types.UPDATE_SELECTED_NOTE:
            return payload
        case types.IS_AUTHENTICATED_FALSE:
            return ''
        default:
            return state
    }
}

const notes = (state = [], {type, payload}) => {
    switch (type) {
        case types.UPDATE_NOTES:
            return [...payload] //this way it is not refering to the same object and this rerenders
        case types.IS_AUTHENTICATED_FALSE:
            return []
        default:
            return state
    }
}

// TODO:
const isSaved = (state = true, {type}) => {
    switch (type) {
        case types.IS_SAVED_TRUE:
            return true
        case types.IS_SAVED_FALSE:
            return false
        default:
            return state
    }
}

const isAuthenticated = (state = false, {type}) => {
    switch (type) {
        case types.IS_AUTHENTICATED_TRUE:
            return true
        case types.IS_AUTHENTICATED_FALSE:
            return false
        default:
            return state
    }
}

export default combineReducers ({
    noteInfo: combineReducers({
        title,
        content
    }),
    selectedNote,
    notes,
    isSaved,
    isAuthenticated
})
