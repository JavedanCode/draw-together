const deleteButtons = document.querySelectorAll(".delete-toggle");

deleteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const panel = document.getElementById(button.dataset.target);

    const open = panel.classList.contains("open");

    document.querySelectorAll(".delete-panel").forEach((p) => {
      p.classList.remove("open");
    });

    if (!open) {
      panel.classList.add("open");
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;

  document.querySelectorAll(".delete-panel").forEach((panel) => {
    panel.classList.remove("open");
  });
});
