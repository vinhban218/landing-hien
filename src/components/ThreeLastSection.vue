<template>
  <div id="three-last-sections" class="fixed w-full top-[100%] left-0 z-[100]">
    <!-- hightlight pj -->
    <div
      id="highlight-pj"
      class="w-full title fixed top-6 flex justify-center items-center font-bold text-white text-medium laptop:text-large uppercase tracking-[4px]"
    >
      <img
        src="../../static/img/arrow-left.png"
        alt="arrow-left"
        class="w-[42px] laptop:w-[50px] mr-1"
      />
      <div>
        highlighted <span class="text-stroke font-[900]">project</span>
      </div>
    </div>
    <!-- media -->
    <div
      class="media-title top-6 flex justify-center items-center text-medium laptop:text-large tracking-[6px] text-[red]"
    >
      <img
        src="../../static/img/arrow-left.png"
        alt="arrow-left"
        class="w-[50px] laptop:w-[64px] mr-1"
      />
      <div class="uppercase text-stroke font-[900]" style="--width: 2.5px">
        Media
      </div>
    </div>

    <CyballPJ />
    <Ancient8PJ />
    <Media />
    <!-- fix 2 div de the cho cho dien tich cua 2 the cyball pj va ancienpj va media -->
    <div class="w-[100vw] h-[100vh]"></div>
    <div class="w-[100vw] h-[100vh]"></div>
    <div class="w-[100vw] h-[100vh]"></div>
    <Publication />
    <Team />
    <Email />
  </div>
</template>

<script>
import Team from "./Team.vue";
import Publication from "./Publication.vue";
import Email from "./Email.vue";
import Media from "./dumb/Media.vue";
import WeAre from "./dumb/WeAre.vue";
import CyballPJ from "./dumb/CyballPJ.vue";
import Ancient8PJ from "./dumb/Ancient8PJ.vue";
export default {
  components: {
    Publication,
    Team,
    Email,
    Media,
    WeAre,
    CyballPJ,
    Ancient8PJ,
  },
  name: "ThreeLastSection",
};
</script>

<style lang="scss">
#highlight-pj {
  opacity: 0;
  filter: blur(40px);
  white-space: nowrap;
  &.title {
    width: fit-content;
    left: 50%;
    transform: translateX(-50%);
    margin: auto;

    &::after {
      content: "";
      position: absolute;
      right: 30px;
      bottom: 0;

      width: 160px;
      height: 2px;
      background: white;
    }
  }
}

.pj-name {
  position: relative;

  &::after {
    content: "";
    width: 100%;
    height: 1px;
    background: white;
    position: absolute;

    bottom: 0;
    left: 0;
    transform: translateX(-50%);
  }
}

.media-title {
  position: fixed;
  left: 50%;
  white-space: nowrap;
  width: fit-content;
  transform: translateX(-50%);

  &::after {
    content: "";
    width: 65%;
    height: 2px;
    background: white;

    position: absolute;
    bottom: 0;
    right: 0;
    transform: translateX(40%);
  }
}
</style>
