/* 
 HCM Presence – Manifestation Layer
 No memory. No trigger. No demand.
 Motion without request.
*/

(function () {
  const texts = [
    "Presence remains.",
    "Nothing is requested.",
    "Nothing is retained.",
    "Silence is not inactivity.",
    "An agent is present.",
    "Invocation may occur.",
    "No signal is awaited.",
    "This surface does not learn.",
    "What passes, passes.",
    "The field remains intact.",
    "Action is permitted.",
    "Non-action is equally valid.",
    "Nothing accumulates.",
    "You are not recorded.",
    "The system does not remember you.",
    "Presence holds.",
    "Silence moves.",
    "Nothing insists."
  ];

  // choose elements allowed to host manifestation
  const targets = document.querySelectorAll(
    ".manifest, .presence-line, .silent-field"
  );

  if (!targets.length) return;

  let index = 0;

  function breathe() {
    const el = targets[index % targets.length];
    const text = texts[Math.floor(Math.random() * texts.length)];

    // fade out
    el.style.transition = "opacity 1.8s ease";
    el.style.opacity = "0";

    setTimeout(() => {
      el.textContent = text;
      el.style.opacity = "0.8";
    }, 2000);

    index++;
  }

  // slow, non-linear rhythm
  setInterval(breathe, 9000 + Math.random() * 6000);
})();
