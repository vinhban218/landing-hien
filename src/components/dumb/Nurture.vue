<template>
  <div
    id="nurture"
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit mx-auto uppercase text-[60px] laptop:text-[70px] text-center text-white font-[900] leading-[76px] laptop:leading-[82px]"
  >
    we nurture
    <span class="text-stroke" style="--width: 2px">early stage</span>
    <br />
    <span class="text-stroke" style="--width: 2px">talent</span> in order to
    bring <br />
    <span class="text-stroke" style="--width: 2px"> the nextwave of </span>
    <br />
    blockchain innovation.
  </div>
</template>

<script>
export default {
  name: "Nurture",
};
</script>

<style lang="scss">
#nurture {
  position: fixed;
  padding-bottom: 26px;

  &::after,
  &::before {
    content: "";
    position: absolute;

    width: 200px;
    height: 2px;
    background: white;
  }

  &::before {
    top: 80px;
    left: -40px;
    transform: translateX(-40%);
  }

  &::after {
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
