
export function NotePreview({ note }) {

    const { title, type } = note
    return (
        <article className="note-preview">
            <h2>{title}</h2>
            <p>{type}</p>
        </article>
    )
}