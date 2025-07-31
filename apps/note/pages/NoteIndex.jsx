import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg} from "../../../services/event-bus.service.js"
import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteEdit } from "./NoteEdit.jsx"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function NoteIndex() {
    
    const [notes, setNotes] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))
    const [editingNote, setEditingNote] = useState(null)

    useEffect(() => {
        setSearchParams(filterBy)
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.query()
            .then(allNotes => {
                const filteredNotes = allNotes.filter(note => {
                    const title = (note.info && note.info.title) ? note.info.title : ''
                    return title.toLowerCase().includes((filterBy.txt && filterBy.txt.toLowerCase()) || '')
                })
                setNotes(filteredNotes)
            })
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

    function onAddNote(note) {
        noteService.save(note)
            .then(savedNote => {
                setNotes(prevNotes => [...prevNotes, savedNote])
                showSuccessMsg(`Note added!`)
            })
            .catch(err => {
                console.log('Error adding note:', err)
                showErrorMsg('Problem adding note!')
            })
    }

    function onEditNote(note) {
        setEditingNote(note)
    }

    function onSaveNoteEdit(updatedNote) {
        noteService.save(updatedNote)
            .then(savedNote => {
                setNotes(prevNotes =>
                    prevNotes.map(n => n.id === savedNote.id ? savedNote : n)
                )
                setEditingNote(null)
                showSuccessMsg('Note updated!')
            })
            .catch(err => {
                console.log('Error saving edited note:', err)
                showErrorMsg('Could not update note.')
            })
    }

    function onChangeNoteColor(noteId, color) {
        noteService.get(noteId)
            .then(note => {
                note.style = note.style || {}
                note.style.backgroundColor = color
                return noteService.save(note)
            })
            .then(savedNote => {
                setNotes(prevNotes =>
                    prevNotes.map(n => n.id === savedNote.id ? savedNote : n)
                )
                showSuccessMsg('Background color changed!')
            })
            .catch(err => {
                console.log('Error updating note color:', err)
                showErrorMsg('Could not change color.')
            })
    }

    if (!notes) return <div className="loader">Loading...</div>
    return (
        <section className="note-index">
            <NoteFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
            <NoteAdd onAddNote={onAddNote} />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} onEditNote={onEditNote} onChangeNoteColor={onChangeNoteColor} />
            {editingNote && (
                <NoteEdit
                    note={editingNote}
                    onSave={onSaveNoteEdit}
                    onClose={() => setEditingNote(null)}
                />
            )}
        </section>
    )

}
