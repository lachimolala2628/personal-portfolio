import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

export const useIsMobile = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        isMobile: windowWidth < MOBILE_BREAKPOINT,
        windowWidth,
        windowHeight,
    };
}