<template>
  <div id="cyball" class="w-[100vw] h-[100vh] hidden fixed top-0 left-0 z-[102]">
    <div class="center-all">
      <img src="../../../static/img/cyball.png" alt="logo" class="w-[440px] hd:w-[540px] laptop:w-[600px] mt-20" />
      <div class="absolute w-96 left-[calc(100%+80px)] laptop:left-[calc(100%+120px)] top-1/2 -translate-y-1/2">
        <div class="pj-name w-fit pb-[2px] uppercase font-bold text-lg laptop:text-xl text-[red] tracking-[1px]">
          {{isVi ? 'dự án': 'project'}}
        </div>

        <div
          class="text-[50px] laptop:text-6xl mt-2 mb-4 laptop:mt-3 laptop:mb-5 uppercase font-[900] tracking-[4px] text-white">
          Cyball
        </div>

        <div class="-ml-5 c">
          <div v-for="item in cyballPJ" :key="item" class="flex mt-[6px] laptop:mt-2">
            <img src="../../../static/img/arrow-left.png" alt="arrow-left" class="w-4 h-4 mr-2 mt-2 laptop:mt-1" />
            <div v-html="item" class="text-base laptop:text-lg text-gray3"></div>
          </div>

          <div class="ml-5 my-4 flex">
            <a href="https://twitter.com/CyBallOfficial" target="_blank" class="social-link">
              <img src="../../../static/img/twitter.png" alt="tw">
            </a>
            <a href="https://t.me/cyballofficial" target="_blank" class="social-link">
              <img src="../../../static/img/paper-plane.png" alt="tele" class="mr-[2px]">
            </a>
            <a href="https://discord.com/invite/cyball" target="_blank" class="social-link">
              <img src="../../../static/img/discord.png" alt="discord">
            </a>
          </div>

          <a class="flex items-center ml-5 mt-2" target="_blank" href="https://cyball.com/">
            <div class="uppercase text-base laptop:text-lg text-gray3 font-[900] tracking-wide mr-2">
              {{isVi ? 'ĐẾN TRANG CHỦ' : 'HEAD TO SITE'}}
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
  name: "Cyball",
  computed: {
    cyballPJ() {
      return this.isVi ? this.viContent.cyballPJ : this.enContent.cyballPJ
    }
  }
};
</script>
