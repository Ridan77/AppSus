import { NotePreview } from "./NotePreview.jsx";
const { useState } = React

export function NoteList({ notes, onRemoveNote, onEditNote, onChangeNoteColor }) {

    const [openDropdownId, setOpenDropdownId] = useState(null)

    const colors = [
        { name: '--color1', label: 'Color 1' },
        { name: '--color2', label: 'Color 2' },
        { name: '--color3', label: 'Color 3' },
        { name: '--color4', label: 'Color 4' },
    ]

    function toggleDropdown(noteId) {
        setOpenDropdownId(prev => (prev === noteId ? null : noteId))
    }

    return (
        <ul className="note-list container">
            {notes.map(note => (
                <li 
                    key={note.id} 
                    className="note-card" 
                    style={{ backgroundColor: note.style && note.style.backgroundColor || '#fff' }}
                >

                    <NotePreview note={note} />

                    <section className="handle-note-btns">
                        <button onClick={() => onRemoveNote(note.id)}>Remove</button>
                        <button onClick={() => onEditNote(note)}>Edit</button>

                        <div className="color-picker">
                            <button onClick={() => toggleDropdown(note.id)}>🎨</button>

                            {openDropdownId === note.id && (
                                <div className="color-dropdown">
                                    {colors.map(c => (
                                        <div
                                            key={c.name}
                                            className="color-swatch"
                                            style={{ backgroundColor: `var(${c.name})` }}
                                            onClick={() => {
                                                onChangeNoteColor(note.id, `var(${c.name})`)
                                                setOpenDropdownId(null)
                                            }}>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                </li>
            ))}
        </ul>
    )
}
