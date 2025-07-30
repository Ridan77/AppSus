const { useState } = React

export function NoteAdd({ onAddNote }) {
    const [noteToAdd, setNoteToAdd] = useState({ title: '', type: '' })

    function handleChange({ target }) {
        const { name, value } = target
        setNoteToAdd(prevNote => ({ ...prevNote, [name]: value }))
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
                <input
                    type="text"
                    name="title"
                    placeholder="Note header..."
                    value={noteToAdd.title}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="type"
                    placeholder="Note body..."
                    value={noteToAdd.type}
                    onChange={handleChange}
                />
                <button>Add</button>
            </form>
        </section>
    )
}
