import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWindowStore } from '../../store/windowStore';
import { useProjectWindowStore } from '../../store/projectWindowStore';
import { useIsMobile } from '../../hooks/useIsMobile';
import { WINDOW_IDS, windowConfig } from '../../constants/windowConfig';
import { getProjectBySlug } from '../../constants/projectsConfig';

const pathToId = {};
Object.values(WINDOW_IDS).forEach((id) => {
    pathToId[windowConfig[id].path] = id;
});

const RouteSync = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isMobile } = useIsMobile();

    const windows = useWindowStore((s) => s.windows);
    const focusedWindow = useWindowStore((s) => s.focusedWindow);
    const openWindow = useWindowStore((s) => s.openWindow);

    const openProjects = useProjectWindowStore((s) => s.openProjects);
    const openProject = useProjectWindowStore((s) => s.openProject);

    const skipNextUrlUpdate = useRef(false);

    // URL -> Window/Project (handles both fixed windows and /work/:slug)
    useEffect(() => {
        const path = location.pathname;

        if (path.startsWith('/work/')) {
            const slug = path.replace('/work/', '');
            const project = getProjectBySlug(slug);
            if (project && !openProjects[slug]) {
                openProject(slug);
            }
            if (!windows[WINDOW_IDS.WORK].isOpen) {
                skipNextUrlUpdate.current = true;
                openWindow(WINDOW_IDS.WORK, isMobile);
            }
            return;
        }

        const id = pathToId[path];
        if (id && !windows[id].isOpen) {
            skipNextUrlUpdate.current = true;
            openWindow(id, isMobile);
        }
    }, [location.pathname]);

    // Window focus -> URL (unchanged logic, fixed windows only)
    useEffect(() => {
        if (skipNextUrlUpdate.current) {
            skipNextUrlUpdate.current = false;
            return;
        }
        if (focusedWindow) {
            const path = windowConfig[focusedWindow].path;
            if (location.pathname !== path && !location.pathname.startsWith('/work/')) {
                navigate(path);
            }
        } else if (location.pathname !== '/') {
            navigate('/');
        }
    }, [focusedWindow]);

    return null;
}

export default RouteSync;