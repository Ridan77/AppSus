const { useState } = React

export function NoteTodos({ info }) {
    const [todos, setTodos] = useState(info.todos)

    function toggleDone(idx) {
        setTodos(prevTodos =>
            prevTodos.map((todo, i) =>
                i === idx ? { ...todo, doneAt: todo.doneAt ? null : Date.now() } : todo
            )
        )
    }

    if (!info || !info.todos) {
        return <p>broken todos info</p>
    }

    return (
        <div>
            <div className="note-title">
                <h2>{info.title}</h2>
            </div>
            <div className="note-body">
                {todos.map((todo, idx) => (
                    <div key={idx} className={`todo-item ${todo.doneAt ? 'done' : ''}`}>
                        <span>{todo.txt}</span>
                        <button onClick={() => toggleDone(idx)} className="todo-toggle">x</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
