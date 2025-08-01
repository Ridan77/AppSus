const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilterBy }) {
    const [filterText, setFilterText] = useState(filterBy.txt || '')
    const [selectedType, setSelectedType] = useState(filterBy.type || '')

    useEffect(() => {
        const delay = setTimeout(() => {
            onSetFilterBy({ ...filterBy, txt: filterText })
        }, 500)

        return () => clearTimeout(delay)
    }, [filterText])

    useEffect(() => {
        onSetFilterBy({ ...filterBy, type: selectedType })
    }, [selectedType])

    function handleChange(ev) {
        setFilterText(ev.target.value)
    }

    function handleTypeChange(type) {
        setSelectedType(prevType => (prevType === type ? '' : type)) 
    }

    return (
        <section className="note-filter-container">

            <div className="filters-title">
                Get Your Notes Filtered!
            </div>
            
            <div className="search-input">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={filterText}
                    onChange={handleChange}
                />
            </div>

            <aside className="side-menu">
                <button
                    className={selectedType === 'NoteTxt' ? 'active' : ''}
                    onClick={() => handleTypeChange('NoteTxt')}>
                    Text
                </button>
                <button
                    className={selectedType === 'NoteImg' ? 'active' : ''}
                    onClick={() => handleTypeChange('NoteImg')}>
                    Image
                </button>
                <button
                    className={selectedType === 'NoteTodos' ? 'active' : ''}
                    onClick={() => handleTypeChange('NoteTodos')}>
                    Todos
                </button>
            </aside>

        </section>
    )
}
