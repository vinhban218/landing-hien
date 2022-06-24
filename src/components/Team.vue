<template>
  <div class="team w-full h-[100vh] flex justify-center items-center">
    <div class="w-[45%] pr-[144px]">
      <div class="flex items-center justify-end">
        <img
          src="../../static/img/arrow-left.png"
          alt="arrow-left"
          class="w-[50px]"
        />
        <div class="team-title ml-4 text-[72px] font-extrabold">TEAM</div>
      </div>
      <p class="mt-2 text-gray3 text-2xl -mr-[42px] text-right">
        By builder for builder
      </p>
    </div>

    <div class="w-[55%] flex gap-14">
      <div v-for="(item, index) in listMembers" :key="index">
        <div
          class="relative shrink-0 w-80 opacity-20 grayscale"
          :class="{ active: index === currentIndex }"
        >
          <img :src="item.imgLink" alt="member" />

          <!-- description -->
          <div
            v-if="index === currentIndex"
            class="absolute top-0 left-[calc(100%+40px)] h-full w-60 flex flex-col justify-center uppercase text-[#dddddd]"
          >
            <div class="text-xl tracking-[3px]">{{ item.position }}</div>
            <div
              class="my-2 text-[32px] tracking-[4px] leading-[38px] font-extrabold"
              v-html="item.name"
            ></div>
            <div
              class="team-description relative text-gray3 text-sm normal-case"
            >
              {{ item.text }}
            </div>
          </div>

          <!-- btn -->
          <div
            v-if="index === currentIndex"
            class="absolute -bottom-15 left-1/2 -translate-x-1/2 flex items-center justify-center mt-5"
          >
            <img
              src="../../static/img/circle-arrow-right.png"
              class="w-8 rotate-180 mr-7 cursor-pointer"
              alt="left"
              @click="currentIndex--"
            />
            <img
              src="../../static/img/circle-arrow-right.png"
              class="w-8 cursor-pointer"
              alt="right"
              @click="currentIndex++"
            />
          </div>
        </div>
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
};
</script>

<style lang="scss">
.team-title {
  -webkit-text-stroke: 2.5px red;
  color: transparent;
  letter-spacing: 6px;

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
    transform: scale(1.15);
    opacity: 1;
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
</style>
