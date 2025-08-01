import { NoteTxt } from "./dynamic-cmps/NoteTxt.jsx"
import { NoteImg } from "./dynamic-cmps/NoteImg.jsx"
import { NoteTodos } from "./dynamic-cmps/NoteTodos.jsx"
import { NoteVideo } from "./dynamic-cmps/NoteVideo.jsx"


const dynamicCmps = {
    NoteTxt,
    NoteImg,
    NoteTodos,
    NoteVideo
}



export function NotePreview({ note, style, onTogglePin }) {
    const { type, info, isPinned } = note
    const DynamicCmp = dynamicCmps[type]
    if (!DynamicCmp || !info) return null

    return (
        <article className="note-preview" style={style}>
            <header className="note-header">
                <h2>{info.title || ''}</h2>
                <button className="pin-btn" onClick={() => onTogglePin(note.id)}>
                    {isPinned ? '📌' : '📍'}
                </button>
            </header>
            <DynamicCmp info={info} />
        </article>
    )
}