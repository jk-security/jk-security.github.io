document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card[data-project-url]");

  document.addEventListener("dragstart", (event) => {
    const selection = window.getSelection();

    if (selection && !selection.isCollapsed) {
      event.preventDefault();
    }
  });

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.button !== 0) {
        return;
      }

      if (event.target.closest("a, button, input, select, textarea")) {
        return;
      }

      const selection = window.getSelection();

      if (selection && !selection.isCollapsed) {
        return;
      }

      window.location.assign(card.dataset.projectUrl);
    });
  });
});