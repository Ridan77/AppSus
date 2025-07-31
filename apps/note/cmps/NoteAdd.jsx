const { useState } = React

export function NoteAdd({ onAddNote }) {
    const [noteToAdd, setNoteToAdd] = useState({ title: '', type: '' })

    function handleChange({ target }) {
        const { name, value } = target
        setNoteToAdd(prevNote => ({ ...prevNote, [name]: value }))
    }

    function handleTypeSelect(type) {
        setNoteToAdd({ type, content: ''})
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        if (!noteToAdd.title || !noteToAdd.type) return
        onAddNote(noteToAdd)
        setNoteToAdd({ title: '', type: '' }) 
    }

    return (
        <section className="note-add-container">
            <form onSubmit={handleSubmit}>
                <input className="title-input"
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={noteToAdd.title}
                    onChange={handleChange}
                />
                <input className="body-input"
                    type="text"
                    name="type"
                    placeholder="Take a note..."
                    value={noteToAdd.type}
                    onChange={handleChange}
                />
                <section className="handle-note-type">
                    <button>+</button>
                    <button>text</button>
                    <button>image</button>
                    <button>video</button>
                    <button>list</button>
                </section>
            </form>
        </section>
    )
}
