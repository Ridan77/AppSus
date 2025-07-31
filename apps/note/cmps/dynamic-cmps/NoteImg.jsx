
export function NoteImg({ info }) {
    return (
        <div className="note-img">
            <h2>{info.title}</h2>
            <img src={info.url} alt={info.title} style={{ width: '240px', objectFit: 'cover' }} />
        </div>
    )
}

