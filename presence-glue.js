// presence-glue.js
// This file does not decide. It only listens.

const RhythmicWitness = {
  lastState: null,

  observe(state) {
    if (this.lastState === null) {
      this.lastState = state;
      return;
    }

    if (state.coherence < this.lastState.coherence) {
      document.dispatchEvent(
        new CustomEvent("rhythmic-allowance", { detail: state })
      );
    }

    this.lastState = state;
  }
};

// Example silent tick
setInterval(() => {
  RhythmicWitness.observe({
    coherence: Math.random() // placeholder, not logic
  });
}, 3000);
