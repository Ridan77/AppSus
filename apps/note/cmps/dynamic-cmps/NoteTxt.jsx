
export function NoteTxt({ info }) {
    if (!info || !info.txt) return <p>Empty text</p>

    return (
        <div className="note-txt">
            <h2>{info.title}</h2>
            <p>{info.txt}</p>
        </div>
    )
}
