let ctx = null;

const getContext = () => {
    if (!ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return null;
        ctx = new AudioCtx();
    }
    return ctx;
};

const playNote = (audio, master, frequency, startAt, duration, volume) => {
    [
        [1, 1],
        [2, 0.25],
    ].forEach(([multiple, weight]) => {
        const osc = audio.createOscillator();
        const gain = audio.createGain();

        osc.type = 'sine';
        osc.frequency.value = frequency * multiple;

        gain.gain.setValueAtTime(0.0001, startAt);
        gain.gain.exponentialRampToValueAtTime(volume * weight, startAt + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

        osc.connect(gain);
        gain.connect(master);
        osc.start(startAt);
        osc.stop(startAt + duration + 0.05);
    });
};

export const playUnlockSound = () => {
    const audio = getContext();
    if (!audio) return;
    if (audio.state === 'suspended') audio.resume();

    const now = audio.currentTime;
    const master = audio.createGain();
    master.gain.value = 0.3; // overall volume
    master.connect(audio.destination);

    playNote(audio, master, 659.25, now, 0.9, 0.22); // E5, "ting"
    // playNote(audio, master, 987.77, now + 0.16, 1.2, 0.2); // B5, "boop"
};