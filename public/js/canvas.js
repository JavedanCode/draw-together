const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");

const eraserBtn = document.getElementById("eraserBtn");
const undoBtn = document.getElementById("undoBtn");
const clearBtn = document.getElementById("clearBtn");

const drawingForm = document.getElementById("drawingForm");
const imageDataInput = document.getElementById("imageData");

let drawing = false;

let currentColor = "#000000";
let currentBrush = 5;

let currentImage = null;

let erasing = false;

let history = [];

const MAX_HISTORY = 50;

const brushValue = document.getElementById("brushValue");

/* ===========================
   CANVAS SETUP
=========================== */

function resizeCanvas() {
  const ratio = 16 / 9;

  const width = canvas.clientWidth;
  const height = width / ratio;

  canvas.width = width;
  canvas.height = height;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (currentImage) {
    loadImage(currentImage);
  }
}

function loadImage(imageData) {
  currentImage = imageData;

  const img = new Image();

  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  img.src = imageData;
}

resizeCanvas();

const existingImage = document.getElementById("existingImage");

if (existingImage && existingImage.value) {
  loadImage(existingImage.value);
}

window.addEventListener("resize", resizeCanvas);

/* ===========================
   DRAWING
=========================== */

function startDrawing(e) {
  history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));

  if (history.length > MAX_HISTORY) {
    history.shift();
  }

  drawing = true;

  draw(e);
}

function stopDrawing() {
  drawing = false;

  ctx.beginPath();

  currentImage = canvas.toDataURL("image/png");
}

function draw(e) {
  if (!drawing) return;

  const rect = canvas.getBoundingClientRect();

  const x = (e.clientX - rect.left) * (canvas.width / rect.width);

  const y = (e.clientY - rect.top) * (canvas.height / rect.height);

  ctx.lineWidth = currentBrush;

  ctx.strokeStyle = erasing ? "#ffffff" : currentColor;

  ctx.lineTo(x, y);

  ctx.stroke();

  ctx.beginPath();

  ctx.moveTo(x, y);
}

/* ===========================
   TOOLS
=========================== */

colorPicker.addEventListener("input", () => {
  currentColor = colorPicker.value;

  swatches.forEach((s) => s.classList.remove("active"));

  erasing = false;

  eraserBtn.classList.remove("active");
});

brushSize.addEventListener("input", () => {
  currentBrush = Number(brushSize.value);

  brushValue.textContent = `${currentBrush}px`;
});

eraserBtn.addEventListener("click", () => {
  erasing = !erasing;

  eraserBtn.classList.toggle("active");
});

undoBtn.addEventListener("click", () => {
  if (history.length === 0) return;

  const previous = history.pop();

  ctx.putImageData(previous, 0, 0);
  currentImage = canvas.toDataURL("image/png");
});

clearBtn.addEventListener("click", () => {
  history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));

  if (history.length > MAX_HISTORY) {
    history.shift();
  }

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  currentImage = canvas.toDataURL("image/png");
});

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "z") {
    e.preventDefault();

    undoBtn.click();
  }
});

const swatches = document.querySelectorAll(".color-swatch");

swatches.forEach((swatch) => {
  swatch.addEventListener("click", () => {
    currentColor = swatch.dataset.color;

    colorPicker.value = currentColor;

    erasing = false;

    eraserBtn.classList.remove("active");

    swatches.forEach((s) => s.classList.remove("active"));

    swatch.classList.add("active");
  });
});
/* ===========================
   SAVE
=========================== */

drawingForm.addEventListener("submit", () => {
  imageDataInput.value = canvas.toDataURL("image/png");
});

/* ===========================
   MOUSE EVENTS
=========================== */

canvas.addEventListener("mousedown", startDrawing);

canvas.addEventListener("mousemove", draw);

canvas.addEventListener("mouseup", stopDrawing);

canvas.addEventListener("mouseleave", stopDrawing);

/* ===========================
   TOUCH EVENTS
=========================== */

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();

  startDrawing(e.touches[0]);
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();

  draw(e.touches[0]);
});

canvas.addEventListener("touchend", stopDrawing);
