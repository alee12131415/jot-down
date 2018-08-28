import {applyMiddleware} from 'redux'
import types, {updateSelectedNote, updateContent, updateTitle} from './actions'
import db from '../js/database'

const saveStateToSessionStorage = store => next => action => {
    next(action)
    sessionStorage.setItem('state', JSON.stringify(store.getState()))
}

const selectedNoteWrapper = store => next => action => {
    next(action)
    if (action.type === types.UPDATE_SELECTED_NOTE && action.payload !== '') {
        const newNote = db.getNote(store.getState().selectedNote)
        store.dispatch(updateContent(newNote.text))
        store.dispatch(updateTitle(newNote.title))
    }
}

const autoSelectFirstNote = store => next => action => {
    next(action)
    const finalState = store.getState()
    if (finalState.selectedNote === '' && finalState.notes.length > 0) {
        store.dispatch(updateSelectedNote(finalState.notes[0].id))
    }
}

export default applyMiddleware(selectedNoteWrapper, autoSelectFirstNote)
