const toggleButtons = document.querySelectorAll(".toggle-btn");

/* ==========================================
   OPEN / CLOSE SETTINGS
========================================== */

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.target);

    const isOpen = target.classList.contains("open");

    document.querySelectorAll(".setting-body").forEach((section) => {
      section.classList.remove("open");
    });

    if (!isOpen) {
      target.classList.add("open");
    }
  });
});

/* ==========================================
   HOLD TO SHOW PASSWORD
========================================== */

const holdButtons = document.querySelectorAll(".hold-to-show");

holdButtons.forEach((button) => {
  const form = button.closest("form");

  const passwordInputs = form.querySelectorAll(".password-input");

  const reveal = () => {
    passwordInputs.forEach((input) => {
      input.type = "text";
    });
  };

  const hide = () => {
    passwordInputs.forEach((input) => {
      input.type = "password";
    });
  };

  button.addEventListener("mousedown", reveal);
  button.addEventListener("mouseup", hide);
  button.addEventListener("mouseleave", hide);

  button.addEventListener("touchstart", reveal);
  button.addEventListener("touchend", hide);

  /* ==========================================
   CLOSE EDITOR WITH ESCAPE
========================================== */

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;

    document.querySelectorAll(".setting-body").forEach((section) => {
      section.classList.remove("open");
    });

    toggleButtons.forEach((button) => {
      button.textContent =
        button.dataset.target === "password-section"
          ? "Change"
          : button.dataset.target === "delete-section"
            ? "Delete Account"
            : "Edit";
    });
  });
});
