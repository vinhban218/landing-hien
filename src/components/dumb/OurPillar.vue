<template>
  <div id="our-pillar" class="w-fit mx-auto">
    <div class="our-pillars-title uppercase  text-[80px] laptop:text-[90px] text-white font-bold">
      our
      <span class="text-stroke font-[900]" style="--width: 2px">pillars</span>
    </div>

    <div class="text-white font-bold  text-[50px] laptop:text-[60px] mt-4 ml-48">
      <div class="flex items-center uppercase">
        <img
          src="../../../static/img/arrow-left.png"
          alt="arrow-left"
          class=" w-10 laptop:w-12 mr-2.5"
        />
        <div>network</div>
      </div>
      <div class="flex items-center uppercase">
        <img
          src="../../../static/img/arrow-left.png"
          alt="arrow-left"
          class=" w-10 laptop:w-12 mr-2.5"
        />
        <div>incubation</div>
      </div>
      <div class="flex items-center uppercase">
        <img
          src="../../../static/img/arrow-left.png"
          alt="arrow-left"
          class=" w-10 laptop:w-12 mr-2.5"
        />
        <div>media</div>
      </div>
      <div class="flex items-center uppercase">
        <img
          src="../../../static/img/arrow-left.png"
          alt="arrow-left"
          class=" w-10 laptop:w-12 mr-2.5"
        />
        <div>research</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Incubate",
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
