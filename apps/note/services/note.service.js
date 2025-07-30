import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const { loadFromStorage, makeId, saveToStorage } = utilService

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    getFilterFromSearchParams
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.title))
            }
            if (filterBy.type) {
                notes = notes.filter(note => note.type >= filterBy.type)
            }
            // console.log(' notes:', notes)
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId).then(_setNextPrevNoteId)
}

function remove(noteId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(title = '', type = '') {
    return { title, type }
}

function getDefaultFilter() {
    return { txt: '', type: '' }
}



function _createNotes() {
    let notes = loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            _createNote('First note', 'NoteTxt'),
            _createNote('Second note', 'NoteTxt'),
            _createNote('Third note', 'NoteTxt'),
            _createNote('Fourth note', 'NoteTxt')
        ]
        saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(title, type) {
    const note = getEmptyNote(title, type)
    note.id = makeId()
    return note
}


function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const type = searchParams.get('type') || ''
    return {
        txt,
        type
    }
}


