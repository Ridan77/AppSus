

export function NoteVideo({ info }) {
    return (
        <div>
            <h2>{info.title}</h2>
            <p>(Video would be here: {info.url})</p>
        </div>
    )
}