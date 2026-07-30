import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWindowStore } from '../../store/windowStore';
import { WINDOW_IDS, windowConfig } from '../../constants/windowConfig';

const pathToId = {};
Object.values(WINDOW_IDS).forEach((id) => {
    pathToId[windowConfig[id].path] = id;
});

const RouteSync = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const windows = useWindowStore((s) => s.windows);
    const focusedWindow = useWindowStore((s) => s.focusedWindow);
    const openWindow = useWindowStore((s) => s.openWindow);

    const skipNextUrlUpdate = useRef(false);

    useEffect(() => {
        const id = pathToId[location.pathname];
        if (id && !windows[id].isOpen) {
            skipNextUrlUpdate.current = true;
            openWindow(id);
        }
    }, [location.pathname]);

    useEffect(() => {
        if (skipNextUrlUpdate.current) {
            skipNextUrlUpdate.current = false;
            return;
        }
        if (focusedWindow) {
            const path = windowConfig[focusedWindow].path;
            if (location.pathname !== path) {
                navigate(path);
            }
        }
    }, [focusedWindow]);

    return null; 
}

export default RouteSync;