import { useWindowStore } from '../../store/windowStore';
import { RxCross2 } from "react-icons/rx";
import { BsDash } from "react-icons/bs";
import { IoIosSquareOutline } from "react-icons/io";

const WindowControls = ({ id, isMobile }) => {
    const win = useWindowStore((s) => s.windows[id]);
    const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
    const restoreWindow = useWindowStore((s) => s.restoreWindow);
    const toggleMaximize = useWindowStore((s) => s.toggleMaximize);
    const closeWindow = useWindowStore((s) => s.closeWindow);

    const isMinimized = win.state === 'minimized';

    const handleClick = (e, action) => {
        e.stopPropagation();
        action(id);
    };

    const handleMinimizeToggle = (e) => {
        e.stopPropagation();
        if (isMinimized) {
            restoreWindow(id);
        } else {
            minimizeWindow(id);
        }
    };

    const buttonBase =
        'w-7 h-7 flex items-center justify-center border border-[var(--color-border)] transition hover:brightness-110 text-[var(--color-text-primary)] text-sm';

    return (
        <div className="window-controls flex items-center gap-1">
            {!isMobile && (
                <button
                    onClick={handleMinimizeToggle}
                    className={`${buttonBase} bg-[var(--color-bg)]`}
                    aria-label={isMinimized ? 'Expand' : 'Minimize'}
                >
                    <BsDash />
                </button>
            )}
            <button
                onClick={(e) => handleClick(e, toggleMaximize)}
                className={`${buttonBase} bg-[var(--color-bg)]`}
                aria-label="Maximize"
            >
                <IoIosSquareOutline />
            </button>
            <button
                onClick={(e) => handleClick(e, closeWindow)}
                className={`${buttonBase} bg-[var(--color-bg)]`}
                aria-label="Close"
            >
                <RxCross2 />
            </button>
        </div>
    );
}

export default WindowControls;