<template>
  <div
    id="last-section"
    class="z-10 fixed w-full h-full flex flex-col top-0 left-0"
  >
    <div id="portfolio" class="text-center mt-8 w-[70%] mx-auto">
      <img
        src="../../static/img/portfolio.png"
        alt="portfolio"
        class="w-full"
      />
    </div>
    <div
      id="logos"
      class="overflow-hidden h-full mx-4 flex flex-col items-center"
    >
      <div
        v-for="(row, index) in rows"
        :key="index"
        class="transition-[height] duration-300"
        :class="{
          'h-0': row.isDetail,
          '!h-1/2 cursor-pointer': currentLogo && row.isDetail,
          'row-logos h-1/4': !row.isDetail,
          '!h-0 overflow-hidden': (index === 0 || index === 4) && currentLogo,
        }"
      >
        <!-- element detail coong ty -->
        <div
          v-if="row.isDetail"
          class="-mx-4 bg-black bg-opacity-60"
          :class="{ 'border-t border-b border-gray3': currentLogo }"
          @click="closeDetail"
        >
          <div
            v-if="currentLogo"
            class="flex items-center justify-center relative h-full"
          >
            <p class="text-gray3 w-1/2">{{ currentLogo.text }}</p>
            <div
              class="absolute h-full top-1/2 -translate-y-1/2 right-20 flex items-center"
            >
              <a :href="currentLogo.websiteLink" target="_blank">
                <img
                  src="../../static/img/circle-arrow-right.png"
                  alt="arrow-right"
                  class="w-8"
                />
              </a>
              <p class="ml-4 font-semibold text-white">HEAD TO SITE</p>
            </div>
          </div>
        </div>
        <!-- array list logo -->
        <div v-else class="flex gap-5">
          <div
            v-for="(logo, i) in row"
            :key="i"
            class="w-[calc(12.5%-14px)] p-5 gap-4 shrink-0"
          >
            <img
              :src="logo.imgLink"
              :alt="logo.name"
              class="logo-item"
              @click="showLogoDetail(logo)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Logos",
  data() {
    return {
      listData: [
        {
          name: "Kyros",
          imgLink: "./img/cyball.png",
          text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          websiteLink: "https://cyball.com/",
        },
      ],
      currentLogo: null,
    };
  },
  created() {
    //dummy 37 item of listData
    for (let i = 0; i < 37; i++) {
      this.listData.push(this.listData[0]);
    }
  },
  computed: {
    rows() {
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

      return listDataMod;
    },
  },
  methods: {
    finImage(url) {
      return url;
    },
    showLogoDetail(logo) {
      this.currentLogo = logo;
    },
    closeDetail() {
      this.currentLogo = null;
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
  transition: all 0.5s linear;
  opacity: 0.8;
}

.logo-item:hover {
  filter: grayscale(0) blur(0px);
  transform: scale(1.2);
  opacity: 1;
  cursor: pointer;
}
</style>
