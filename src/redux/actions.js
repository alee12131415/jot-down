const types = {
    UPDATE_TITLE: 'UPDATE_TITLE',
    UPDATE_CONTENT: 'UPDATE_CONTENT',
    UPDATE_SELECTED_NOTE: 'UPDATE_SELECTED_NOTE',
    UPDATE_NOTES: 'UPDATE_NOTES',
    IS_SAVED_FALSE: 'IS_SAVED_FALSE',
    IS_SAVED_TRUE: 'IS_SAVED_TRUE',
    IS_AUTHENTICATED_FALSE: 'IS_AUTHENTICATED_FALSE',
    IS_AUTHENTICATED_TRUE: 'IS_AUTHENTICATED_TRUE'
}

export const updateTitle = (title) => {
    return {
        type: types.UPDATE_TITLE,
        payload: title
    }
}

export const updateContent = (content) => {
    return {
        type: types.UPDATE_CONTENT,
        payload: content
    }
}

export const updateSelectedNote = (id) => {
    return {
        type: types.UPDATE_SELECTED_NOTE,
        payload: id
    }
}

export const updateNotes = (notes) => {
    return {
        type: types.UPDATE_NOTES,
        payload: notes
    }
}

export const isSaved = (isSaved) => {
    return isSaved ? {type: types.IS_SAVED_TRUE} : {type: types.IS_SAVED_FALSE}
}

export const isAuthenticated = (isAuthenticated) => {
    return isAuthenticated ? {type: types.IS_AUTHENTICATED_TRUE} : {type: types.IS_AUTHENTICATED_FALSE}
}

export default types
