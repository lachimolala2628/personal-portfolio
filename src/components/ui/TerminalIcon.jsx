import React from 'react'

const TerminalIcon = () => {
    return (
        <div className="w-12 h-10 rounded-md bg-[#1b1b1b] border border-[var(--color-border)] shadow-md flex items-center justify-center">
            <span className="font-mono text-sm leading-none text-[var(--color-accent)]">&gt;_</span>
        </div>
    )
}

export default TerminalIcon