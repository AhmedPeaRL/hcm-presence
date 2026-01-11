function renderAbsence(container) {
  const absence = document.createElement("div");
  absence.className = "absence";
  absence.textContent = "Nothing is present.";
  container.appendChild(absence);
}
