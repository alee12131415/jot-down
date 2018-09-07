import {verifyToken} from '../js/auth'

const isAuthenticated = verifyToken()

export default {
    noteInfo: {
        title: '',
        content: ''
    },
    selectedNote: '',
    notes: [],
    isSaved: true,
    isAuthenticated
}
