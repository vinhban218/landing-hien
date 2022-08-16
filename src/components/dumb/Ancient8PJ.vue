<template>
  <div id="ancient8" class="w-[100vw] h-[100vh] hidden fixed top-0 left-0 z-[103]">
    <div class="center-all">
      <img src="../../../static/img/ancient8.png" alt="logo" class=" w-[360px] hd:w-[440px] laptop:w-[500px]" />
      <div class="absolute w-96 left-[calc(100%+120px)] top-1/2 -translate-y-1/2">
        <div class="pj-name w-fit pb-[2px] uppercase font-bold text-xl text-[red] tracking-[1px]">
          project
        </div>

        <div
          class="text-[50px] laptop:text-6xl mt-2 mb-4 laptop:mt-3 laptop:mb-5 uppercase font-[900] tracking-[4px] text-white">
          ancient8
        </div>

        <div class="-ml-5">
          <div v-for="item in pjDes" :key="item" class="flex mt-[6px] laptop:mt-2">
            <img src="../../../static/img/arrow-left.png" alt="arrow-left" class="w-4 h-4 mr-2 mt-2 laptop:mt-1" />
            <div v-html="item" class="text-base laptop:text-lg text-gray3"></div>
          </div>

          <div class="ml-5 my-4 flex">
            <a href="https://twitter.com/Ancient8_gg" target="_blank" class="social-link">
              <img src="../../../static/img/twitter.png" alt="tw">
            </a>
            <a href="https://t.me/ancient8_gg" target="_blank" class="social-link">
              <img src="../../../static/img/paper-plane.png" alt="tele" class="mr-[2px]">
            </a>
            <a href="https://discord.com/invite/ancient8" target="_blank" class="social-link">
              <img src="../../../static/img/discord.png" alt="discord">
            </a>
          </div>

          <a class="flex items-center ml-5 mt-2" target="_blank" href="https://ancient8.gg/">
            <div class="uppercase text-base laptop:text-lg text-gray3 font-[900] tracking-wide mr-2">
              Head to site
            </div>
            <img src="../../../static/img/circle-arrow-right.png" alt="arrow-left" class="w-4 mr-1" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ancient8",
  props: {
    img: {
      default:
        "https://pbs.twimg.com/profile_images/1508713706028478468/e8aC9VqW_400x400.jpg",
    },
    pjName: {
      default: "Cyball",
    },
    pjDes: {
      default: [
        "GameFi infrastructure builder with a focus on software, community and guild.",
        "<span class='highlight'>$10M</span> fund raised from <span class='highlight'>Dragonfly Capital, Pantera, Makers Fund</span> among others.",
      ],
    },
  },
};
</script>
