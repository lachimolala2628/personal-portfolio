import React from 'react'

const Help = () => {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-display text-[var(--color-text-primary)] mb-2">
                    Portfolio Guide
                </h1>
                <p className="text-[var(--color-text-secondary)]">
                    This site is a desktop-style portfolio. Open windows by clicking icons, drag them
                    around, resize, minimize, or maximize — just like a real desktop.
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-display text-[var(--color-text-primary)]">
                    How To Open Windows
                </h2>
                <ul className="flex flex-col gap-2">
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Click the About or Work icons on the desktop.</span>
                    </li>
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Click any icon in the bottom taskbar to open or focus a window.</span>
                    </li>
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Use Search (top left) to type a window name and jump straight to it.</span>
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-display text-[var(--color-text-primary)]">Search</h2>
                <p className="text-[var(--color-text-secondary)]">
                    Click "Search" in the top navbar, type part of a window's name (like "work" or
                    "exp"), and press Enter to open it.
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-display text-[var(--color-text-primary)]">
                    Window Controls
                </h2>
                <p className="text-[var(--color-text-secondary)]">
                    Drag a window by its title bar. Use the buttons in the top-right of each window to
                    minimize, maximize, or close it.
                </p>
            </div>
        </div>
    )
}

export default Help