import { gsap, Linear, Power2 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

var acAnimated = { Plugins: {} };
/* SplitText Plugin - Starts */
acAnimated.Plugins.SplitText = function (element, options) {
  if (!options.hasOwnProperty("words")) options.words = 1;
  if (!options.hasOwnProperty("chars")) options.chars = 1;
  if (!options.hasOwnProperty("spacing")) options.spacing = 5;
  this.searchTextNodes = function (element) {
    var foundTextNodes = [];
    if (element == null || element == undefined) return foundTextNodes;
    for (var i = 0; i <= element.childNodes.length - 1; i++) {
      var node = element.childNodes[i];
      if (node.nodeName == "#text") {
        //text found
        foundTextNodes.push(node);
      } else {
        var foundTextNodes = foundTextNodes.concat(this.searchTextNodes(node));
      }
    }
    return foundTextNodes;
  };
  this.createElement = function (text, relatedNode) {
    var node = document.createElement("div");
    var nodeText = document.createTextNode(text);
    node.nodeText = nodeText;
    node.appendChild(nodeText);
    node.style.display = "flex";
    node.style.position = "relative";
    if (text.trim() == "") node.style.width = String(options.spacing) + "px";
    relatedNode.parentNode.insertBefore(node, relatedNode);
    return node;
  };
  this.splitCharacters = function (textNode) {
    var characters = textNode.nodeValue.toString();
    var chars = [];
    if (characters.trim() != "") {
      for (var c = 0; c <= characters.length - 1; c++) {
        var character = characters.substr(c, 1);
        var char = this.createElement(character, textNode);
        if (character.trim() != "") chars.push(char);
      }
      textNode.parentNode.removeChild(textNode);
    }
    return chars;
  };
  this.splitWords = function (textNode) {
    var textWords = textNode.nodeValue.toString().split(" ");
    var words = [];
    for (var w = 0; w <= textWords.length - 1; w++) {
      var textWord = textWords[w];
      var word = this.createElement(textWord, textNode);
      if (textWord.trim() != "") words.push(word);
      if (w < textWords.length - 1) this.createElement(" ", textNode); //spacing for word
    }
    textNode.parentNode.removeChild(textNode);
    return words;
  };
  this.splitTextNodes = function (textNodes) {
    var splitText = { words: [], chars: [] };
    for (var i = 0; i <= textNodes.length - 1; i++) {
      var textNode = textNodes[i];
      if (options.words == 0) {
        splitText.chars = splitText.chars.concat(
          this.splitCharacters(textNode)
        );
      } else {
        var words = this.splitWords(textNode);
        if (options.chars == 1) {
          for (var w = 0; w <= words.length - 1; w++) {
            let word = words[w];
            var chars = this.splitCharacters(word.nodeText);
            splitText.chars = splitText.chars.concat(chars);
            word.chars = chars;
          }
        }
        splitText.words = splitText.words.concat(words);
      }
    }
    return splitText;
  };
  var textNodes = this.searchTextNodes(element);
  var splitText = this.splitTextNodes(textNodes);
  return splitText;
};
/* SplitText Plugin - Ends */

function init() {
  const container = document.querySelector("#butterfly-container");
  const count = 50;
  let w, h;
  w = window.innerWidth;
  h = window.innerHeight;
  const minWidthInit = w / 2 - 250;
  const maxWidthInit = w / 2 + 250;
  const minHeightInit = h / 2 - 200;
  const maxHeightInit = h / 2 + 200;

  function random(min, max) {
    return gsap.utils.random(min, max);
  }

  function createUnit() {
    var unit = document.createElement("div");
    unit.classList.add("unit");
    container.appendChild(unit);
    const xLocale = random(minWidthInit, maxWidthInit);
    const yLocale = random(minHeightInit, maxHeightInit);
    const scale = random(4, 7);
    gsap.set(unit, {
      x: xLocale,
      y: yLocale,
      scale: random(0.7, 1.0),
      opacity: 1,
    });
    gsap.to(unit, {
      x: "+=" + (xLocale - w / 2) * scale,
      y: "+=" + (yLocale - h / 2) * scale,
      scale: 1.5,
      duration: random(14, 19),
      ease: Linear.easeNone,
      onComplete: function () {
        unit.parentNode.removeChild(unit);
        createUnit();
      },
    });
    /*   gsap.to(unit, {
      opacity: 0.8,
      repeat: 5,
      yoyo: true,
      duration: random(2, 3),
      delay: random(0, 2),
      ease: Power2.easeInOut,
      onComplete: function () {
        unit.parentNode.removeChild(unit);
        createUnit();
      },
    }); */
  }

  for (let index = 0; index < count; index++) {
    createUnit();
  }

  const kyrosLeft = gsap.timeline({
    scrollTrigger: {
      trigger: ".scene",
      start: "17%",
      end: "20%",
      scrub: 1,
    },
  });

  const kyrosRight = gsap.timeline({
    scrollTrigger: {
      trigger: ".scene",
      start: "17%",
      end: "20%",
      scrub: 1,
    },
  });

  const textLeft = document.querySelector(".text__left");
  const textRight = document.querySelector(".text__right");

  const splitTextLeft = acAnimated.Plugins.SplitText(textLeft, {
    type: "words,chars",
  });
  const splitTextRight = acAnimated.Plugins.SplitText(textRight, {
    type: "words,chars",
  });

  const charsLeft = splitTextLeft.chars;
  const charsRight = splitTextRight.chars;
  kyrosLeft.from(charsLeft, {
    duration: 0.5,
    autoAlpha: 0,
    opacity: 0,
    filter: "blur(24px)",
    stagger: -0.1,
  });

  kyrosRight.from(charsRight, {
    duration: 0.5,
    autoAlpha: 0,
    opacity: 0,
    filter: "blur(24px)",
    stagger: 0.1,
  });

  const nextScene1Left = gsap.timeline({
    scrollTrigger: {
      trigger: ".scene",
      start: "25%",
      end: "28%",
      scrub: 1,
    },
  });

  const nextScene1Right = gsap.timeline({
    scrollTrigger: {
      trigger: ".scene",
      start: "25%",
      end: "28%",
      scrub: 1,
    },
  });

  nextScene1Left.to(charsLeft, {
    duration: 0.5,
    autoAlpha: 0,
    opacity: 0,
    filter: "blur(24px)",
    stagger: 0.1,
  });

  nextScene1Right.to(charsRight, {
    duration: 0.5,
    autoAlpha: 0,
    opacity: 0,
    filter: "blur(24px)",
    stagger: -0.1,
  });

  const line = gsap.timeline({
    scrollTrigger: {
      trigger: ".scene",
      start: "0%",
      end: "100%",
      scrub: 1,
    },
  });

  line.to(".line-progress", { width: 60 });

  const nurture = gsap.timeline({
    scrollTrigger: {
      trigger: ".scene",
      start: "45%",
      end: "50%",
      scrub: 1,
    },
  });

  nurture
    .from("#nurture", {
      opacity: 0,
      filter: "blur(40px)",
    })
    .to("#nurture", {
      opacity: 1,
      filter: "blur(0px)",
    });

  const nextScene2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".scene",
      start: "55%",
      end: "60%",
      scrub: 1,
    },
  });

  nextScene2.to("#nurture", {
    opacity: 0,
    filter: "blur(40px)",
  });

  const incubate = gsap.timeline({
    scrollTrigger: {
      trigger: ".scene",
      start: "65%",
      end: "70%",
      scrub: 1,
    },
  });

  incubate
    .from("#incubate", { opacity: 0, filter: "blur(40px)" })
    .to("#incubate", { opacity: 1, filter: "blur(0px)" });

  const nextScene3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".scene",
      start: "75%",
      end: "80%",
      scrub: 1,
    },
  });

  nextScene3.to("#incubate", { opacity: 0, filter: "blur(40px)" });
}

export default init;
