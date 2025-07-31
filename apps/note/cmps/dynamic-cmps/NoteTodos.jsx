

export function NoteTodos({ info }) {
    if (!info || !info.todos) {
        return <p>broken todos info</p>
    }

    return (
        <div className="note-todos">
            <h2>{info.title}</h2>
            <div className="todo-list">
                {info.todos.map((todo, idx) => (
                    <div key={idx} className="todo-item">
                        {todo.txt}
                    </div>
                ))}
            </div>
        </div>
    )
}
