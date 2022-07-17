<template>
  <div class="w-[100vw] h-[100vh] relative">
    <div class="flex">
      <div>arr</div>
      <div class="uppercase">Media</div>
    </div>

    <div>
      <img :src="img" alt="coin" />
    </div>

    <div class="flex justify-between">
      <div v-for="(item, index) in list" :key="index">
        <div class="flex">
          <div>arr</div>
          <div>
            <div>{{ item.title }}</div>
            <div>{{ item.des }}</div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div v-for="item in 6" :key="item">
          <div class="w-1/3">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Media",
  props: {
    img: {
      default:
        "https://coin68.com/wp-content/uploads/2022/03/Coin68_logo-1.png",
    },
  },
  data() {
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
        title: "Top 1 Blockchain Media",
        des: "in Vietnam",
      },
      {
        title: "Top 1 biggest Finance Media",
        des: "in Vietnam",
      },
    ];
  },
};
</script>
