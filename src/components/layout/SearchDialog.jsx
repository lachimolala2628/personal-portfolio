import { useState, useRef, useEffect } from 'react';
import { useWindowStore } from '../../store/windowStore';
import { WINDOW_IDS, windowConfig } from '../../constants/windowConfig';

const SEARCH_DELAY = 1400;

const SearchDialog = ({ onClose }) => {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const inputRef = useRef(null);
    const openWindow = useWindowStore((s) => s.openWindow);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const findMatch = (text) => {
        const normalized = text.trim().toLowerCase();
        if (!normalized) return null;

        const matchId = Object.values(WINDOW_IDS).find((id) =>
            windowConfig[id].title.toLowerCase().includes(normalized)
        );
        return matchId || null;
    };

    const runSearch = () => {
        const matchId = findMatch(query);

        if (!matchId) {
            setNotFound(true);
            return;
        }

        setNotFound(false);
        setIsSearching(true);

        setTimeout(() => {
            openWindow(matchId);
            onClose();
        }, SEARCH_DELAY);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') runSearch();
        if (e.key === 'Escape') onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[99998] flex items-start justify-center pt-24 bg-black/40"
            onClick={onClose}
        >
            <div
                className="w-96 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md shadow-[var(--shadow-window)] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Title bar */}
                <div className="flex items-center justify-between px-4 h-[var(--titlebar-height)] bg-[var(--color-surface-elevated)]">
                    <span className="text-sm font-display text-[var(--color-text-primary)]">Search</span>
                    <button
                        onClick={onClose}
                        className="w-7 h-7 flex items-center justify-center border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-primary)] hover:brightness-110 transition"
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 flex flex-col gap-3">
                    <p className="text-sm text-[var(--color-text-secondary)]">
                        What do you want to know or go to? Type a window name below.
                    </p>

                    <div className="relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setNotFound(false);
                            }}
                            onKeyDown={handleKeyDown}
                            disabled={isSearching}
                            placeholder="e.g. work, about, contact"
                            className="w-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded px-3 py-2 pr-12 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)]"
                        />
                        <button
                            onClick={runSearch}
                            disabled={isSearching}
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[var(--color-accent)] text-[var(--color-bg)] rounded hover:brightness-110 transition disabled:opacity-50"
                            aria-label="Search"
                        >
                            &crarr;
                        </button>
                    </div>

                    {isSearching && (
                        <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                            <span className="w-3 h-3 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
                            Searching...
                        </div>
                    )}

                    {notFound && !isSearching && (
                        <p className="text-xs text-[var(--color-text-secondary)]">
                            No window found for "{query}". Try: about, work, experience, contact, settings, help.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchDialog;