import React from 'react'

const FileIcon = () => {
    return (
        <div className="relative w-9 h-11">
            <div className="w-full h-full bg-[#f5f0e8] border border-[var(--color-border)] rounded-sm shadow-md relative overflow-hidden">
                <span
                    className="absolute top-0 right-0 w-3 h-3 bg-[var(--color-accent)]"
                    style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                />
            </div>
        </div>
    )
}

export default FileIcon