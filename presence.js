(async function () {
  const container = document.getElementById("presence-container");

  const manifest = await loadManifest(
    "../hcm-presence-manifest/manifest.json"
  );

  if (!manifest || !manifest.allowance_states?.appearance?.allowed) {
    renderAbsence(container);
    return;
  }

  const registry = await loadManifest(
    "../hcm-artifacts-registry/registry.json"
  );

  if (!registry || !Array.isArray(registry.artifacts)) {
    renderAbsence(container);
    return;
  }

  registry.artifacts.forEach(artifact => {
    if (artifact.visibility !== "allowed") return;

    const tile = document.createElement("div");
    tile.className = "presence-tile";

    const title = document.createElement("div");
    title.className = "presence-title";
    title.textContent = artifact.title || "Untitled Artifact";

    const meta = document.createElement("div");
    meta.className = "presence-meta";
    meta.textContent = artifact.origin || "unspecified source";

    tile.appendChild(title);
    tile.appendChild(meta);
    container.appendChild(tile);
  });

  if (container.children.length === 0) {
    renderAbsence(container);
  }
})();
