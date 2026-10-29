import { useState, useRef, useEffect } from 'react';
import { useWindowStore } from '../store/windowStore';
import { useProjectWindowStore } from '../store/projectWindowStore';
import { useZIndexStore } from '../store/zIndexStore';
import { useIsMobile } from '../hooks/useIsMobile';
import { WINDOW_IDS, windowConfig } from '../constants/windowConfig';
import { getProjectBySlug } from '../constants/projectsConfig';

const PROMPT = 'guest@ayush:~$';
const DIFFICULTIES = ['easy', 'medium', 'hard'];
const TERMINAL_FONT =
    "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const COMMANDS = [
    { name: 'apps', usage: 'apps', description: 'list all available apps you can open' },
    { name: 'clear', usage: 'clear', description: 'clear the terminal' },
    { name: 'close', usage: 'close <app name>', description: 'close an app window' },
    { name: 'date', usage: 'date', description: 'show the current date' },
    { name: 'game', usage: 'game [easy|medium|hard]', description: 'start terminal snake and choose a difficulty' },
    { name: 'help', usage: 'help', description: 'list every available command' },
    { name: 'history', usage: 'history', description: 'show recently executed commands' },
    { name: 'ls', usage: 'ls [apps|commands|open]', description: 'list terminal resources' },
    { name: 'open', usage: 'open <app name>', description: 'open an app window' },
    { name: 'time', usage: 'time', description: 'show the current time' },
];

const APP_IDS = Object.values(WINDOW_IDS);
const appTitle = (id) => windowConfig[id].title;

const findApp = (query) => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return (
        APP_IDS.find((id) => appTitle(id).toLowerCase() === q) ||
        APP_IDS.find((id) => appTitle(id).toLowerCase().startsWith(q)) ||
        null
    );
};

const out = (text) => ({ type: 'output', text });
const err = (text) => ({ type: 'error', text });

const lineClass = (type) => {
    if (type === 'input') return 'text-[#f2ede4]';
    if (type === 'error') return 'text-[#ff8a80]';
    return 'text-[#cfc9be]';
};

const Terminal = () => {
    const windows = useWindowStore((s) => s.windows);
    const openWindow = useWindowStore((s) => s.openWindow);
    const closeWindow = useWindowStore((s) => s.closeWindow);
    const openProjects = useProjectWindowStore((s) => s.openProjects);
    const activeType = useZIndexStore((s) => s.activeType);
    const activeId = useZIndexStore((s) => s.activeId);
    const { isMobile } = useIsMobile();

    const isActive = activeType === 'window' && activeId === WINDOW_IDS.TERMINAL;

    const [lines, setLines] = useState([
        out('Welcome to the Ayush OS terminal.'),
        out("Type 'help' to see available commands."),
    ]);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [lines]);

    useEffect(() => {
        if (isActive && !isMobile) inputRef.current?.focus();
    }, [isActive, isMobile]);

    const runCommand = (raw) => {
        const trimmed = raw.trim();
        const echo = { type: 'input', text: raw };

        if (!trimmed) {
            setLines((prev) => [...prev, echo]);
            return;
        }

        const allHistory = [...history, trimmed];
        setHistory(allHistory);
        setHistoryIndex(-1);

        const [cmd, ...args] = trimmed.split(/\s+/);
        const name = cmd.toLowerCase();
        const argText = args.join(' ');
        let result = [];

        switch (name) {
            case 'clear':
                setLines([]);
                return;

            case 'help':
                result = COMMANDS.map((c) => out(`${c.usage.padEnd(26)}${c.description}`));
                break;

            case 'apps':
                result = [out(APP_IDS.map((id) => appTitle(id).toLowerCase()).join('   '))];
                break;

            case 'date':
                result = [
                    out(
                        new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })
                    ),
                ];
                break;

            case 'time':
                result = [out(new Date().toLocaleTimeString('en-US'))];
                break;

            case 'history': {
                const recent = allHistory.slice(-10);
                const start = allHistory.length - recent.length;
                result = recent.map((c, i) => out(`${String(start + i + 1).padStart(3)}  ${c}`));
                break;
            }

            case 'open': {
                if (!argText) {
                    result = [err('usage: open <app name>')];
                    break;
                }
                const id = findApp(argText);
                if (!id) {
                    result = [err(`open: app not found: ${argText}. Try 'apps' to see what's available.`)];
                    break;
                }
                openWindow(id, isMobile);
                result = [out(`opening ${appTitle(id).toLowerCase()}...`)];
                break;
            }

            case 'close': {
                if (!argText) {
                    result = [err('usage: close <app name>')];
                    break;
                }
                const id = findApp(argText);
                if (!id) {
                    result = [err(`close: app not found: ${argText}. Try 'apps' to see what's available.`)];
                    break;
                }
                if (!windows[id]?.isOpen) {
                    result = [err(`close: ${appTitle(id).toLowerCase()} is not open.`)];
                    break;
                }
                closeWindow(id);
                result = [out(`closed ${appTitle(id).toLowerCase()}.`)];
                break;
            }

            case 'game': {
                const level = (args[0] || 'medium').toLowerCase();
                if (!DIFFICULTIES.includes(level)) {
                    result = [err(`game: unknown difficulty '${args[0]}'. Use easy, medium, or hard.`)];
                    break;
                }
                result = [out(`snake (${level}) is coming in the next update.`)];
                break;
            }

            case 'ls': {
                const target = (args[0] || '').toLowerCase();
                if (target === 'apps') {
                    result = [out(APP_IDS.map((id) => appTitle(id).toLowerCase()).join('   '))];
                } else if (target === 'commands') {
                    result = [out(COMMANDS.map((c) => c.name).join('   '))];
                } else if (target === 'open') {
                    const openApps = APP_IDS.filter((id) => windows[id]?.isOpen).map((id) =>
                        appTitle(id).toLowerCase()
                    );
                    const openProjectNames = Object.keys(openProjects)
                        .map((slug) => getProjectBySlug(slug)?.name)
                        .filter(Boolean)
                        .map((n) => n.toLowerCase());
                    const all = [...openApps, ...openProjectNames];
                    result = [out(all.length ? all.join('   ') : '(nothing open)')];
                } else if (!target) {
                    result = [err('usage: ls [apps|commands|open]')];
                } else {
                    result = [err(`ls: unknown option '${args[0]}'. Use apps, commands, or open.`)];
                }
                break;
            }

            default:
                result = [err(`${name}: command not found. Type 'help' for a list of commands.`)];
        }

        setLines((prev) => [...prev, echo, ...result]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            runCommand(input);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length === 0) return;
            const next = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
            setHistoryIndex(next);
            setInput(history[next]);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex === -1) return;
            const next = historyIndex + 1;
            if (next >= history.length) {
                setHistoryIndex(-1);
                setInput('');
            } else {
                setHistoryIndex(next);
                setInput(history[next]);
            }
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            setLines([]);
        }
    };

    return (
        <div
            className="h-full flex flex-col text-[16px] md:text-[13px] leading-relaxed"
            style={{ fontFamily: TERMINAL_FONT }}
            onClick={() => {
                if (window.getSelection()?.toString()) return;
                inputRef.current?.focus();
            }}
        >
            <div
                ref={scrollRef}
                className="window-content flex-1 min-h-0 overflow-auto p-3"
                data-active={isActive}
            >
                {lines.map((line, i) => (
                    <div key={i} className={`whitespace-pre-wrap break-words ${lineClass(line.type)}`}>
                        {line.type === 'input' ? (
                            <>
                                <span className="text-[var(--color-accent)]">{PROMPT}</span> {line.text}
                            </>
                        ) : (
                            line.text
                        )}
                    </div>
                ))}

                <div className="flex items-center gap-2">
                    <span className="shrink-0 text-[var(--color-accent)]">{PROMPT}</span>
                    <input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck={false}
                        aria-label="Terminal input"
                        className="flex-1 min-w-0 bg-transparent outline-none border-none p-0"
                        style={{ font: 'inherit', color: '#f2ede4', caretColor: 'var(--color-accent)' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Terminal;