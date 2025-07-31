
const { useState, useEffect } = React

export function NoteEdit({ note, onSave, onClose }) {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    useEffect(() => {
        if (note) {
            setTitle(note.info && note.info.title || '')
            setBody(note.info && note.info.txt || '')
        }
    }, [note])

    function handleSave() {
        const updatedNote = {
            ...note,
            info: {
                ...note.info,
                title,
                txt: body,
            }
        }
        onSave(updatedNote)
    }

    return (
        <div className="note-edit-modal">
            <div className="modal-content">
                <h2>Edit Note</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Note text"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <div className="modal-actions">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
