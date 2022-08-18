<template>
  <div id="loading" class="w-full h-full bg-black">
    <div class="key-hole top-[-100px]">
      <div class="key">
        <svg height="92" width="46" class="triangle scale-[inherit]">
          <polygon points="23,0 46,92 0,92" style="fill: white; stroke: white; stroke-width: 1" />
        </svg>
        <svg height="48" width="48" class="circle scale-[inherit]">
          <circle cx="24" cy="24" r="24" stroke="black" stroke-width="0" fill="white" />
        </svg>
      </div>
      <!-- text enter -->
      <div class="loading-text loading">
        Loading ...
      </div>
      <!-- loading bar -->
      <div class="bar">
        <div class="bar-inner"></div>
        <div class="bar-bg"></div>
      </div>
      <!-- facts -->
      <div class="fact-container">
        <div class="title">DID YOU KNOW?</div>
        <div class="slide-container">
          <div class="slide-content" ref="slideContent">
            <div v-for="(fact, index) in listFacts" :key="index" class="fact-item">
              {{ fact }}
            </div>
          </div>
        </div>
        <div class="slide-controller">
          <img src="../../static/img/circle-arrow-right.png" class="rotate-180 mr-4"
            :class="{ disabled: curentFact == 0 }" @click="prev">
          <img src="../../static/img/circle-arrow-right.png" :class="{ disabled: curentFact == listFacts.length - 1 }" @click="next">
        </div>
      </div>
    </div>
  </div>

  <div class="flash-light rounded-full blur-[60px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {
      curentFact: 0,
    }
  },
  computed: {
    listFacts() {
      return this.isVi ? this.viContent.listFacts : this.enContent.listFacts
    }
  },
  methods: {
    prev() {
      this.curentFact--
    },
    next() {
      this.curentFact++
    }
  },
  watch: {
    curentFact() {
      this.$refs.slideContent.style.transform = `translateX(-${this.curentFact * 100}%)`;
    }
  }
}
</script>

<style lang="scss">
.loading-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 44px;

  text-transform: uppercase;
  font-weight: 700;
  color: white;
  white-space: nowrap;
  font-size: 20px;

  &.loading {
    animation: fadeInOut 1s ease-in-out alternate infinite;
  }

  &.loaded {
    animation: fadeIn 1s linear;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
}

#loading {
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10000;

  transform: translate(-50%, -50%);

  .key-hole {
    position: absolute;
    top: 42%;
    left: 50%;

    transform: translate(-50%, -50%);
    transition: opacity 1s linear, filter 1s linear;

    .circle,
    .triangle {
      position: absolute;
      top: -56px;
      transform: translateX(-50%);
      transition: inherit;
    }

    &.done {
      .circle,
      .triangle, .loading-text {
        filter: drop-shadow(0 0 10px #fff) drop-shadow(0 0 20px #fff);
      }
    }
  }

  .bar {
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translate(-50%);
    width: 400px;
    height: 11px;
    border-radius: 6px;
    overflow: hidden;
    z-index: 20;
    transition: opacity 0.5s linear;
    background: transparent;

    -moz-background-clip: padding;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;

    .bar-bg {
      width: 100%;
      height: 100%;

      background: linear-gradient(0.25turn, #300303, #f02020);
      position: absolute;
      top: 0;
      right: 0;

      border-radius: 6px;
      -moz-background-clip: padding;
      -webkit-background-clip: padding-box;
      background-clip: padding-box;
    }

    .bar-inner {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 100%;
      transition: width 1.3s linear;
      background-color: #301010;
      z-index: 8;

      -moz-background-clip: padding;
      -webkit-background-clip: padding-box;
      background-clip: padding-box;
    }
  }

  .fact-container {
    position: absolute;
    width: 45vw;
    text-align: center;
    top: 110px;
    left: 50%;
    transform: translateX(-50%);

    .title {
      font-size: 18px;
      font-weight: 700;
      margin: auto;
      margin-bottom: 20px;
      width: fit-content;
      white-space: nowrap;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        width: 60px;
        height: 1px;
        color: white;
        bottom: -4px;
        left: -20px;
        background: white;
      }
    }

    .slide-container {
      width: 100%;
      overflow: hidden;

      .slide-content {
        display: flex;
        transition: transform 0.5s ease-in;

        .fact-item {
          width: calc(100%);
          flex-shrink: 0;
          font-size: 14px;
          min-height: 40px;
          padding: 0 30px;
        }
      }
    }

    .slide-controller {
      display: flex;
      justify-content: center;
      margin-top: 14px;

      img {
        width: 26px;
        cursor: pointer;

        &.disabled {
          pointer-events: none;
          opacity: 0.8;
        }
      }
    }
  }
}

.flash-light {
  z-index: 30000;
  background: whitesmoke;
  box-shadow: inset 0 0 40px 0px orange, inset 0 0 40px 0 rgb(233, 176, 71), inset 0 0 80px 0 rgb(247, 92, 36), inset 0 0 20px 20px rgb(238, 142, 107);
}

.flash-light.boom {
  animation: boom 2s ease-in-out;
}

@keyframes boom {
  0% {
    width: 0;
    height: 0;
    opacity: 0.5;
  }

  40% {
    width: 2400px;
    height: 2400px;
    opacity: 1;
  }

  60% {
    width: 2400px;
    height: 2400px;
    opacity: 1;
  }

  100% {
    width: 0;
    height: 0;
    opacity: 0.5;
  }
}
</style>