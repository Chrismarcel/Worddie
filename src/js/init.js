class Worddie {
  static getDefinition(word) {
    const api = `https://googledictionaryapi.eu-gb.mybluemix.net/?define=${word}&lang=en`;

    fetch(api)
      .then(response => response.json())
      .then(definition => {
        Worddie.renderDefinitions(definition);
      })
      .catch(error => {
        console.log("Sorry, could not connect to Server", error);
      });
  }

  static pronounceWord(word) {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const speech = new SpeechSynthesisUtterance(word);

    if (voices.length > 0) {
      const defaultVoice = voices.filter(
        voice => voice.name === "Google UK English Female"
      );
      speech.voice = defaultVoice[0];
      speech.volume = 1;
      return synth.speak(speech);
    }

    return voices;
  }

  static deleteWord(word) {}

  static renderDefinitions(worddieObject) {
    let definitionIndex = 0;
    const { word, phonetic, meaning } = worddieObject;
    Worddie.appendContent("#word", Worddie.capitalizeWord(word));
    Worddie.appendContent("#phonetics", `/${phonetic[0]}/`);
    Object.keys(meaning).map(definitions => {
      meaning[definitions].map(definitionItem => {
        definitionIndex += 1;
        const { definition } = definitionItem;
        Worddie.createDefinitionNode(definitionItem);
        Worddie.appendContent(
          `.word__definition:nth-of-type(${definitionIndex}) .list-index`,
          `${definitionIndex}.`
        );
        Worddie.appendContent(
          `.word__definition:nth-of-type(${definitionIndex}) .part-of-speech`,
          Worddie.capitalizeWord(definitions)
        );
        Worddie.appendContent(
          `.word__definition:nth-of-type(${definitionIndex}) .definition`,
          Worddie.capitalizeWord(definition)
        );
      });
    });
  }

  static capitalizeWord(word) {
    return word[0].toUpperCase() + word.substr(1);
  }

  static appendContent(selector, content) {
    document.querySelector(selector).textContent = content;
    return;
  }

  static createDefinitionNode(definitionObj) {
    const definitionNode = document.createElement("div");
    const listIndexEl = document.createElement("span");
    const partOfSpeechEl = document.createElement("span");
    const definitionEl = document.createElement("p");
    const subSectionEl = document.createElement("div");

    definitionNode.classList.add("word__definition");
    listIndexEl.classList.add("list-index");
    partOfSpeechEl.classList.add("part-of-speech");
    definitionEl.classList.add("definition");
    subSectionEl.classList.add("sub-section");

    // Check if there are Synonyms returned
    if (definitionObj["synonyms"]) {
      const { titleEl, listElements } = Worddie.renderLists(
        "Synonyms",
        definitionObj["synonyms"]
      );
      subSectionEl.appendChild(titleEl);
      listElements.map(element => {
        subSectionEl.appendChild(element);
      });
    }

    // Check if there are Examples returned
    if (definitionObj["example"]) {
      const { titleEl, listElements } = Worddie.renderLists(
        "Example",
        definitionObj["example"]
      );
      subSectionEl.appendChild(titleEl);
      subSectionEl.appendChild(listElements);
    }

    definitionNode.appendChild(listIndexEl);
    definitionNode.appendChild(partOfSpeechEl);
    definitionNode.appendChild(definitionEl);
    definitionNode.appendChild(subSectionEl);
    document.querySelector(".word__definitions").appendChild(definitionNode);
  }

  static renderLists(title, wordsList) {
    let listElements;
    const titleEl = document.createElement("h4");
    titleEl.classList.add("title");
    titleEl.textContent = title;

    if (Array.isArray(wordsList)) {
      listElements = wordsList.map(element => {
        const synonymEl = document.createElement("span");
        synonymEl.classList.add("definition-list");
        synonymEl.textContent = Worddie.capitalizeWord(element);
        return synonymEl;
      });
    } else {
      listElements = document.createElement("span");
      listElements.classList.add("definition-list");
      listElements.textContent = Worddie.capitalizeWord(wordsList);
    }

    return { titleEl, listElements };
  }
}
