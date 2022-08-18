<template>
  <div id="network" class="fixed hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="uppercase flex justify-center items-center">
      <img src="../../../static/img/arrow-left.png" alt="arrow-left" class="w-14 mr-4 laptop:w-16 laptop:mr-5" />
      <h3 class="text-stroke text-[80px] laptop:text-[90px] font-[900] tracking-[8px]">{{ isVi ? 'Kết nối' : 'network' }}
      </h3>
    </div>

    <div v-html="networkContent"
      class="network-content text-center w-[fit-content] m-auto mt-[50px] text-xl hd:text-2xl text-gray3">
    </div>
  </div>
</template>

<script>
export default {
  name: "Network",
  computed: {
    networkContent() {
      return this.isVi ? this.viContent.network : this.enContent.network
    }
  }
};
</script>

<style lang="scss">
#network {
  width: 55%;
  filter: blur(40px);
  opacity: 0;
  z-index: 102;

  >div {
    &:first-child {
      position: relative;

      &::after {
        content: "";
        width: 30%;
        height: 2px;

        background: white;

        position: absolute;
        bottom: 0;
        right: -8%;
        transform: translateX(-50%);
      }
    }
  }

  .network-content {
    position: relative;
    padding-bottom: 24px;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);

      width: 60px;
      height: 1px;
      background: white;
    }
  }
}
</style>
