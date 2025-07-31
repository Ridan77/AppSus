
export function NoteTxt({ info }) {
    
    if (!info || !info.txt) return <p>(No content)</p>
    return <p>{info.txt}</p>
}

