<template>
  <div class="uppercase text-[54px] laptop:text-[64px] text-center text-white font-[900] leading-[66px] laptop:leading-[76px]">
    <div id="nurture" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit mx-auto">
      we nurture <span class="text-stroke" style="--width: 2px">early-stage talent</span><br />
      to bring in <span class="text-stroke" style="--width: 2px">the next wave</span> <br>
      of blockchain innovation.
    </div>
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
    left: -40px;
    transform: translateX(-40%);
  }

  &::after {
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
