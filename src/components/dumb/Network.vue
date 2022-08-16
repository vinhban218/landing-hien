<template>
  <div id="network" class="fixed hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="uppercase flex justify-center items-center">
      <img src="../../../static/img/arrow-left.png" alt="arrow-left" class="w-14 mr-4 laptop:w-16 laptop:mr-5" />
      <h3 class="text-stroke text-[80px] laptop:text-[90px] font-[900] tracking-[8px]">network</h3>
    </div>

    <div
      class="network-content text-center w-[fit-content] m-auto mt-[50px] text-xl hd:text-2xl text-gray3">
      <div class="mb-5">
        We leverage the largest crypto <br>
        network in <span class="underline highlight"><a href="https://vcmr.kyros.ventures/h1-2022-en/" target="_blank">VIETNAM</a></span>, to help <br>
        projects access one of the most <br> 
        dynamic markets in the world.
      </div>
      <div class="mt-5">
        The Vietnamese market is at the <br>
        forefront of blockchain innovation, <br>
        pioneering a new era of technology.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Network",
};
</script>

<style lang="scss">
#network {
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
