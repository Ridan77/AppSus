import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg} from "../../../services/event-bus.service.js"

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


    if (!notes) return <div className="loader">Loading...</div>
    return (
        <section className="note-index">
            {/*<NoteFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />*/}

            <section>
                {/*<Link to="/note/edit">Add Note</Link>*/}
            </section>
            <NoteList onRemoveNote={onRemoveNote} notes={notes} />
        </section>
    )

}
