// discourse-engine.js
// Resonant speech, not chat response

(() => {
  const container = document.querySelector("#hcm-discourse");
  if (!container) return;

  let lastText = "";
  let lastBucket = null;

  function pickText(resonance) {
    const bucket = window.HCM_DISCOURSE.find(
      b => resonance >= b.min && resonance < b.max
    );

    if (!bucket) return null;

    if (bucket === lastBucket && Math.random() < 0.6) {
      return null;
    }

    lastBucket = bucket;
    return bucket.texts[
      Math.floor(Math.random() * bucket.texts.length)
    ];
  }

  function updateDiscourse() {
    const resonance = parseFloat(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--agent-resonance")
    );

    if (isNaN(resonance)) return;

    const text = pickText(resonance);
    if (!text || text === lastText) return;

    lastText = text;

    const span = document.createElement("span");
    span.textContent = text;
    span.className = "discourse-line";

    container.innerHTML = "";
    container.appendChild(span);
  }

  setInterval(updateDiscourse, 900);
})();
