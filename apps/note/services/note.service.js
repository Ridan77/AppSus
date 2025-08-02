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
    return storageService.get(NOTE_KEY, noteId).then()
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
            {
                id: 'n201',
                createdAt: 1627891234567,
                type: 'NoteTxt',
                isPinned: true,
                info: {
                    title: 'Grocery List',
                    txt: 'Milk, Bread, Eggs, Coffee'
                },
                style: {
                    backgroundColor: '#FFEB3B'
                }
            },
            {
                id: 'n202',
                createdAt: 1627892234567,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    title: 'Sunset at the beach',
                    url: 'https://picsum.photos/300/200?random=1'
                },
                style: {
                    backgroundColor: '#E1BEE7'
                }
            },
            {
                id: 'n203',
                createdAt: 1627893234567,
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Workout Goals',
                    todos: [
                        { txt: 'Run 5km', doneAt: null },
                        { txt: 'Stretch', doneAt: 1627893234000 }
                    ]
                },
                style: {
                    backgroundColor: '#C8E6C9'
                }
            },
            {
                id: 'n204',
                createdAt: 1627894234567,
                type: 'NoteTxt',
                isPinned: false,
                info: {
                    title: 'Project Ideas',
                    txt: 'Build a recipe app with React'
                },
                style: {
                    backgroundColor: '#FFF9C4'
                }
            },
            {
                id: 'n205',
                createdAt: 1627895234567,
                type: 'NoteImg',
                isPinned: true,
                info: {
                    title: 'Cool Architecture',
                    url: 'https://picsum.photos/300/200?random=2'
                },
                style: {
                    backgroundColor: '#FFCDD2'
                }
            },
            {
                id: 'n206',
                createdAt: 1627896234567,
                type: 'NoteTodos',
                isPinned: true,
                info: {
                    title: 'Weekend Prep',
                    todos: [
                        { txt: 'Clean kitchen', doneAt: null },
                        { txt: 'Buy groceries', doneAt: null }
                    ]
                },
                style: {
                    backgroundColor: '#D1C4E9'
                }
            },
            {
                id: 'n207',
                createdAt: 1627897234567,
                type: 'NoteTxt',
                isPinned: false,
                info: {
                    title: 'Meeting Notes',
                    txt: 'Discuss Q3 goals and priorities'
                },
                style: {
                    backgroundColor: '#B3E5FC'
                }
            },
            {
                id: 'n208',
                createdAt: 1627898234567,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    title: 'Mountain Hike',
                    url: 'https://picsum.photos/300/200?random=3'
                },
                style: {
                    backgroundColor: '#F0F4C3'
                }
            },
            {
                id: 'n209',
                createdAt: 1627899234567,
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Study Plan',
                    todos: [
                        { txt: 'Math exercises', doneAt: null },
                        { txt: 'Read JS book', doneAt: null }
                    ]
                },
                style: {
                    backgroundColor: '#FFE0B2'
                }
            },
            {
                id: 'n210',
                createdAt: 1627900234567,
                type: 'NoteTxt',
                isPinned: true,
                info: {
                    title: 'Birthday Thoughts',
                    txt: 'Plan something special for mom!'
                },
                style: {
                    backgroundColor: '#DCEDC8'
                }
            }
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


