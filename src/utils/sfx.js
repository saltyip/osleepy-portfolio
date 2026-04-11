let audioCtx = null;

// Call this on the first user interaction (e.g. "Click to Begin")
export const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

// A soft, high-frequency pop for general UI interactions
export const playClick = () => {
  if (!audioCtx || audioCtx.state === 'suspended') return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.04);

  gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
};

// A randomized noisy clack simulating a mechanical keyboard switch
export const playKeypress = () => {
  if (!audioCtx || audioCtx.state === 'suspended') return;

  const bufferSize = audioCtx.sampleRate * 0.05; // 50ms pulse
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1; // Pure white noise
  }

  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;

  // Bandpass to shape the plastic 'clack' tone
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 800 + Math.random() * 600; // Randomize pitch slightly
  filter.Q.value = 1.0;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);

  noise.start();
};

// A deep sub-bass cinematic sweep simulating a CRT monitor or machine booting up
export const playBootHum = () => {
  if (!audioCtx || audioCtx.state === 'suspended') return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(30, audioCtx.currentTime);
  osc.frequency.linearRampToValueAtTime(70, audioCtx.currentTime + 0.5);

  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.1); // Sudden swell
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 2.0); // Long decay fade

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 2.0);
};
