<template>
  <div
    id="media"
    class="fixed hidden top-0 left-0 z-[104] w-[100vw] h-[100vh] flex-col justify-end items-center pb-6 laptop:pb-10"
  >
    <div class="center-all w-[320px] hd:w-[360px] laptop:w-[400px] pb-10 laptop:pb-8">
      <img src="../../../static/img/68coin.png" alt="coin" class="w-full" />
    </div>

    <div class="flex gap-16 hd:gap-20 justify-between  pb-4 laptop:pb-8">
      <div v-for="(item, index) in list" :key="index" class="text-xl hd:text-2xl laptop:text-[26px]">
        <div class="flex">
          <img
            src="../../../static/img/arrow-left.png"
            alt="arrow-left"
            class="w-5 mt-4 hd:mt-[6px] laptop:w-7 laptop:mt-[6px] mr-2 h-fit"
          />
          <div>
            <div
              class="text-white font-bold  hd:leading-[26px] laptop:leading-[32px]"
              v-html="item.title"
            ></div>
            <div class="text-gray3  text-base laptop:text-lg mt-[2px]">{{ item.des }}</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-3">
        <div
          class="col-span-1 w-12 laptop:w-14 flex justify-center items-center"
          v-for="(item, index) in listLogo"
          :key="item"
        >
          <a
            target="_blank" :href="item.link"
            class="bg-gray3 rounded-full w-7 h-7 laptop:w-8 laptop:h-8 flex justify-center items-center transition-all duration-300 text-white cursor-pointer hover:bg-[red]"
          >
            <img class="social-logo w-3/5" :style="  index === 2 ? 'margin-right: 2px;' : ''" :src="item.logo" alt="item.logo" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Media",
  data() {
    return {
      list: [
        {
          title: "5M",
          des: "Monthly traffic",
        },
        {
          title: "1.7M",
          des: "Monthly Users",
        },
        {
          title: "Top 1 <br/> Blockchain <br/> Media",
          des: "in Vietnam",
        },
        {
          title: "Top 8 <br> Finance Media <br> in Vietnam",
          des: "in Vietnam",
        },
      ],
      listLogo: [
        {
          logo: "./img/facebook-logo.png",
          link: "https://www.facebook.com/tintuccoin68",
        },
        {
          logo: "./img/twitter.png",
          link: "https://twitter.com/coin68",
        },
        {
          logo: "./img/paper-plane.png",
          link: "https://t.me/coin68",
        },
      ],
    };
  },
};
</script>
