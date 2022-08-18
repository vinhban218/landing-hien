import { from, gsap, Linear, Power2 } from "gsap";
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
      scrub: 0.2,
    },
  });

  const kyrosRight = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "7%",
      end: "10%",
      scrub: 0.2,
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
      scrub: 0.2,
    },
  });

  const nextScene1Right = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "13%",
      end: "14%",
      scrub: 0.2,
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
      scrub: 0.2,
    },
  });

  line.to(".line-progress", { height: 80 });

  const nurture = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "14%",
      end: "21%",
      scrub: 0.2,
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
    })
    .to("#nurture", {
      opacity: 1,
      filter: "blur(0px)",
    })
    .to("#nurture", {
      opacity: 1,
      filter: "blur(0px)",
    })
    .to("#nurture", {
      opacity: 0,
      filter: "blur(40px)",
    });

  const weAre = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "21%",
      end: "28%",
      scrub: 0.2,
    },
  });

  weAre
    .from("#we-are", {
      opacity: 0,
      filter: "blur(40px)",
    })
    .to("#we-are", {
      opacity: 1,
      filter: "blur(0px)",
    })
    .to("#we-are", {
      opacity: 1,
      filter: "blur(0px)",
    })
    .to("#we-are", {
      opacity: 1,
      filter: "blur(0px)",
    })
    .to("#we-are", {
      opacity: 0,
      filter: "blur(40px)",
    });

  const ourPillar = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "32%",
      end: "35%",
      scrub: 0.2,
    },
  });

  ourPillar
    .from("#our-pillar", { opacity: 0, filter: "blur(40px)" })
    .to("#our-pillar", { opacity: 1, filter: "blur(0px)" });

  const nextScene3 = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "37%",
      end: "40%",
      scrub: 0.2,
    },
  });

  nextScene3.to("#our-pillar", { opacity: 0, filter: "blur(40px)" });

  const network = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "43%",
      end: "52%",
      scrub: 0.2,
    },
  });

  network
    .from("#network", { opacity: 0, filter: "blur(40px)", display: "none" })
    .to("#network", { opacity: 1, filter: "blur(0px)", display: "block" })
    .to("#network", { opacity: 1, filter: "blur(0px)", display: "block" })
    .to("#network", { opacity: 1, filter: "blur(0px)", display: "block" })
    .to("#network", { opacity: 0, filter: "blur(40px)", display: "none" });

  const incubation = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "53%",
      end: "62%",
      scrub: 0.2,
    },
  });

  incubation
    .from("#incubation", { opacity: 0, filter: "blur(40px)" })
    .to("#incubation", { opacity: 1, filter: "blur(0px)" })
    .to("#incubation", { opacity: 1, filter: "blur(0px)" })
    .to("#incubation", { opacity: 1, filter: "blur(0px)" })
    .to("#incubation", { opacity: 0, filter: "blur(40px)" });

  const highlightPj = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "70%",
      end: "71%",
      scrub: 0.2,
    },
  });

  highlightPj.to("#highlight-pj", { opacity: 1, filter: "blur(0px)" });

  const cyball = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "70%",
      end: "74%",
      scrub: 0.2,
    },
  });

  cyball
    .from("#cyball", { opacity: 0, filter: "blur(40px)", display: "none" })
    .to("#cyball", { opacity: 1, filter: "blur(0px)", display: "block" })
    .to("#cyball", { opacity: 1, filter: "blur(0px)", display: "block" })
    .to("#cyball", { opacity: 1, filter: "blur(0px)", display: "block" })
    .to("#cyball", { opacity: 0, filter: "blur(40px)", display: "none" });

  const ancient8 = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "74%",
      end: "78%",
      scrub: 0.2,
    },
  });

  ancient8
    .from("#ancient8", { opacity: 0, filter: "blur(40px)", display: "none" })
    .to("#ancient8", { opacity: 1, filter: "blur(0px)", display: "block" })
    .to("#ancient8", { opacity: 1, filter: "blur(0px)", display: "block" })
    .to("#ancient8", { opacity: 1, filter: "blur(0px)", display: "block" })
    .to("#ancient8", { opacity: 0, filter: "blur(40px)", display: "none" });

  const highlightPjFadeOut = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "77%",
      end: "78%",
      scrub: 0.2,
    },
  });

  highlightPjFadeOut
    // .from('#highlight-pj', { opacity: 1, filter: 'blur(0)' })
    .to("#highlight-pj", { opacity: 0, filter: "blur(40px)" });

  const mediaTitle = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "78%",
      end: "81.5%",
      scrub: 0.2,
    },
  });

  mediaTitle
    .from(".media-title", { opacity: 0, filter: "blur(40px)", display: "none" })
    .to(".media-title", { opacity: 1, filter: "blur(0px)" })
    .to(".media-title", { opacity: 1, filter: "blur(0px)" })
    .to(".media-title", { opacity: 1, filter: "blur(0px)" })
    .to(".media-title", { opacity: 0, filter: "blur(40px)", display: "none" });

  const media = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "78%",
      end: "81.5%",
      scrub: 0.2,
    },
  });

  media
    .from("#media", { opacity: 0, filter: "blur(40px)", display: "none" })
    .to("#media", { opacity: 1, filter: "blur(0px)", display: "flex" })
    .to("#media", { opacity: 1, filter: "blur(0px)", display: "flex" })
    .to("#media", { opacity: 1, filter: "blur(0px)", display: "flex" })
    .to("#media", { opacity: 0, filter: "blur(40px)", display: "none" });

  const threeLastSection = gsap.timeline({
    scrollTrigger: {
      onToggle: finishOnFastLeave,
      trigger: ".scene",
      start: "75%",
      end: "100%",
      scrub: "1",
    },
  });

  threeLastSection.to("#three-last-sections", { top: "unset", bottom: 200 });

  function finishOnFastLeave(self) {
    !self.isActive &&
      Math.abs(self.getVelocity()) > 2500 &&
      self.animation.progress(self.progress === 1 ? 1 : 0).pause();
  }
}

export default init;
