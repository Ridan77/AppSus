
export function NoteTxt({ info }) {
    if (!info || !info.txt) return 

    return (
        <div>
            <div className="note-body">
                <p>{info.txt}</p>
            </div>
        </div>
    )
}
