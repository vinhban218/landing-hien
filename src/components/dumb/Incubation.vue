<template>
  <div
    id="incubation"
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    <div class="uppercase flex justify-center items-center pb-2 laptop:pb-2.5">
      <img
        src="../../../static/img/arrow-left.png"
        alt="arrow-left"
        class="w-14 mr-4 laptop:w-16 laptop:mr-5"
      />
      <h3 class="text-stroke text-[80px] laptop:text-[90px] font-extrabold tracking-[8px]">
        {{isVi ?  'Đầu tư' : 'incubation'}}
      </h3>
    </div>

    <div
      v-html="incubationContent"
      class="incubation-content text-center w-[fit-content] m-auto mt-6 hd:mt-8 text-xl hd:text-2xl text-gray3"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: "Incubation",
  computed: {
    incubationContent() {
      return this.isVi ? this.viContent.incubationContent : this.enContent.incubationContent
    }
  }
};
</script>

<style lang="scss">
#incubation {
    width: 55%;
  > div {
    &:first-child {
      position: relative;

      &::after {
        content: "";
        width: 30%;
        height: 2px;

        background: white;

        position: absolute;
        bottom: 0;
        left: -16%;
        transform: translateX(50%);
      }
    }
  }

  .incubation-content {
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
