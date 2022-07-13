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
    node.classList.add("hevetica");
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
  const kyrosLeft = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "7%",
      end: "10%",
      scrub: 1,
    },
  });

  const kyrosRight = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "7%",
      end: "10%",
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
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "13%",
      end: "14%",
      scrub: 1,
    },
  });

  const nextScene1Right = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "13%",
      end: "14%",
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
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "0%",
      end: "100%",
      scrub: 1,
    },
  });

  line.to(".line-progress", { height: 80 });

  const nurture = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "18%",
      end: "23%",
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
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "26%",
      end: "28%",
      scrub: 1,
    },
  });

  nextScene2.to("#nurture", {
    opacity: 0,
    filter: "blur(40px)",
  });

  const incubate = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "32%",
      end: "35%",
      scrub: 1,
    },
  });

  incubate
    .from("#incubate", { opacity: 0, filter: "blur(40px)" })
    .to("#incubate", { opacity: 1, filter: "blur(0px)" });

  const nextScene3 = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "37%",
      end: "40%",
      scrub: 1,
    },
  });

  nextScene3.to("#incubate", { opacity: 0, filter: "blur(40px)" });

  const ambition = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "42%",
      end: "49%",
      scrub: 1,
    },
  });

  ambition
    .from("#ambition", { opacity: 0, filter: "blur(40px)" })
    .to("#ambition", { opacity: 1, filter: "blur(0px)" })
    .to("#ambition", { opacity: 1, filter: "blur(0px)" })
    .to("#ambition", { opacity: 1, filter: "blur(0px)" })
    .to("#ambition", { opacity: 0, filter: "blur(40px)" });

  const opportunity = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "50%",
      end: "57%",
      scrub: 1,
    },
  });

  opportunity
    .from("#opportunity", { opacity: 0, filter: "blur(40px)" })
    .to("#opportunity", { opacity: 1, filter: "blur(0px)" })
    .to("#opportunity", { opacity: 1, filter: "blur(0px)" })
    .to("#opportunity", { opacity: 1, filter: "blur(0px)" })
    .to("#opportunity", { opacity: 0, filter: "blur(40px)" });

  const builder = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "58%",
      end: "59%",
      scrub: 1,
    },
  });

  builder.to("#builder", { opacity: 1, filter: "blur(0px)" });

  const howard = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "58%",
      end: "62%",
      scrub: 1,
    },
  });

  const windowWidth = window.innerWidth;

  const howardText = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "58%",
      end: "62%",
      scrub: 1,
    },
  });

  howard
    .to("#howard", { opacity: 1, filter: "blur(0px)" })
    .to("#howard", { opacity: 1, filter: "blur(0px)" })
    .to("#howard", { opacity: 1, filter: "blur(0px)" })

    .to("#howard", { opacity: 0, filter: "blur(40px)" });

  howardText
    .to("#howard-text", {
      left: windowWidth < 1441 ? "69%" : "70%",
      opacity: 1,
    })
    .to("#howard-text", {
      left: windowWidth < 1441 ? "69%" : "70%",
      opacity: 1,
    })
    .to("#howard-text", {
      left: windowWidth < 1441 ? "69%" : "70%",
      opacity: 1,
    })
    .to("#howard-text", { left: "120%", opacity: 0 });

  const howard2 = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "63%",
      end: "67%",
      scrub: 1,
    },
  });

  const howardText2 = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "63%",
      end: "67%",
      scrub: 1,
    },
  });

  howard2
    .to("#howard", { opacity: 1, filter: "blur(0px)" })
    .to("#howard", { opacity: 1, filter: "blur(0px)" })
    .to("#howard", { opacity: 1, filter: "blur(0px)" })
    .to("#howard", { opacity: 0, filter: "blur(40px)" });

  howardText2
    .to("#howard-text", { left: "70%", opacity: 1 })
    .to("#howard-text", { left: "70%", opacity: 1 })
    .to("#howard-text", { left: "120%", opacity: 0 });

  const nextScene5 = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "67%",
      end: "69%",
      scrub: 1,
    },
  });

  nextScene5.to("#builder > div", { opacity: 0, filter: "blur(40px)" });

  const threeLastSection = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "74%",
      end: "100%",
      scrub: "1",
    },
  });

  threeLastSection.to("#three-last-sections", { top: "unset", bottom: 180 });

  function finishOnFastLeave(self) {
    !self.isActive &&
      Math.abs(self.getVelocity()) > 2500 &&
      self.animation.progress(self.progress === 1 ? 1 : 0).pause();
  }
}

export default init;
