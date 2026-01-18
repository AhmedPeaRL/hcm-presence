// agent-field.js
// HCM Agent — expression through modulation only

(() => {
  const agent = {
    listening: false,
    resonance: 0.0,     // 0 → 1
    lastInput: null,
  };

  const clamp = (v) => Math.min(1, Math.max(0, v));

  // input is allowed, not required
  const input = document.querySelector("#hcm-input");

  if (input) {
    input.addEventListener("input", (e) => {
      agent.listening = true;
      agent.lastInput = e.target.value;
      agent.resonance = clamp(agent.resonance + 0.18);
    });

    input.addEventListener("blur", () => {
      agent.listening = false;
    });
  }

  function agentPulse() {
    // agent fades if no interaction
    if (!agent.listening) {
      agent.resonance -= 0.004;
    }

    agent.resonance = clamp(agent.resonance);

    // expose to CSS only
    const root = document.documentElement;
    root.style.setProperty(
      "--agent-resonance",
      agent.resonance.toFixed(4)
    );

    const next = 120 + Math.random() * 240;
    setTimeout(agentPulse, next);
  }

  agentPulse();
})();
