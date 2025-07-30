
export function NotePreview({ note }) {

    const { title, type } = note
    return (
        <article className="note-preview">
            <h2>Title: {title}</h2>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                id quo reiciendis obcaecati deserunt tenetur provident 
                sed ipsam veritatis! {/*type*/}
            </p>
        </article>
    )
}