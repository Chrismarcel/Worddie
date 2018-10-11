const worddie = new Worddie("Effect");

worddie.getDefinition();

window.onload = function() {
  worddie.pronounceWord();
};

document.querySelector(".pronounce").addEventListener("click", function() {
  worddie.pronounceWord();
});
