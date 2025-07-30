const { Link } = ReactRouterDOM

import { NotePreview } from "./NotePreview.jsx";

export function NoteList({ notes, onRemoveNote }) {

    const listAttrs = {
        className: 'note-list container',
        title: 'Hello NoteList!',
        onClick: () => { console.log('List Clicked!') }
    }

    if (!notes.length) return <div>No Notes To Show...</div>
    return (
        <ul {...listAttrs}>
            {notes.map(note => (
                <li key={note.id}>
                    <NotePreview note={note} />
                    <section className="handle-note-btns">
                        <button onClick={() => onRemoveNote(note.id)}>
                            Remove
                        </button>
                        <button >
                            Edit
                            {/*<Link to={`/note/edit/${note.id}`}>Edit</Link>*/}
                        </button>
                    </section>
                </li>
            ))}
        </ul>
    )

}
