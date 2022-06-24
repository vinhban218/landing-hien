<template>
  <div
    class="z-[4000] fixed right-10 top-10 w-[30] h-[30px] cursor-pointer"
    @click="openNavDialog"
  >
    <div class="nav-btn" :class="{ active: isOpenNav }"></div>
  </div>
  <Logos />
  <WelcomeText />
  <ThreeLastSection />

  <!-- bg cua app -->
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

  <div
    class="nav-modal-bg overflow-hidden w-[100vw] h-0 flex items-center"
    :class="{ open: isOpenNav }"
  >
    <div class="flex flex-col ml-20 justify-center">
      <div
        v-for="(item, index) in listSection"
        :key="item"
        class="nav-section-item cursor-pointer text-gray3"
        @click="gotoSection(index)"
      >
        <div
          class="flex items-center justify-between text-[72px] font-extrabold w-[420px]"
        >
          <div class="mr-4">{{ item }}</div>
          <img
            src="../../static/img/arrow-left.png"
            alt="arrow-left"
            class="w-[44px] opacity-0 transition-opacity duration-200 pt-2"
          />
        </div>
      </div>
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
        "About us",
        "Partners",
        "Portfolio",
        "Blog",
        "Podcasts",
        "Carreers",
        "Contact",
      ],
      isOpenNav: false,
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
          window.scrollTo({ top: 0.69 * bodyHeight, behavior: "smooth" });
          break;
        }
        case section === 2: {
          window.scrollTo({ top: 0.69 * bodyHeight, behavior: "smooth" });
          break;
        }
        case section === 3: {
          window.scrollTo({ top: 0.72 * bodyHeight, behavior: "smooth" });
          break;
        }
        case section === 4: {
          window.scrollTo({ top: 0.82 * bodyHeight, behavior: "smooth" });
          break;
        }
        case section === 5: {
          window.scrollTo({ top: 0.86 * bodyHeight, behavior: "smooth" });
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

  &.open {
    height: 100vh;
  }
}

.nav-section-item {
  line-height: 90px;
  &:hover {
    color: white;
    img {
      opacity: 1;
    }
  }
}
</style>
