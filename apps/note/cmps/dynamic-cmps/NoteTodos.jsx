

export function NoteTodos({ info }) {
    return (
        <div className="note-todos">
            <h2>{info.title}</h2>
            <div className="todo-list">
                {info.todos && info.todos.map((todo, idx) => (
                    <div key={idx} className="todo-item">
                        {todo.txt}
                    </div>
                ))}
            </div>
        </div>
    )
}
