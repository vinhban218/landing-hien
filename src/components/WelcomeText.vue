<template>
  <div id="welcome-text" class="z-[100]">
    <div class="section h-20">
      <div class="line">
        <div class="line-progress"></div>
      </div>
    </div>
    <div class="welcome">
      <div v-html="text"></div>
    </div>
  </div>

  <div id="auto-play-btn" :class="{ inactive: isDisableAutoBtn }">
    <img src="../../static/img/mouse.png" alt="mouse" />
    <div class="tooltip">
      Auto <br>
      Scroll
    </div>
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
    text() {
      switch (true) {
        case this.windowScrollY < 0.15:
          return 'WELCOME';
        case this.windowScrollY < 0.33:
          return 'WE ARE KYROS';
        case this.windowScrollY < 0.455:
          return 'OUR <br> PILLARS'
        case this.windowScrollY < 0.636:
          return "VIETNAM <br> AND <br> BEYOND"
        case this.windowScrollY < 0.788:
          return 'PORTFOLIO <br> COMPANIES';
        case this.windowScrollY < 0.812:
          return "OUR <br> ECOSYSTEM"
        case this.windowScrollY < 0.873:
          return "PUBLICATION"
        case this.windowScrollY < 0.92:
          return 'OUR <br> TEAM';
        default:
          return 'CONTACT <br> US';
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
  left: 32px;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
}

.section {
  width: fit-content;

  .line {
    height: 80px;
    width: 1px;
    background: gray;
    border-radius: 1px;

    position: absolute;
    left: -16px;
    top: 50%;
    transform: translateY(-50%);

    .line-progress {
      z-index: 10;
      position: absolute !important;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      border-radius: 1px;
      background: #a21717;
    }
  }
}

#auto-play-btn {
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, 0);

  font-weight: 600;
  font-size: 18px;

  width: 28px;
  transition: all 0.3s linear;
  cursor: pointer;
  z-index: 200;

  img {
    max-width: 100%;
    &:hover {
      & + .tooltip {
        opacity: 1;
      }
    }
  }

  &.inactive {
    opacity: 0;
    pointer-events: none;
  }

  .tooltip {
    position: absolute;
    top: 50%;
    right: calc(100% + 10px);
    transform: translateY(-50%);
    margin-top: 13px;

    opacity: 0;
    transition: opacity 0.3s linear;
    pointer-events: none;
    font-size: 8px;
    font-weight: 400;
    color: #E5EEE5;

    &::after {
      content: '';
      position: absolute;
      top: -4px;
      left: 0;

      width: 10px;
      height: 1px;
      background: red;
    }
  }
}

/* welcome */
.welcome {
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;

  >div {
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
