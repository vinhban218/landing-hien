<template>
  <div class="team w-full h-[100vh] flex justify-center items-center">
    <div class="w-[45%] pr-[144px]">
      <div class="flex items-center justify-end">
        <img
          src="../../static/img/arrow-left.png"
          alt="arrow-left"
          class="w-[50px]"
        />
        <div
          class="team-title ml-4 text-[60px] laptop:text-[72px] font-extrabold"
        >
          TEAM
        </div>
      </div>
      <p class="mt-2 text-gray3 text-xl laptop:text-2xl -mr-[42px] text-right">
        By builder for builder
      </p>
    </div>

    <div class="relative w-[55%]">
      <div
        ref="slideContainer"
        class="flex w-full gap-14 items-center h-[530px] transition-all duration-500"
      >
        <div v-for="(item, index) in listMembers" :key="index">
          <div
            class="relative shrink-0 w-80 opacity-10 blur-[1px] grayscale transition-all duration-500"
            :class="{ active: index === currentIndex }"
          >
            <img :src="item.imgLink" alt="member" />

            <!-- description -->
            <div
              v-if="index === currentIndex"
              class="absolute fade-in-ani top-0 left-[calc(100%+80px)] h-full w-60 flex flex-col justify-center uppercase text-[#dddddd]"
            >
              <div class="text-2xl tracking-[3px]">{{ item.position }}</div>
              <div
                class="my-2 text-[36px] tracking-[5px] leading-[42px] font-extrabold"
                v-html="item.name"
              ></div>
              <div class="team-description relative text-gray3 normal-case">
                {{ item.text }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- btn -->
      <div
        class="absolute -bottom-[70px] left-[184px] -translate-x-1/2 flex items-center justify-center mt-5"
      >
        <img
          src="../../static/img/circle-arrow-right.png"
          class="w-8 rotate-180 mr-7 cursor-pointer"
          :class="{
            'pointer-events-none opacity-60 cursor-auto': currentIndex === 0,
          }"
          alt="left"
          @click="prevItem"
        />
        <img
          src="../../static/img/circle-arrow-right.png"
          class="w-8 cursor-pointer"
          alt="right"
          :class="{
            'pointer-events-none opacity-60 cursor-auto': currentIndex > 1,
          }"
          @click="nextItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Team",
  data() {
    return {
      listMembers: [
        {
          position: "CEO",
          name: "Thuat Nguyen",
          text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          imgLink: "./img/thuat-nguyen-1.png",
        },
        {
          position: "CEO",
          name: "Thuat Nguyen",
          text: `is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          imgLink: "./img/thuat-nguyen-2.png",
        },
        {
          position: "CEO",
          name: "Thuat Nguyen",
          text: `e printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          imgLink: "./img/thuat-nguyen-3.png",
        },
      ],
      currentIndex: 0,
    };
  },
  methods: {
    nextItem() {
      this.currentIndex++;
    },
    prevItem() {
      this.currentIndex--;
    },
  },
  watch: {
    currentIndex(val) {
      this.$refs.slideContainer.style.transform = `translateX(-${val * 376}px)`;
    },
  },
};
</script>

<style lang="scss">
.team-title {
  -webkit-text-stroke: 2.5px red;
  color: transparent;
  letter-spacing: 6px;
  font-family: Arial, Helvetica, sans-serif;

  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 180px;
    height: 2px;
    border-radius: 2px;

    right: -52px;
    bottom: 8px;

    background: white;
  }
}

.team {
  .active {
    filter: none;
    width: 368px;
    opacity: 1;
  }

  .fade-in-ani {
    animation: fadeIn 0.5s linear;
  }
}

.team-description {
  &::after {
    content: "";
    width: 16px;
    height: 1px;
    background: red;

    position: absolute;
    left: 0;
    bottom: -12px;
  }
}

@media screen and (max-width: 1440px) {
  .team-title {
    &::after {
      width: 154px;
      bottom: 10px;
      right: -40px;
    }
  }
}
</style>
