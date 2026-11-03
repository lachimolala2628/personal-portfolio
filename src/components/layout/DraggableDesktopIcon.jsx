import { useRef } from 'react';
import { Rnd } from 'react-rnd';

const ICON_W = 80;
const ICON_H = 80;
const CLICK_TOLERANCE = 5;

const DraggableDesktopIcon = ({ item, position, bounds, onOpen, onMove }) => {
    const downPoint = useRef(null);
    const IconComponent = item.icon;

    // Keep the icon inside the visible desktop, even if the window was resized.
    const x = Math.max(0, Math.min(position.x, bounds.width - ICON_W));
    const y = Math.max(0, Math.min(position.y, bounds.height - ICON_H));

    const handleClick = (e) => {
        const start = downPoint.current;
        downPoint.current = null;
        // e.detail === 0 means the click came from the keyboard (Enter or Space).
        if (e.detail !== 0 && start) {
            const moved = Math.hypot(e.clientX - start.x, e.clientY - start.y);
            if (moved > CLICK_TOLERANCE) return; // it was a drag, not a click
        }
        onOpen();
    };

    return (
        <Rnd
            size={{ width: ICON_W, height: ICON_H }}
            position={{ x, y }}
            enableResizing={false}
            bounds="parent"
            onDragStop={(e, d) => onMove({ x: d.x, y: d.y })}
            style={{ zIndex: 1 }}
        >
            <button
                type="button"
                onPointerDown={(e) => {
                    downPoint.current = { x: e.clientX, y: e.clientY };
                }}
                onClick={handleClick}
                className="w-full h-full flex flex-col items-center gap-1 group select-none cursor-pointer"
            >
                <div className="group-hover:brightness-110 transition pointer-events-none">
                    <IconComponent />
                </div>
                <span className="text-xs text-white drop-shadow pointer-events-none">{item.label}</span>
            </button>
        </Rnd>
    );
};

export default DraggableDesktopIcon;