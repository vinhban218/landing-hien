<template>
  <div
    class="z-[4000] fixed right-10 top-10 w-[30px] h-[30px] scale-[0.7] cursor-pointer"
    @click="openNavDialog"
  >
    <div
      class="nav-btn opacity-0 pointer-events-none"
      :class="{ active: isOpenNav }"
    ></div>
  </div>
  <Logos />
  <WelcomeText />
  <ThreeLastSection />

  <!-- bg noise cua app -->
  <div class="fixed top-0 left-0 z-[-2] w-[100vw] h-[100vh]">
    <div class="inline-block absolute top-0 left-0 w-full h-full">
      <video
        class="inline-block min-w-full min-h-full"
        aria-hidden="true"
        playsinline=""
        autoplay=""
        muted=""
        loop=""
      >
        <source src="../../static/img/noise.webm" type="video/webm" />
      </video>
    </div>
  </div>

  <!-- bg nav -->
  <div
    class="nav-modal-bg relative overflow-hidden w-[100vw] h-0 flex items-center"
    :class="{ open: isOpenNav }"
  >
    <div class="flex flex-col ml-20 justify-center">
      <div
        v-for="(item, index) in listSection"
        :key="item"
        class="nav-section-item leading-[72px] laptop:leading-[80px] cursor-pointer text-gray3"
        @click="gotoSection(index)"
      >
        <div
          class="flex items-center text-[60px] laptop:text-[72px] font-bold w-[600px]"
        >
          <div class="mr-4">{{ item }}</div>
          <img
            src="../../static/img/arrow-left.png"
            alt="arrow-left"
            class="w-[44px] opacity-0 transition-opacity duration-200 pt-2"
          />
        </div>
      </div>

      <div class="flex mt-10 items-center ml-4 tracking-[2px] text-xl">
        <div
          class="language font-semibold text-gray3 cursor-pointer mr-4"
          :class="{ active: isEng }"
          @click="isEng = true"
        >
          ENG
        </div>
        <div
          class="language font-semibold text-gray3 cursor-pointer"
          :class="{ active: !isEng }"
          @click="isEng = false"
        >
          VN
        </div>
      </div>
    </div>

    <div class="absolute footer bottom-5 right-10 flex items-center">
      <a href="" target="_blank" class="mr-4 bg-gray3">
        <img src="../../static/img/twitter.png" alt="twitter" />
      </a>
      <a href="" target="_blank">
        <img src="../../static/img/paper-plane.png" alt="telegram" />
      </a>
    </div>
  </div>
</template>

<script>
import WelcomeText from "./WelcomeText.vue";
import Logos from "./Logos.vue";
import ThreeLastSection from "./ThreeLastSection.vue";
export default {
  name: "App",
  components: {
    Logos,
    WelcomeText,
    ThreeLastSection,
  },
  data() {
    return {
      listSection: [
        "Welcome",
        "Mission",
        "Our Builders",
        "Our Partners",
        "Research",
        "Leadership",
        "Contact",
      ],
      isOpenNav: false,
      isEng: true,
    };
  },
  methods: {
    openNavDialog() {
      this.isOpenNav = !this.isOpenNav;
    },
    gotoSection(section) {
      const bodyHeight = document.querySelector("body").offsetHeight;
      switch (true) {
        case section === 0: {
          window.scrollTo({ top: 0, behavior: "smooth" });
          break;
        }
        case section === 1: {
          window.scrollTo({ top: 0.242 * bodyHeight, behavior: "smooth" });
          break;
        }
        case section === 2: {
          window.scrollTo({ top: 0.6 * bodyHeight, behavior: "smooth" });
          break;
        }
        case section === 3: {
          window.scrollTo({ top: 0.7 * bodyHeight, behavior: "smooth" });
          break;
        }
        case section === 4: {
          window.scrollTo({ top: 0.775 * bodyHeight, behavior: "smooth" });
          break;
        }
        case section === 5: {
          window.scrollTo({ top: 0.855 * bodyHeight, behavior: "smooth" });
          break;
        }
        case section === 6: {
          window.scrollTo({ top: 1 * bodyHeight, behavior: "smooth" });
          break;
        }
      }

      this.isOpenNav = !this.openNavDialog;
    },
  },
};
</script>

<style lang="scss">
.nav-btn {
  background-color: white;
  width: 14px;
  height: 3px;
  border-radius: 2px;

  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  transition: all 0.3s linear;
  cursor: pointer;

  &::after,
  &::before {
    content: "";
    position: absolute;
    right: 0;

    width: 29px;
    height: 3.5px;
    border-radius: 2px;

    background-color: white;
    transition: inherit;
  }

  &::after {
    top: -10px;
  }

  &::before {
    bottom: -10px;
  }
}

.nav-btn.active {
  background-color: transparent;

  &::after {
    top: 0px;
    transform: rotate(45deg);
  }

  &::before {
    bottom: 0px;
    transform: rotate(-45deg);
  }
}

.nav-modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3000;

  transition: height 0.4s ease-out;
  background: black;

  &::after,
  &::before {
    content: "";
    position: absolute;
    background: #858585;
    width: 800px;
    height: 200px;
    left: 40%;
  }

  &::after {
    transform: rotate(45deg);
    bottom: -56px;
  }

  &::before {
    transform: rotate(-45deg);
    bottom: 368px;
  }

  &.open {
    height: 100vh;
  }

  .language.active {
    color: #a21717;
  }

  .footer {
    a {
      border-radius: 100%;
      width: 32px;
      height: 30px;
      background: rgb(133, 133, 133);
      transition: all 0.3s linear;
      cursor: pointer;

      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 60%;
        filter: brightness(0) invert(1);
      }

      &:hover {
        background: #a21717;
      }
    }
  }
}

.nav-section-item {
  &:hover {
    color: white;
    img {
      opacity: 1;
    }
  }
}

@media screen and (max-width: 1440px) {
  .nav-modal-bg {
    &::after,
    &::before {
      width: 600px;
      height: 150px;
      left: 40%;
    }

    &::after {
      bottom: 22px;
    }

    &::before {
      bottom: 340px;
    }
  }
}
</style>
