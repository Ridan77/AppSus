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



export function NotePreview({ note, style }) {
    const { type, info } = note
    const DynamicCmp = dynamicCmps[type]
    if (!DynamicCmp || !info) return null

    return (
        <article className="note-preview" style={style}>
            {DynamicCmp && <DynamicCmp info={info} />}
        </article>
    )
}