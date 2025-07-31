
import { NotePreview } from "./NotePreview.jsx";

export function NoteList({ notes, onRemoveNote }) {

    if (!notes.length) return <div>No Notes To Show...</div>
    return (
        <ul className="note-list container">
            {notes.map(note => (
                <li key={note.id} className="note-card" style={{ backgroundColor: note.style && note.style.backgroundColor || '#fff' }}>
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
