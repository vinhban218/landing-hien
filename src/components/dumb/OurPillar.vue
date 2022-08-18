<template>
  <div id="our-pillar" class="w-fit mx-auto">
    <div v-html="ourPillarTitle" class="our-pillars-title uppercase  text-[80px] laptop:text-[90px] text-white font-bold">
    </div>

    <div v-for="item in ourPillarContent" :key="item" class="text-white font-bold  text-[50px] laptop:text-[60px] mt-4 ml-48">
      <div class="flex items-center uppercase">
        <img
          src="../../../static/img/arrow-left.png"
          alt="arrow-left"
          class=" w-10 laptop:w-12 mr-2.5"
        />
        <div>{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Incubate",
  computed: {
    ourPillarTitle() {
      return this.isVi ? this.viContent.ourPillarTitle : this.enContent.ourPillarTitle
    },
    ourPillarContent() {
        const en =[
          'network',
          'incubation',
          'media',
          'research'
        ]

        const vi = [
          'Kết nối',
          'đầu tư',
          'truyền thông',
          'nghiên cứu'
        ]

        return this.isVi ? vi : en
    }
  }
};
</script>

<style lang="scss">
.our-pillars-title {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 20px;

    width: 180px;
    height: 2px;
    background: white;
  }
}
</style>
