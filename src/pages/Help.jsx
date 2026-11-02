import React from 'react'

const searchExamples = ['work', 'exp', 'contact', 'resume', 'terminal'];
const cliStarters = ['help', 'apps', 'open <app>', 'close <app>', 'ls open', 'game hard'];

const Help = () => {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-display text-[var(--color-text-primary)] mb-2">
                    Portfolio Guide
                </h1>
                <p className="text-[var(--color-text-secondary)]">
                    This site is a desktop-style portfolio. Open apps in draggable windows, jump to any
                    window with Search, and control the whole site through commands in Terminal.
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-display text-[var(--color-text-primary)]">How To Open Apps</h2>
                <ul className="flex flex-col gap-2">
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Click the icons on the desktop (Resume, Work, Terminal) or in the bottom app bar to open or focus a window.</span>
                    </li>
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Use Search in the top bar to type what you want and let the site open the matching window for you.</span>
                    </li>
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Use Terminal with commands like open and close for command-line control.</span>
                    </li>
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Drag a window by its title bar, and use the buttons in its top-right corner to minimize, maximize, or close it.</span>
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-display text-[var(--color-text-primary)]">Quick Search</h2>
                <p className="text-[var(--color-text-secondary)]">
                    Click Search in the top navigation bar, type part of a window's name, and press Enter
                    to open it. Partial words work, so "exp" finds Experience.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-[var(--color-text-secondary)]">Try:</span>
                    {searchExamples.map((q) => (
                        <code
                            key={q}
                            className="px-2 py-1 border border-[var(--color-border)] rounded text-xs text-[var(--color-accent)]"
                        >
                            {q}
                        </code>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-display text-[var(--color-text-primary)]">CLI Quick Start</h2>
                <p className="text-[var(--color-text-secondary)]">
                    Open the Terminal app and run commands. Good starters:
                </p>
                <div className="flex flex-wrap gap-2">
                    {cliStarters.map((c) => (
                        <code
                            key={c}
                            className="px-2 py-1 border border-[var(--color-border)] rounded text-xs text-[var(--color-accent)]"
                        >
                            {c}
                        </code>
                    ))}
                </div>
                <p className="text-sm text-[var(--color-text-secondary)]">
                    Press Tab to autocomplete, and the Up and Down arrows to bring back earlier commands.
                    Type game to play a round of snake.
                </p>
            </div>
        </div>
    );
};

export default Help;