import React from 'react'

const FolderIcon = () => {
    return (
        <div className="relative w-12 h-10">
            <span className="absolute top-0 left-1 w-5 h-2 bg-[var(--color-accent)] rounded-t-sm opacity-90" />
            <span className="absolute top-1.5 left-0 w-12 h-8 bg-[var(--color-accent)] rounded-sm shadow-md" />
        </div>
    )
}

export default FolderIcon