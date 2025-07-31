const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilterBy }) {
    const [filterText, setFilterText] = useState(filterBy.txt || '')

    useEffect(() => {
        const delay = setTimeout(() => {
            onSetFilterBy({ ...filterBy, txt: filterText })
        }, 500)

        return () => clearTimeout(delay)
    }, [filterText])

    function handleChange(ev) {
        setFilterText(ev.target.value)
    }

    return (
        <section className="note-filter">
            <input
                type="text"
                placeholder="Search by title..."
                value={filterText}
                onChange={handleChange}
            />
        </section>
    )
}
