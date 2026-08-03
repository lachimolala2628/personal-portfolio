import { useRef } from 'react';
import { Rnd } from 'react-rnd';
import { useWindowStore } from '../../store/windowStore';
import { windowConfig } from '../../constants/windowConfig';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useZIndexStore } from '../../store/zIndexStore';
import WindowControls from './WindowControls';

const TITLEBAR_HEIGHT = 40;
const MOBILE_MARGIN = 8;
const NAVBAR_HEIGHT = 48;
const MOBILE_ICON_ROW_TOP = 8;
const MOBILE_ICON_ROW_HEIGHT = 56;
const MOBILE_ICON_ROW_OFFSET = NAVBAR_HEIGHT + MOBILE_ICON_ROW_TOP + MOBILE_ICON_ROW_HEIGHT + MOBILE_ICON_ROW_TOP;
const SCREEN_MARGIN = 20;
const TASKBAR_HEIGHT_MOBILE = 64;
const SCROLL_THRESHOLD = 15;

const Window = ({ id, children }) => {
    const win = useWindowStore((s) => s.windows[id]);
    const focusWindow = useWindowStore((s) => s.focusWindow);
    const restoreWindow = useWindowStore((s) => s.restoreWindow);
    const updatePosition = useWindowStore((s) => s.updatePosition);
    const updateSize = useWindowStore((s) => s.updateSize);
    const setTaskbarVisible = useWindowStore((s) => s.setTaskbarVisible);
    const activeType = useZIndexStore((s) => s.activeType);
    const activeId = useZIndexStore((s) => s.activeId);
    const { isMobile, isTouchDevice, windowWidth, windowHeight } = useIsMobile();

    const lastScrollTop = useRef(0);

    if (!win || !win.isOpen) return null;

    const isMaximized = win.state === 'maximized';
    const isMinimized = win.state === 'minimized';
    const isActive = activeType === 'window' && activeId === id;
    const title = windowConfig[id].title;

    const handleScroll = (e) => {
        if (!isTouchDevice) return;

        const currentScrollTop = e.target.scrollTop;
        const delta = currentScrollTop - lastScrollTop.current;

        if (Math.abs(delta) < SCROLL_THRESHOLD) return;

        if (delta > 0) {
            setTaskbarVisible(false);
        } else {
            setTaskbarVisible(true);
        }

        lastScrollTop.current = currentScrollTop;
    };

    let currentSize;
    let currentPosition;

    if (isMobile) {
        if (isMaximized) {
            currentSize = { width: windowWidth, height: windowHeight - NAVBAR_HEIGHT };
            currentPosition = { x: 0, y: 0 };
        } else {
            currentSize = {
                width: windowWidth - MOBILE_MARGIN * 2,
                height: windowHeight - MOBILE_ICON_ROW_OFFSET - MOBILE_MARGIN,
            };
            currentPosition = { x: MOBILE_MARGIN, y: MOBILE_ICON_ROW_OFFSET };
        }
    } else if (isMaximized) {
        currentSize = { width: '100%', height: '100%' };
        currentPosition = { x: 0, y: 0 };
    } else if (isMinimized) {
        const configuredWidth = parseInt(win.size.width) || win.size.width;
        const maxWidth = windowWidth - SCREEN_MARGIN * 2;
        const clampedWidth = Math.min(configuredWidth, maxWidth);

        const maxX = windowWidth - clampedWidth - SCREEN_MARGIN;
        const clampedX = Math.max(SCREEN_MARGIN, Math.min(win.position.x, maxX));
        const clampedY = Math.max(NAVBAR_HEIGHT + SCREEN_MARGIN, Math.min(win.position.y, windowHeight - TITLEBAR_HEIGHT - SCREEN_MARGIN));

        currentSize = { width: clampedWidth, height: TITLEBAR_HEIGHT };
        currentPosition = { x: clampedX, y: clampedY };
    } else {
        // Desktop/tablet normal state — clamp against actual usable screen size
        const configuredWidth = parseInt(win.size.width) || win.size.width;
        const configuredHeight = parseInt(win.size.height) || win.size.height;

        const usableHeight = windowHeight - NAVBAR_HEIGHT;

        const maxWidth = windowWidth - SCREEN_MARGIN * 2;
        const maxHeight = usableHeight - SCREEN_MARGIN * 2;

        const clampedWidth = Math.min(configuredWidth, maxWidth);
        const clampedHeight = Math.min(configuredHeight, maxHeight);

        const maxX = windowWidth - clampedWidth - SCREEN_MARGIN;
        const maxY = usableHeight - clampedHeight - SCREEN_MARGIN;

        const clampedX = Math.max(SCREEN_MARGIN, Math.min(win.position.x, maxX));
        const clampedY = Math.max(0, Math.min(win.position.y, maxY));

        currentSize = { width: clampedWidth, height: clampedHeight };
        currentPosition = { x: clampedX, y: clampedY };
    }

    return (
        <Rnd
            size={currentSize}
            position={currentPosition}
            onDragStop={(e, d) => {
                if (!isMobile) updatePosition(id, { x: d.x, y: d.y });
            }}
            onResizeStop={(e, dir, ref, delta, pos) => {
                if (!isMobile) {
                    updateSize(id, { width: ref.style.width, height: ref.style.height });
                    updatePosition(id, pos);
                }
            }}
            minWidth={280}
            minHeight={isMinimized ? TITLEBAR_HEIGHT : 200}
            bounds="parent"
            dragHandleClassName="window-titlebar"
            cancel=".window-controls"
            disableDragging={isMobile || isMaximized}
            enableResizing={!isMobile && !isMaximized && !isMinimized}
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
                    <WindowControls id={id} isMobile={isMobile} />
                </div>

                {!isMinimized && (
                    <div
                        className="window-content flex-1 overflow-auto p-4 text-[var(--color-text-primary)]"
                        style={isTouchDevice ? { paddingBottom: TASKBAR_HEIGHT_MOBILE } : undefined}
                        onScroll={handleScroll}
                    >
                        {children}
                    </div>
                )}
            </div>
        </Rnd>
    );
}

export default Window;