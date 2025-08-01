
export function NoteImg({ info }) {
    return (
        <div className="note-img">
            <img src={info.url} alt={info.title} style={{ width: '240px', objectFit: 'cover' }} />
        </div>
    )
}

