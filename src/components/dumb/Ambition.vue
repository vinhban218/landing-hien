<template>
  <div
    id="ambition"
    class="text-center fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    <div class="uppercase flex justify-center items-center">
      <img
        src="../../../static/img/arrow-left.png"
        alt="arrow-left"
        class="w-[54px] mr-5"
      />
      <div class="text-stroke text-[72px] font-[900] tracking-[8px]">
        Ambition
      </div>
    </div>
    <div class="ambition-content text-gray3 text-xl">
      <div class="mb-5">
        To
        <span class="highlight"
          >magnify the network effect of crypto adoption</span
        >
        from Vietnam, the <br />
        most dynamic market to the world.
      </div>
      <div>
        Vietnam has leapfrogged the Internet era to be a pioneer in blockchain
        <br />
        applications <span class="highlight">from DeFi to GameFi</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ambition",
};
</script>

<style lang="scss">
.ambition-content {
  position: relative;
  width: fit-content;
  margin: auto;
  margin-top: 40px;
  padding: 20px 0;

  &::after,
  &::before {
    content: "";
    position: absolute;

    width: 80px;
    height: 1px;

    background: white;
  }

  &::before {
    top: 0;
    left: 40px;
  }

  &::after {
    bottom: 0;
    right: 100px;
  }
}
</style>
