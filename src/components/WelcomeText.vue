<template>
  <div id="welcome-text" class="z-[100]">
    <div class="section">
      <span class="line"></span>
      <span class="line-progress"></span>
    </div>
    <div class="welcome">
      Welcome <br />
      to kyros ventures
    </div>
  </div>

  <div id="auto-play-btn" :class="{ inactive: isDisableAutoBtn }">
    <img src="../../static/img/mouse.png" alt="mouse" />
  </div>
</template>

<script>
export default {
  name: "WelcomeText",
  data() {
    return {
      section: 1,
      isDisableAutoBtn: false,
    };
  },
  mounted() {
    const body = document.querySelector("body");
    const bodyHeight = body.offsetHeight;

    //handle text
    window.addEventListener("scroll", () => {
      this.isDisableAutoBtn = window.scrollY > 400;
    });
  },
  unmounted() {
    removeEventListener("scroll", null);
  },
  methods: {
    getScrollPercent(x, y) {
      return (x / y).toFixed(3);
    },
  },
};
</script>

<style lang="scss">
#welcome-text {
  color: white;

  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
}

.section {
  display: flex;
  justify-content: center;
  align-items: center;

  transform: rotate(-90deg);
}

.section span {
  font-size: 18px;
  position: relative;
}

.line {
  width: 60px;
  height: 1px;
  margin: 0 20px;
  background: gray;
  border-radius: 1px;
}

.line-progress {
  z-index: 10;
  position: absolute !important;
  height: 4px;
  border-radius: 1px;

  right: 30px;
  top: 50%;
  transform: translateY(-50%);

  background: white;
}

/* welcome */
.welcome {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-left: -30px;
  position: relative;
}

.welcome::after {
  content: "";
  position: absolute;
  left: 0;
  top: -6px;

  width: 15px;
  height: 2px;
  background-color: rgb(162, 23, 23);
}
</style>
