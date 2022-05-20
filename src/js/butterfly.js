import gsap, { Linear, Power2 } from "gsap";

function init() {
  const container = document.querySelector("#butterfly-container");
  const count = 60;
  let w, h;
  w = window.innerWidth;
  h = window.innerHeight;
  const minWidthInit = w / 2 - 300;
  const maxWidthInit = w / 2 + 300;
  const minHeightInit = h / 2 - 300;
  const maxHeightInit = h / 2 + 300;

  function random(min, max) {
    return gsap.utils.random(min, max);
  }

  function createUnit() {
    var unit = document.createElement("div");
    unit.classList.add("unit");
    container.appendChild(unit);
    gsap.set(unit, {
      x: random(minWidthInit, maxWidthInit),
      y: random(minHeightInit, maxHeightInit),
      scale: random(0.5, 1.0),
      opacity: 0,
    });
    gsap.to(unit, {
      x: "+=" + random(-w / 2, w / 2),
      y: "+=" + random(-h / 2, h / 2),
      duration: random(20, 23),
      ease: Linear.easeNone,
    });
    gsap.to(unit, {
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
    });
  }

  for (let index = 0; index < count; index++) {
    createUnit();
  }
}

export default init;
