const SOUND_URL = '/sounds/pop.mp3';
const VOLUME = 0.6; // 0 to 1

let audio = null;

export const preloadUnlockSound = () => {
    if (audio) return;
    audio = new Audio(SOUND_URL);
    audio.preload = 'auto';
    audio.volume = VOLUME;
};

export const playUnlockSound = () => {
    preloadUnlockSound();
    audio.currentTime = 0;
    audio.play().catch(() => { });
};