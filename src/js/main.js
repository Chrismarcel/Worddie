document.querySelector(".search__input").addEventListener("keyup", function() {
  // Validate input
  const searchIcon = document.querySelector(".feather").cloneNode(true);
  document.querySelector("button .feather-search").remove();
  document.querySelector(".search__btn").append(searchIcon);
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

document.querySelector(".search__btn").addEventListener("click", function(evt) {
  evt.preventDefault();
  document.querySelector(".definitions").classList.add("open");
  document.querySelector(".home").classList.add("hide");
  const definitions = Array.from(
    document.querySelectorAll(".word__definition")
  );
  definitions.map(definition => definition.remove());
  const word = document.querySelector(".search__input").value;
  Worddie.getDefinition(word);
});

document.querySelector("button.back").addEventListener("click", function() {
  document.querySelector(".definitions").classList.remove("open");
  document.querySelector(".home").classList.remove("hide");
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
