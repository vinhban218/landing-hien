<template>
  <div
    class="z-[1000] fixed right-10 top-10 w-[30] h-[30px] cursor-pointer"
    @click="openNavDialog"
  >
    <div ref="navBtn" class="nav-btn"></div>
  </div>
  <Logos />
  <WelcomeText />
  <ThreeLastSection />
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
  methods: {
    openNavDialog() {
      this.$refs.navBtn.classList.toggle("active");
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
</style>
