let slideIndex = 0;
const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slide").length;

function moveSlide(step) {
  slideIndex += step;
  if (slideIndex >= totalSlides) slideIndex = 0;
  if (slideIndex < 0) slideIndex = totalSlides - 1;
  slides.style.transform = `translateX(${-slideIndex * 100}%)`;
}

// about us
function toggleAnswer(element) {
  element.parentNode.classList.toggle("open");
}
