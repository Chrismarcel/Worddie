document.querySelector(".search__input").addEventListener("keyup", function() {
  // Check if word contains any character other than a string
  // Or if input field is empty
  document.querySelector(".search__btn").classList.add("search__btn-active");
  document.querySelector(".search__icon").classList.add("search__icon-active");
  if (this.value.match(/[^A-z]+/) || this.value.trim().length === 0) {
    document
      .querySelector(".search__btn")
      .classList.remove("search__btn-active");
    document
      .querySelector(".search__icon")
      .classList.remove("search__icon-active");
  }
});

// Preload SpeechSynthesis voices
window.onload = function() {
  window.speechSynthesis.getVoices();
};

document.querySelector(".pronounce").addEventListener("click", function() {
  const word = document.querySelector("#word").textContent;
  Worddie.pronounceWord(word);
});

document.querySelector(".search__btn").addEventListener("click", function() {
  const word = document.querySelector(".search__input").value;
  Worddie.getDefinition(word);
});

const deleteWords = document.querySelectorAll(".delete");
Array.from(deleteWords).map(word => {
  word.addEventListener("click", function(event) {
    const parentEl = this.parentElement;
    parentEl.classList.add("deleted");
    setTimeout(() => {
      parentEl.remove();
    }, 500);
  });
});
