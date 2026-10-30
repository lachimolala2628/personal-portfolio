import { useState, useRef, useEffect, useReducer } from 'react';

const COLS = 20;
const ROWS = 14;
const POINTS_PER_FOOD = 10;
const SPEEDUP_PER_FOOD = 2;
const TERMINAL_FONT =
    "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const LEVELS = {
    easy: { label: 'Easy', base: 170, min: 100, wrap: true },
    medium: { label: 'Medium', base: 130, min: 80, wrap: false },
    hard: { label: 'Hard', base: 90, min: 55, wrap: false },
};

const DIRS = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
};

// Food glyph is written with unicode escapes so it can't be mangled when pasted.
const GLYPH = { head: '@@', body: 'oo', food: '\u003c\u003e', empty: '  ' };
const CELL_CLASS = {
    head: 'text-[var(--color-accent)]',
    body: 'text-[var(--color-accent)] opacity-70',
    food: 'text-[#ff8a80]',
    empty: '',
};
const WALL_CLASS = 'text-[#6b655c]';

const intervalFor = (level, eaten) =>
    Math.max(LEVELS[level].min, LEVELS[level].base - eaten * SPEEDUP_PER_FOOD);

const placeFood = (snake) => {
    const taken = new Set(snake.map((s) => `${s.x},${s.y}`));
    const free = [];
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            if (!taken.has(`${x},${y}`)) free.push({ x, y });
        }
    }
    if (free.length === 0) return null;
    return free[Math.floor(Math.random() * free.length)];
};

const createGame = () => {
    const midY = Math.floor(ROWS / 2);
    const snake = [
        { x: 4, y: midY },
        { x: 3, y: midY },
        { x: 2, y: midY },
    ]; // head first
    return {
        snake,
        dir: { x: 1, y: 0 },
        food: placeFood(snake),
        score: 0,
        eaten: 0,
        status: 'ready', // ready | running | paused | over | won
    };
};

const stepGame = (g, queued, level) => {
    const dir = queued || g.dir;
    const head = g.snake[0];
    let nx = head.x + dir.x;
    let ny = head.y + dir.y;

    if (LEVELS[level].wrap) {
        nx = (nx + COLS) % COLS;
        ny = (ny + ROWS) % ROWS;
    } else if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) {
        return { ...g, dir, status: 'over' };
    }

    const ate = g.food !== null && nx === g.food.x && ny === g.food.y;
    // When not eating, the tail moves away, so it is safe to step onto it.
    const body = ate ? g.snake : g.snake.slice(0, -1);
    if (body.some((s) => s.x === nx && s.y === ny)) {
        return { ...g, dir, status: 'over' };
    }

    const snake = [{ x: nx, y: ny }, ...body];
    const food = ate ? placeFood(snake) : g.food;

    return {
        snake,
        dir,
        food,
        score: ate ? g.score + POINTS_PER_FOOD : g.score,
        eaten: ate ? g.eaten + 1 : g.eaten,
        status: food === null ? 'won' : 'running',
    };
};

const PadButton = ({ label, onPress }) => (
    <button
        type="button"
        onClick={onPress}
        className="w-10 h-10 border border-[#4a463f] rounded text-[#f2ede4] touch-manipulation active:bg-[#2a2723]"
    >
        {label}
    </button>
);

const SnakeGame = ({ level, onExit }) => {
    const config = LEVELS[level];
    const bestKey = `snake-best-${level}`;

    const gameRef = useRef(null);
    const queueRef = useRef([]);
    const bestRef = useRef(null);
    const containerRef = useRef(null);
    const [version, bump] = useReducer((n) => n + 1, 0);
    const [coarse] = useState(
        () => typeof window !== 'undefined' && Boolean(window.matchMedia?.('(pointer: coarse)').matches)
    );

    if (gameRef.current === null) gameRef.current = createGame();
    if (bestRef.current === null) {
        try {
            bestRef.current = Number(localStorage.getItem(bestKey)) || 0;
        } catch {
            bestRef.current = 0;
        }
    }

    // Game loop: re-armed after every state change so speed-ups apply immediately.
    useEffect(() => {
        if (gameRef.current.status !== 'running') return undefined;

        const id = setTimeout(() => {
            const queued = queueRef.current.shift() || null;
            const next = stepGame(gameRef.current, queued, level);
            gameRef.current = next;

            if (next.score > bestRef.current) {
                bestRef.current = next.score;
                try {
                    localStorage.setItem(bestKey, String(next.score));
                } catch {
                    /* ignore storage errors */
                }
            }
            bump();
        }, intervalFor(level, gameRef.current.eaten));

        return () => clearTimeout(id);
    }, [version, level, bestKey]);

    useEffect(() => {
        containerRef.current?.focus({ preventScroll: true });
    }, []);

    const steer = (dir) => {
        const g = gameRef.current;
        if (g.status === 'over' || g.status === 'won') return;

        const queue = queueRef.current;
        const lastDir = queue.length ? queue[queue.length - 1] : g.dir;
        if (dir.x === -lastDir.x && dir.y === -lastDir.y) return; // no 180 turns
        if (queue.length < 2 && !(dir.x === lastDir.x && dir.y === lastDir.y)) {
            queue.push(dir);
        }
        if (g.status === 'ready') {
            gameRef.current = { ...g, status: 'running' };
            bump();
        }
    };

    const togglePause = () => {
        const g = gameRef.current;
        if (g.status === 'running') {
            gameRef.current = { ...g, status: 'paused' };
            bump();
        } else if (g.status === 'paused') {
            gameRef.current = { ...g, status: 'running' };
            bump();
        }
    };

    const restart = () => {
        gameRef.current = createGame();
        queueRef.current = [];
        bump();
    };

    const handleKeyDown = (e) => {
        if (e.ctrlKey || e.metaKey || e.altKey) return; // keep browser shortcuts working

        if (DIRS[e.key]) {
            e.preventDefault();
            steer(DIRS[e.key]);
            return;
        }

        const k = e.key.toLowerCase();
        if (k === 'p') {
            e.preventDefault();
            togglePause();
        } else if (k === 'r') {
            e.preventDefault();
            restart();
        } else if (k === 'q' || e.key === 'Escape') {
            e.preventDefault();
            onExit();
        }
    };

    const handleBlur = (e) => {
        if (coarse) return;
        if (e.currentTarget.contains(e.relatedTarget)) return;
        const g = gameRef.current;
        if (g.status === 'running') {
            gameRef.current = { ...g, status: 'paused' };
            bump();
        }
    };

    const g = gameRef.current;
    const speed = (1000 / intervalFor(level, g.eaten)).toFixed(1);

    const cells = new Map();
    g.snake.forEach((s, i) => cells.set(`${s.x},${s.y}`, i === 0 ? 'head' : 'body'));
    if (g.food) cells.set(`${g.food.x},${g.food.y}`, 'food');

    const border = `+${'-'.repeat(COLS * 2)}+`;

    const statusText = {
        ready: 'Press an arrow key to start.',
        running: '\u00a0',
        paused: 'Paused. Press P to continue.',
        over: `Game over! Score ${g.score}. Press R to restart or Q to quit.`,
        won: 'You filled the whole board! Press R to restart or Q to quit.',
    }[g.status];

    return (
        <div
            ref={containerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onClick={() => containerRef.current?.focus({ preventScroll: true })}
            className="h-full min-h-0 overflow-auto p-3 outline-none text-[11px] md:text-[13px] leading-[1.2]"
            style={{ fontFamily: TERMINAL_FONT }}
        >
            <div className="whitespace-pre-wrap text-[#cfc9be]">
                Controls: Arrow Keys move | P pause/resume | R restart | Q or Esc quit
            </div>
            <div className="whitespace-pre-wrap text-[#f2ede4]">
                {`Difficulty ${config.label} | Score ${g.score} | Best ${bestRef.current} | Length ${g.snake.length} | Speed ${speed}/s`}
            </div>

            <div className={`whitespace-pre mt-1 ${WALL_CLASS}`}>{border}</div>
            {Array.from({ length: ROWS }, (_, y) => (
                <div key={y} className="whitespace-pre">
                    <span className={WALL_CLASS}>|</span>
                    {Array.from({ length: COLS }, (_, x) => {
                        const kind = cells.get(`${x},${y}`) || 'empty';
                        return (
                            <span key={x} className={CELL_CLASS[kind]}>
                                {GLYPH[kind]}
                            </span>
                        );
                    })}
                    <span className={WALL_CLASS}>|</span>
                </div>
            ))}
            <div className={`whitespace-pre ${WALL_CLASS}`}>{border}</div>

            <div className="mt-1 whitespace-pre-wrap text-[#cfc9be]">{statusText}</div>

            {coarse && (
                <div className="mt-3 flex flex-col items-center gap-1 select-none">
                    <PadButton label="↑" onPress={() => steer(DIRS.ArrowUp)} />
                    <div className="flex gap-1">
                        <PadButton label="←" onPress={() => steer(DIRS.ArrowLeft)} />
                        <PadButton label="↓" onPress={() => steer(DIRS.ArrowDown)} />
                        <PadButton label="→" onPress={() => steer(DIRS.ArrowRight)} />
                    </div>
                    <div className="flex gap-1 mt-1">
                        <PadButton label="P" onPress={togglePause} />
                        <PadButton label="R" onPress={restart} />
                        <PadButton label="Q" onPress={onExit} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SnakeGame;