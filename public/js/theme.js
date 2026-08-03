const body = document.body;
const themeBtn = document.getElementById("themeToggle");
const themeLabel = themeBtn?.querySelector("span");

function applyTheme(theme) {
  body.dataset.theme = theme;

  if (themeLabel) {
    themeLabel.textContent = theme === "dark" ? "Dark" : "Light";
  }

  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme") || "dark";

applyTheme(savedTheme);

themeBtn?.addEventListener("click", () => {
  const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);
});
