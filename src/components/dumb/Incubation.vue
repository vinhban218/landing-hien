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
      <h3 class="text-stroke text-[80px] laptop:text-[90px] font-[900] tracking-[8px]">
        incubation
      </h3>
    </div>

    <div
      class="incubation-content text-center w-[fit-content] m-auto mt-6 hd:mt-8 text-lg hd:text-xl laptop:text-2xl text-gray3"
    >
      <div>
        We incubation talented <span class="highlight">teams</span> and great
        minds, and equip them with the <br />
        tools and resources they need to seize oppotunity, and create change.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Incubation",
};
</script>

<style lang="scss">
#incubation {
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
