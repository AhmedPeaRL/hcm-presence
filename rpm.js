// rpm.js
// Rhythmic Presence Modulation — non-intrusive, non-demanding

(() => {
  const state = {
    presence: 0.5,        // 0 → 1
    lastMotion: Date.now(),
    lastFocus: Date.now(),
    idleBias: 0.0006,     // سرعة الهدوء
    motionBias: 0.0012,   // سرعة الانتباه
  };

  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

  // Passive sensing
  const senseMotion = () => (state.lastMotion = Date.now());
  const senseFocus = () => (state.lastFocus = Date.now());

  window.addEventListener("mousemove", senseMotion, { passive: true });
  window.addEventListener("keydown", senseMotion, { passive: true });
  window.addEventListener("focus", senseFocus);
  window.addEventListener("blur", senseFocus);

  // Temporal rhythm (non-regular on purpose)
  function pulse() {
    const now = Date.now();
    const silence = now - state.lastMotion;
    const focusGap = now - state.lastFocus;

    // if unfocused, decay faster
    const decay = focusGap > 2000 ? state.idleBias * 1.8 : state.idleBias;

    if (silence > 2500) {
      state.presence -= decay;
    } else {
      state.presence += state.motionBias;
    }

    state.presence = clamp(state.presence);

    // Expose as CSS variables only (no UI coupling)
    const root = document.documentElement;
    root.style.setProperty("--rpm-presence", state.presence.toFixed(4));
    root.style.setProperty(
      "--rpm-drift",
      (0.3 + state.presence * 0.7).toFixed(4)
    );

    // Irregular next pulse
    const next = 90 + Math.random() * 160;
    setTimeout(pulse, next);
  }

  pulse();
})();
