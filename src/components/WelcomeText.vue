<template>
  <div id="welcome-text" class="z-[100]">
    <div class="section h-20">
      <div class="line"></div>
      <div class="line-progress"></div>
    </div>
    <div class="welcome">
      <div v-if="section === 1">
        Welcome <br />
        to kyros ventures
      </div>

      <div v-if="section === 2">Mission</div>

      <div v-if="section === 3">
        Our <br />
        Builders
      </div>

      <div v-if="section === 4">
        Our <br />
        Partners
      </div>

      <div v-if="section === 5">Research</div>

      <div v-if="section === 6">Leardership</div>

      <div v-if="section === 7">
        Join <br />
        our Crew
      </div>
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
      isDisableAutoBtn: false,
      windowScrollY: 0,
    };
  },
  computed: {
    section() {
      switch (true) {
        case this.windowScrollY < 0.15:
          return 1;

        case this.windowScrollY < 0.58:
          return 2;

        case this.windowScrollY < 0.7:
          return 3;

        case this.windowScrollY < 0.75:
          return 4;

        case this.windowScrollY < 0.81:
          return 5;

        case this.windowScrollY < 0.86:
          return 6;
        default:
          return 7;
      }
    },
  },
  mounted() {
    const body = document.querySelector("body");
    const bodyHeight = body.offsetHeight;

    //handle text
    window.addEventListener("scroll", () => {
      this.isDisableAutoBtn = window.scrollY > 400;
      this.windowScrollY = this.getScrollPercent(window.scrollY, bodyHeight);
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
  left: 60px;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
}

.section {
  .line {
    height: 80px;
    width: 1px;
    margin: 0 20px;
    background: gray;
    border-radius: 1px;

    position: absolute;
    left: -40px;
    top: 50%;
    transform: translateY(-50%);
  }

  .line-progress {
    z-index: 10;
    position: absolute !important;
    top: 0;
    left: -20px;
    transform: translateX(-50%);
    width: 4px;
    border-radius: 1px;
    background: white;
  }
}

/* welcome */
.welcome {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;

  > div {
    position: relative;
    animation: fadeIn 0.4s linear;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: -6px;

      width: 15px;
      height: 2px;
      background-color: rgb(162, 23, 23);
    }
  }
  display: flex;
  align-items: center;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    filter: blur(0);
  }
}
</style>
