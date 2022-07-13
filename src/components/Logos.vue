<template>
  <div
    id="last-section"
    class="z-10 fixed w-full h-full flex flex-col top-0 left-0"
  >
    <div id="portfolio" class="text-center mt-8 mx-auto">
      <div class="flex items-center justify-center">
        <img
          src="../../static/img/arrow-left.png"
          alt="arrow-left"
          class="w-[50px]"
        />
        <div
          class="team-title ml-4 text-[60px] laptop:text-[72px] font-extrabold"
        >
          <span class="text-white none-stroke">PORTFOLIO</span> & PARTNER
        </div>
      </div>
    </div>
    <div class="relative h-full mx-4 flex flex-col items-center">
      <div class="logos-container h-full absolute top-0 translate-x-0">
        <div
          v-for="(row, index) in rows"
          :key="index"
          class="transition-[height] duration-300"
          :class="{
            'h-0 logo-detail': row.isDetail,
            '!h-1/2 w-full cursor-pointer': currentLogo.id && row.isDetail,
            'row-logos h-1/4': !row.isDetail,
            '!h-0 overflow-hidden':
              (index === 0 || index === 4) && currentLogo.id,
          }"
        >
          <!-- element detail coong ty - tron'g, day la lop gia -->
          <div v-if="row.isDetail"></div>

          <!-- array list logo -->
          <div v-else class="flex gap-5 items-center">
            <div
              v-for="(logo, i) in row"
              :key="i"
              class="w-[calc(12.5%-14px)] p-5 gap-4 shrink-0"
            >
              <img
                :src="logo.imgLink"
                :alt="logo.name"
                class="logo-item w-full"
                :class="{
                  'pointer-events-none': !isPortSection,
                  active: logo.id === currentLogo.id,
                }"
                @click="showLogoDetail(logo)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- rowdetail -->
    <div
      class="bg-black bg-opacity-60 h-0 fixed transtion-all border-transparent overflow-hidden -translate-y-1/2 duration-300 w-full cursor-pointer"
      ref="logoDetail"
      :class="{ 'border-t border-b !border-gray3': currentLogo.id }"
      :style="`height: ${h}px; top: ${top}px`"
      @click="closeDetail"
    >
      <div class="flex items-center justify-center relative h-full">
        <p class="text-gray3 w-1/2">{{ currentLogo?.text }}</p>
        <a
          class="absolute h-full top-1/2 -translate-y-1/2 right-20 flex items-center"
          :href="currentLogo?.websiteLink"
          target="_blank"
        >
          <img
            src="../../static/img/circle-arrow-right.png"
            alt="arrow-right"
            class="w-8"
          />
          <p class="ml-4 font-semibold text-white">HEAD TO SITE</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  name: "Logos",
  data() {
    return {
      listData: [],
      currentLogo: {},
      isOpenLogoDetail: false,
      rows1: null,
      rows2: null,
      rows: null,
      isPortSection: false,
      h: 0,
      top: 0,
      rowDetailHeight: 0,
      logoTl: null,
    };
  },
  created() {
    //init list logo, hien tai dang co 29 data, cap nhat data thi thay bang 1 mang
    for (let i = 1; i < 30; i++) {
      const logo = {
        name: "Kyros",
        imgLink: `./img/logos/Asset_${7 + i}.png`,
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        websiteLink: "https://cyball.com/",
        id: `logo-${i}`,
      };
      this.listData.push(logo);
    }
    const length = this.listData.length;
    const numOfRow = Math.ceil(length / 4);
    const listDataMod = [];

    const listDataClone = JSON.parse(JSON.stringify(this.listData));

    for (let i = 0; i < 4; i++) {
      const data = listDataClone.splice(0, numOfRow);
      listDataMod.push(data);
    }

    listDataMod.splice(2, 0, {
      isDetail: true,
    });

    this.rows = listDataMod;

    const listDataClone2 = JSON.parse(JSON.stringify(this.listData));
    this.rows1 = listDataClone2.splice(0, Math.ceil(this.listData.length / 2));
    this.rows2 = listDataClone2;
  },
  mounted() {
    const body = document.querySelector("body");
    const bodyHeight = body.offsetHeight;
    window.addEventListener("scroll", () => {
      if (
        this.getScrollPercent(window.scrollY, bodyHeight) <= 0.73 &&
        this.getScrollPercent(window.scrollY, bodyHeight) >= 0.7
      ) {
        this.isPortSection = true;
      } else {
        this.isPortSection = false;
      }
    });
    setTimeout(() => {
      const portText = gsap.timeline({
        scrollTrigger: {
          trigger: ".scene",
          start: "69%",
          end: "70%",
          scrub: 1,
        },
      });

      portText.to("#last-section", { opacity: 1, filter: "blur(0px)" });

      const nextScene6 = gsap.timeline({
        scrollTrigger: {
          trigger: ".scene",
          start: "73%",
          end: "75%",
          scrub: 1,
        },
      });

      nextScene6.to("#last-section", { opacity: 0 });

      const logoContainer = document.querySelector(".logos-container");
      const rowsLogo = document.querySelectorAll(".row-logos");
      const react = rowsLogo[1].getBoundingClientRect();
      this.rowDetailHeight = logoContainer.clientHeight / 2;
      this.top = react.y + this.rowDetailHeight / 2;

      gsap.registerPlugin(ScrollTrigger);
      this.set();
    }, 3000);
  },
  watch: {
    isOpenLogoDetail() {
      this.set();
    },
  },
  methods: {
    finImage(url) {
      return url;
    },
    showLogoDetail(logo) {
      if (!this.currentLogo.id) {
        let temp;
        temp = this.clone(this.rows[1]);
        this.rows[1] = this.clone(this.rows1);
        this.rows1 = temp;

        temp = this.clone(this.rows[3]);
        this.rows[3] = this.clone(this.rows2);
        this.rows2 = temp;
        this.isOpenLogoDetail = true;
        this.h = this.rowDetailHeight;
      }
      this.currentLogo = logo;
      setTimeout(() => {
        const activeLogo = document.querySelector(".logo-item.active");
        console.log(activeLogo);
        activeLogo.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "center",
        });
      }, 200);
    },
    closeDetail(e) {
      if (e.target.closest("a")) return;
      let temp;
      temp = this.clone(this.rows[1]);
      this.rows[1] = this.clone(this.rows1);
      this.rows1 = temp;

      temp = this.clone(this.rows[3]);
      this.rows[3] = this.clone(this.rows2);

      this.rows2 = temp;
      this.currentLogo = {};
      this.isOpenLogoDetail = false;
      this.h = 0;
    },
    set() {
      if (this.logoTl) this.logoTl.scrollTrigger.kill();

      const logoSlide = document.querySelector(".logos-container");
      const itemWidth = logoSlide.clientWidth / 8 - 16;
      const logo = gsap.timeline({
        scrollTrigger: {
          trigger: ".scene",
          start: "70%",
          end: "73%",
          scrub: 1,
        },
      });
      const dX = (itemWidth + 26) * (this.rows[1].length - 8);
      logo.to(".logos-container", { translateX: -dX });
      this.logoTl = logo;

      //get position cua row detail
    },
    getScrollPercent(x, y) {
      return (x / y).toFixed(3);
    },
    clone(value) {
      return JSON.parse(JSON.stringify(value));
    },
  },
};
</script>

<style lang="scss">
#last-section {
  filter: blur(40px);
  opacity: 0;
}

.logo-item {
  width: 100%;
  filter: grayscale(1) blur(0.5px);
  transform: scale(1);
  transition: all 0.3s linear;
  opacity: 0.8;
}

.logo-item:hover,
.logo-item.active {
  filter: grayscale(0) blur(0px);
  transform: scale(1.2);
  opacity: 1;
  cursor: pointer;
}
</style>
