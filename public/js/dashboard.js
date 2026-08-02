const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const drawingId = button.dataset.id;

    try {
      const response = await fetch(`/likes/${drawingId}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to like drawing.");
      }

      const data = await response.json();

      button.querySelector(".heart").textContent = data.liked ? "❤️" : "🤍";

      button.querySelector(".like-count").textContent = data.likeCount;

      button.classList.toggle("liked", data.liked);
    } catch (err) {
      console.error(err);
    }
  });
});

const slides = document.querySelectorAll(".featured-slide");

let current = 0;

setInterval(() => {
  slides[current].classList.remove("active");

  current++;

  if (current >= slides.length) {
    current = 0;
  }

  slides[current].classList.add("active");
}, 5000);
