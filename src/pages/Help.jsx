import react from 'react';

const terminalCommands = [
    ['help', 'list every available command'],
    ['apps', 'list all apps you can open'],
    ['open <app>', 'open an app window'],
    ['close <app>', 'close an app window'],
    ['ls [apps|commands|open]', 'list terminal resources'],
    ['game [easy|medium|hard]', 'play snake in the terminal'],
    ['history', 'show recently executed commands'],
    ['date  /  time', 'show the current date or time'],
    ['clear', 'clear the terminal'],
];

const Help = () => {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-display text-[var(--color-text-primary)] mb-2">
                    Portfolio Guide
                </h1>
                <p className="text-[var(--color-text-secondary)]">
                    Experience this site as an interactive desktop environment. Launch windows via desktop
                    icons or the taskbar, then drag, resize, or organize your workspace freely.
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-display text-[var(--color-text-primary)]">Opening Windows</h2>
                <ul className="flex flex-col gap-2">
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Desktop Icons: Click Resume, Work, or Terminal directly on the screen to open them.</span>
                    </li>
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Taskbar: Click any application icon in the bottom bar to open or bring a window into focus.</span>
                    </li>
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Global Search: Use the search bar in the top-left to quickly locate and launch any section.</span>
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-display text-[var(--color-text-primary)]">Quick Search</h2>
                <p className="text-[var(--color-text-secondary)]">
                    Click Search in the top navigation bar, type a keyword (e.g., "work", "experience"),
                    and press Enter to instantly open the corresponding window.
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-display text-[var(--color-text-primary)]">Window Controls</h2>
                <ul className="flex flex-col gap-2">
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Move: Drag any window by its header title bar.</span>
                    </li>
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Manage: Use the controls in the top-right corner of any window to minimize, maximize, or close it.</span>
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-3">
                <h2 className="text-lg font-display text-[var(--color-text-primary)]">Terminal</h2>
                <p className="text-[var(--color-text-secondary)]">
                    Open the Terminal icon on the desktop and type commands to control the site. Start with
                    help to see everything available.
                </p>

                <div className="border border-[var(--color-border)] rounded-md overflow-hidden">
                    <div className="flex flex-col divide-y divide-[var(--color-border)]">
                        {terminalCommands.map(([command, description]) => (
                            <div
                                key={command}
                                className="px-3 py-2 flex flex-col gap-0.5 sm:flex-row sm:gap-4"
                            >
                                <code className="text-xs text-[var(--color-accent)] sm:w-52 sm:shrink-0">
                                    {command}
                                </code>
                                <span className="text-sm text-[var(--color-text-secondary)]">{description}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <ul className="flex flex-col gap-2">
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Press Tab to autocomplete commands and app names, and the Up and Down arrows to browse earlier commands.</span>
                    </li>
                    <li className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        <span>Snake game: use the arrow keys to move, P to pause, R to restart, and Q or Esc to quit. On easy, the walls wrap around.</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Help;