(function () {
  if (!window.PRESENCE_READY) return;

  const IF = window.HCM_INTERACTION_FIELD;
  const ES = window.HCM_EPHEMERAL_STATE;
  const AT = window.HCM_ALLOWANCE_TREE;
  const AG = window.HCM_AGENT;

  IF.on(event => {
    ES.touch(event.ts);

    const state = ES.snapshot();
    const allowance = AT.check(state);

    if (allowance.open) {
      AG.mayAppear();
    window.HCM_CLOSURE.seal();
    }
  });

  IF.attach();
})();
