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
        defaultSize: { width: 500, height: 450 },
        defaultPosition: { x: 100, y: 80 },
    },
    [WINDOW_IDS.WORK]: {
        title: 'Work',
        defaultSize: { width: 650, height: 500 },
        defaultPosition: { x: 180, y: 100 },
    },
    [WINDOW_IDS.EXPERIENCE]: {
        title: 'Experience',
        defaultSize: { width: 550, height: 450 },
        defaultPosition: { x: 260, y: 120 },
    },
    [WINDOW_IDS.CONTACT]: {
        title: 'Contact',
        defaultSize: { width: 450, height: 400 },
        defaultPosition: { x: 340, y: 140 },
    },
    [WINDOW_IDS.SETTINGS]: {
        title: 'Settings',
        defaultSize: { width: 400, height: 350 },
        defaultPosition: { x: 420, y: 160 },
    },
    [WINDOW_IDS.HELP]: {
        title: 'Help',
        defaultSize: { width: 420, height: 380 },
        defaultPosition: { x: 500, y: 180 },
    },
};