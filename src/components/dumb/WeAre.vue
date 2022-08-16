<template>
  <div
    id="we-are"
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit mx-auto uppercase text-[60px] laptop:text-[70px] text-center text-white font-[900] leading-[76px] laptop:leading-[82px]"
  >
    we are the gateway of<br />
    accessibility to
    <span class="text-stroke" style="--width: 2px">vietnam</span>,<br />
    <span class="text-stroke" style="--width: 2px"> the-fastest growing </span>
    <br />
    crypto market in the world.
  </div>
</template>

<script>
export default {
  name: "WeAre",
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
    top: 80px;
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
