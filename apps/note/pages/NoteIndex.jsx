import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg} from "../../../services/event-bus.service.js"
import { NoteAdd } from "../cmps/NoteAdd.jsx"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function NoteIndex() {
    
    const [notes, setNotes] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setSearchParams(filterBy)
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy)
            .then(notes => setNotes(notes))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot get notes!')
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg(`Note (${noteId}) removed successfully!`)
            })
            .catch(err => {
                console.log('Problem removing note:', err)
                showErrorMsg('Problem removing note!')
            })
    }

    function onSetFilterBy(filterByToEdit) {
        setFilterBy({ ...filterByToEdit })
    }

    function onAddNote(noteData) {
        const newNote = noteService.getEmptyNote(noteData.title, noteData.type)
        noteService.save(newNote)
            .then(savedNote => {
                setNotes(prevNotes => [...prevNotes, savedNote])
                showSuccessMsg(`Note added!`)
            })
            .catch(err => {
                console.log('Error adding note:', err)
                showErrorMsg('Problem adding note!')
            })
    }


    if (!notes) return <div className="loader">Loading...</div>
    return (
        <section className="note-index">
            {/*<NoteFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />*/}

            <NoteAdd onAddNote={onAddNote} />
            <NoteList onRemoveNote={onRemoveNote} notes={notes} />
        </section>
    )

}
