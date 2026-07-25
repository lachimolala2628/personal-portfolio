import { Rnd } from 'react-rnd';
import { useWindowStore } from '../../store/windowStore';
import { windowConfig } from '../../constants/windowConfig';
import WindowControls from './WindowControls';

function Window({ id, children }) {
    const win = useWindowStore((s) => s.windows[id]);
    const focusedWindow = useWindowStore((s) => s.focusedWindow);
    const focusWindow = useWindowStore((s) => s.focusWindow);
    const updatePosition = useWindowStore((s) => s.updatePosition);
    const updateSize = useWindowStore((s) => s.updateSize);

    if (!win || !win.isOpen || win.state === 'minimized') return null;

    const isMaximized = win.state === 'maximized';
    const isActive = focusedWindow === id;
    const title = windowConfig[id].title;

    return (
        <Rnd
            size={isMaximized ? { width: '100%', height: '100%' } : win.size}
            position={isMaximized ? { x: 0, y: 0 } : win.position}
            onDragStop={(e, d) => updatePosition(id, { x: d.x, y: d.y })}
            onResizeStop={(e, dir, ref, delta, pos) => {
                updateSize(id, { width: ref.style.width, height: ref.style.height });
                updatePosition(id, pos);
            }}
            minWidth={280}
            minHeight={200}
            bounds="parent"
            dragHandleClassName="window-titlebar"
            disableDragging={isMaximized}
            enableResizing={!isMaximized}
            style={{ zIndex: win.zIndex }}
            onMouseDown={() => focusWindow(id)}
        >
            <div className="flex flex-col h-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-window)] overflow-hidden shadow-[var(--shadow-window)]">
                <div className="window-titlebar flex items-center justify-between px-3 h-[var(--titlebar-height)] bg-[var(--color-surface-elevated)] cursor-move select-none">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[var(--color-text-primary)] font-medium font-display">
                            {title}
                        </span>
                        {isActive && (
                            <span
                                className="w-2 h-2 rounded-full bg-orange-500"
                                aria-label="Active window"
                            />
                        )}
                    </div>
                    <WindowControls id={id} />
                </div>
                <div className="window-content flex-1 overflow-auto p-4 text-[var(--color-text-primary)]">
                    {children}
                </div>
            </div>
        </Rnd>
    );
}

export default Window;