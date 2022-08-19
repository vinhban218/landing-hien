<template>
  <div id="we-are"
    v-html="weAreContent"
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit mx-auto uppercase text-[54px] laptop:text-[64px] text-center text-white font-extrabold leading-[66px] laptop:leading-[76px]">
  </div>
</template>

<script>
export default {
  name: "WeAre",
  computed: {
    weAreContent() {
      return this.storeState.vi ? this.storeState.viContent.weAre : this.storeState.enContent.weAre
    }
  }
};
</script>

<style lang="scss">
#we-are {
  position: fixed;
  padding-bottom: 26px;
  white-space: nowrap;

  &::after,
  &::before {
    content: "";
    position: absolute;

    width: 200px;
    height: 2px;
    background: white;
  }

  &::before {
    top: 70px;
    left: 60px;
    transform: translateX(-40%);
  }

  &::after {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
