import { Rnd } from 'react-rnd';
import { useWindowStore } from '../../store/windowStore';
import { windowConfig } from '../../constants/windowConfig';
import WindowControls from './WindowControls';

const TITLEBAR_HEIGHT = 40;

function Window({ id, children }) {
    const win = useWindowStore((s) => s.windows[id]);
    const focusedWindow = useWindowStore((s) => s.focusedWindow);
    const focusWindow = useWindowStore((s) => s.focusWindow);
    const restoreWindow = useWindowStore((s) => s.restoreWindow);
    const updatePosition = useWindowStore((s) => s.updatePosition);
    const updateSize = useWindowStore((s) => s.updateSize);

    if (!win || !win.isOpen) return null; // only fully removed when CLOSED, not minimized

    const isMaximized = win.state === 'maximized';
    const isMinimized = win.state === 'minimized';
    const isActive = focusedWindow === id;
    const title = windowConfig[id].title;

    const handleTitleBarClick = () => {
        if (isMinimized) {
            restoreWindow(id); // clicking a collapsed title bar expands it back
        } else {
            focusWindow(id);
        }
    };

    // When minimized, only the title bar height shows — content is hidden
    const currentSize = isMaximized
        ? { width: '100%', height: '100%' }
        : isMinimized
            ? { width: win.size.width, height: TITLEBAR_HEIGHT }
            : win.size;

    const currentPosition = isMaximized ? { x: 0, y: 0 } : win.position;

    return (
        <Rnd
            size={currentSize}
            position={currentPosition}
            onDragStop={(e, d) => updatePosition(id, { x: d.x, y: d.y })}
            onResizeStop={(e, dir, ref, delta, pos) => {
                updateSize(id, { width: ref.style.width, height: ref.style.height });
                updatePosition(id, pos);
            }}
            minWidth={280}
            minHeight={isMinimized ? TITLEBAR_HEIGHT : 200}
            bounds="parent"
            dragHandleClassName="window-titlebar"
            disableDragging={isMaximized}
            enableResizing={!isMaximized && !isMinimized}
            style={{ zIndex: win.zIndex }}
            onMouseDown={() => focusWindow(id)}
        >
            <div className="flex flex-col h-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-window)] overflow-hidden shadow-[var(--shadow-window)]">
                <div className="window-titlebar flex items-center justify-between px-3 h-[var(--titlebar-height)] bg-[var(--color-surface-elevated)] cursor-move select-none shrink-0">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[var(--color-text-primary)] font-medium font-display">
                            {title}
                        </span>
                        {isActive && (
                            <span className="w-2 h-2 rounded-full bg-orange-500" aria-label="Active window" />
                        )}
                    </div>
                    <WindowControls id={id} />
                </div>

                {!isMinimized && (
                    <div className="window-content flex-1 overflow-auto p-4 text-[var(--color-text-primary)]">
                        {children}
                    </div>
                )}
            </div>
        </Rnd>
    );
}

export default Window;