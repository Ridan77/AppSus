
export function NoteTxt({ info }) {
    if (!info || !info.txt) return 

    return (
        <div>
            <div className="note-title">
                <h2>{info.title}</h2>
            </div>
            <div className="note-body">
                <p>{info.txt}</p>
            </div>
        </div>
    )
}
