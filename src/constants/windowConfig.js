export const WINDOW_IDS = {
    ABOUT: 'about',
    WORK: 'work',
    EXPERIENCE: 'experience',
    CONTACT: 'contact',
    SETTINGS: 'settings',
    HELP: 'help',
};

export const windowConfig = {
    [WINDOW_IDS.ABOUT]: {
        title: 'About',
        path:'/about',
        defaultSize: { width: 500, height: 590 },
        defaultPosition: { x: 550, y: 10 },
    },
    [WINDOW_IDS.WORK]: {
        title: 'Work',
        path:'/work',
        defaultSize: { width: 1000, height: 590 },
        defaultPosition: { x: 180, y: 10 },
    },
    [WINDOW_IDS.EXPERIENCE]: {
        title: 'Experience',
        path:'/experience',
        defaultSize: { width: 920, height: 590 },
        defaultPosition: { x: 260, y: 10 },
    },
    [WINDOW_IDS.CONTACT]: {
        title: 'Contact',
        path:'/contact',
        defaultSize: { width: 500, height: 590 },
        defaultPosition: { x: 350, y: 10 },
    },
    [WINDOW_IDS.SETTINGS]: {
        title: 'Settings',
        path:'/settings',
        defaultSize: { width: 950, height: 590 },
        defaultPosition: { x: 420, y: 10 },
    },
    [WINDOW_IDS.HELP]: {
        title: 'Help',
        path:'/help',
        defaultSize: { width: 920, height: 590 },
        defaultPosition: { x: 290, y: 10 },
    },
};